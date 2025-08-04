import { HeaderClient } from './Component.client'
import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Header as HeaderType, Media } from '@/payload-types'

export async function Header() {
  const headerData = (await getCachedGlobal('header', 2)()) as HeaderType

  // Handle the case where logo might be a string ID or populated Media object
  let logoData: Media | null = null
  if (headerData.logo && typeof headerData.logo !== 'string') {
    // If it's a populated Media object
    logoData = headerData.logo as Media
  }

  return <HeaderClient navItems={headerData.navItems || []} logo={logoData} />
}
