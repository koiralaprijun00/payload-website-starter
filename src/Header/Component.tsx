import { HeaderClient } from './Component.client'
import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Header as HeaderType } from '@/payload-types'

export async function Header() {
  const headerData = (await getCachedGlobal('header', 1)()) as HeaderType
  return <HeaderClient navItems={headerData.navItems || []} logo={headerData.logo || null} />
}
