export type AchievementItem = {
  id: string
  slug: string
  title: string
  summary?: string
  heroImage?: { url?: string | null } | null
  highlights?: { text: string }[]
  ctaText?: string
  ctaLink?: string
}

export async function getAchievements(): Promise<AchievementItem[]> {
  try {
    const base = process.env.NEXT_PUBLIC_PAYLOAD_URL
    if (!base) {
      console.warn('NEXT_PUBLIC_PAYLOAD_URL is not set, returning empty achievements')
      return []
    }

    const res = await fetch(`${base}/api/achievements?depth=1&limit=20`, {
      next: { revalidate: 600 },
    })
    if (!res.ok) return []
    const json = await res.json()
    return (json.docs || []) as AchievementItem[]
  } catch (error) {
    console.warn('Failed to fetch achievements during build, returning empty array:', error)
    return []
  }
}
