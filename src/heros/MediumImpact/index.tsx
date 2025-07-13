import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  // If media has an alt string, convert it to RichText editor state
  let captionState: DefaultTypedEditorState | null = null
  if (media && typeof media === 'object' && typeof media.alt === 'string' && media.alt) {
    const stringToEditorState = (text: string): DefaultTypedEditorState => ({
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text,
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: 'left',
            indent: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: 'left',
        indent: 0,
        version: 1,
      },
    })
    captionState = stringToEditorState(media.alt as string)
  }
  return (
    <div className="">
      <div className="container mb-8">
        {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}

        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex gap-4">
            {links.map(({ link }, i) => {
              return (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <div className="container ">
        {media && typeof media === 'object' && (
          <div>
            <Media
              className="-mx-4 md:-mx-8 2xl:-mx-16"
              imgClassName=""
              priority
              resource={media}
            />
            {captionState && (
              <div className="mt-3">
                <RichText data={captionState} enableGutter={false} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
