import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import Hero from '@/app/(frontend)/themes/_components/Hero'
import PageClient from '@/app/(frontend)/posts/[slug]/page.client'
import RichText from '@/components/RichText'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const projects = await payload.find({
    collection: 'projects',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = projects.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function ProjectPage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const url = '/projects/' + slug
  const project = await queryProjectBySlug({ slug })

  if (!project) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {typeof project.image === 'object' && project.image && (
        <Hero title={project.title} image={project.image} />
      )}
      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container max-w-[48rem] mx-auto">
          <p className="mb-8 text-lg text-gray-700">{project.summary}</p>
          {project.body && <RichText data={project.body} className="mb-8" />}
          {/* You can add more project fields here as needed */}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const project = await queryProjectBySlug({ slug })
  return {
    title: project?.title || 'Project',
    description: project?.summary || '',
  }
}

const queryProjectBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'projects',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })
  return result.docs?.[0] || null
})
