import React from 'react'

import type { Page } from '@/payload-types'

import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { HomePageV1Hero } from '@/heros/home-page-v1'
import { HomePageNoticeV1Hero } from '@/heros/home-page-notice-v1'
import { HomePageNoticeV2Hero } from '@/heros/home-page-notive-v2'

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
  homePageV1: HomePageV1Hero,
  homePageNoticeV1: HomePageNoticeV1Hero,
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
