import fs from 'fs/promises'
import os from 'os'
import path from 'path'

import payload from 'payload'
import configPromise from '@payload-config'

const PAGE_SIZE = 25

type MediaDoc = {
  id: string
  url?: string | null
  filename?: string | null
}

type TempFile = {
  filePath: string
  directory: string
}

async function downloadToTempFile(url: string, filename = 'payload-media'): Promise<TempFile> {
  const tempDirectory = await fs.mkdtemp(path.join(os.tmpdir(), 'payload-media-migrate-'))
  const tempFilePath = path.join(tempDirectory, filename)

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to download ${url} (${response.status} ${response.statusText})`)
  }

  const arrayBuffer = await response.arrayBuffer()
  await fs.writeFile(tempFilePath, Buffer.from(arrayBuffer))

  return { directory: tempDirectory, filePath: tempFilePath }
}

function isRemoteUrl(url?: string | null): url is string {
  if (!url) return false
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
  } catch {
    return false
  }
}

export default async function migrateVercelBlobToLocal(): Promise<void> {
  const payloadConfig = await configPromise
  const payloadInstance = await payload.init({ config: payloadConfig })

  let page = 1
  let migrated = 0
  let skipped = 0
  const failures: { id: string; url?: string | null; error: unknown }[] = []

  try {
    while (true) {
      const mediaBatch = await payloadInstance.find({
        collection: 'media',
        depth: 0,
        limit: PAGE_SIZE,
        page,
        overrideAccess: true,
      })

      if (!mediaBatch.docs.length) break

      for (const doc of mediaBatch.docs as MediaDoc[]) {
        if (!isRemoteUrl(doc.url)) {
          skipped += 1
          continue
        }

        const filename = doc.filename ?? `${doc.id}.bin`

        let tempFile: TempFile | undefined
        try {
          tempFile = await downloadToTempFile(doc.url, filename)

          await payloadInstance.update({
            collection: 'media',
            id: doc.id,
            data: {},
            filePath: tempFile.filePath,
            overwriteExistingFiles: true,
            overrideAccess: true,
          })

          migrated += 1
          payload.logger.info(
            `Migrated media ${doc.id} (${filename}) from ${doc.url.split('?')[0] ?? doc.url}`,
          )
        } catch (error) {
          failures.push({ id: doc.id, url: doc.url, error })
          payload.logger.error(error, `Failed to migrate media ${doc.id}`)
        } finally {
          if (tempFile) {
            await fs.rm(tempFile.directory, { recursive: true, force: true })
          }
        }
      }

      if (!mediaBatch.hasNextPage) break
      page += 1
    }
  } finally {
    await payloadInstance.destroy()
  }

  payload.logger.info(
    `Migration complete — migrated: ${migrated}, skipped (already local): ${skipped}, failed: ${failures.length}`,
  )

  if (failures.length) {
    payload.logger.warn(
      `Failed media IDs:\n${failures
        .map((failure) => ` - ${failure.id} (${failure.url ?? 'no url'}) => ${String(failure.error)}`)
        .join('\n')}`,
    )
  }
}
