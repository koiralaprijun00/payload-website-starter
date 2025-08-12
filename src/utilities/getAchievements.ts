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
  const base = process.env.NEXT_PUBLIC_PAYLOAD_URL
  if (!base) return []
  const res = await fetch(`${base}/api/achievements?depth=1&limit=20`, {
    next: { revalidate: 600 },
  })
  if (!res.ok) return []
  const json = await res.json()
  return (json.docs || []) as AchievementItem[]
}
