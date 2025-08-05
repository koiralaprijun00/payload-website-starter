import React from 'react'
import { getPublications } from '@/utilities/getPublications'
import PublicationsClient from './PublicationsClient'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

interface Publication {
  id: string
  title: string
  summary?: string
  year?: number
  documentUrl: string
  category?: { id: string; title: string } | null
}

interface Category {
  id: string
  title: string
}

async function getCategories(): Promise<Category[]> {
  const payload = await getPayload({ config: configPromise })
  const res = await payload.find({ collection: 'categories', limit: 100 })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return res.docs.map((cat: any) => ({ id: cat.id, title: cat.title }))
}

export default async function PublicationsPage() {
  const publications: Publication[] = await getPublications()
  const years = Array.from(new Set(publications.map((pub) => pub.year).filter(Boolean))).sort(
    (a, b) => (b as number) - (a as number),
  )
  const categories: Category[] = await getCategories()

  return <PublicationsClient publications={publications} years={years} categories={categories} />
}
