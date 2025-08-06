import React from 'react'

import type { Page } from '@/payload-types'

import { HomePageNoticeV2Hero } from '@/heros/home-page-notive-v2'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const heroes: Record<string, React.FC<any>> = {
  homePageNoticeV2: HomePageNoticeV2Hero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  // TypeScript: ensure correct props are passed to the hero component
  // This cast is safe because Page['hero'] is a discriminated union on 'type'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <HeroToRender {...(props as any)} />
}
