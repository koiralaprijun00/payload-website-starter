import React from 'react'
import { Page } from '@/payload-types'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

import { CMSLink } from '../../components/Link'

type Props = Extract<Page['layout'][0], { blockType: 'content' }>

export const ContentBlock: React.FC<
  Props & {
    className?: string
  }
> = (props) => {
  const { columns, className } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className={cn('container my-16', className)}>
      <div className={cn('grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16')}>
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col

            return (
              <div
                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                  'md:col-span-2': size !== 'full',
                })}
                key={index}
              >
                {richText && <RichText data={richText} enableGutter={false} />}

                {enableLink && <CMSLink {...link} />}
              </div>
            )
          })}
      </div>
    </div>
  )
}
