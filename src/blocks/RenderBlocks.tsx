import React, { Fragment } from 'react'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { PostHero } from '@/heros/PostHero'
import { HomePageNoticeV2Hero } from '@/heros/home-page-notive-v2'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hero: (block: any) => {
    switch (block.type) {
      case 'homePageNoticeV2':
        return <HomePageNoticeV2Hero {...block} />
      case 'postHero':
        // PostHero expects a 'post' prop, so wrap block as post
        return <PostHero post={block} />
      default:
        return null
    }
  },
}

export const RenderBlocks: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blocks: { blockType: string; [key: string]: any }[]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block
          const Block = blockComponents[blockType as keyof typeof blockComponents]

          if (Block) {
            return (
              <div className="my-16" key={index}>
                {blockType === 'hero' && typeof Block === 'function'
                  ? (Block(block) as React.ReactNode)
                  : React.createElement(Block as React.ElementType, {
                      ...block,
                      disableInnerContainer: true,
                    })}
              </div>
            )
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
