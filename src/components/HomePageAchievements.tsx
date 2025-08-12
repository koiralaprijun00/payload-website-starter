import Link from 'next/link'

export default function HomePageAchievements() {
  const items = [
    { slug: 'community-benefited', title: 'Community Benefited' },
    { slug: 'grant-secured', title: 'Grant Secured' },
    { slug: 'training-completed', title: 'Training Completed' },
    { slug: 'partners-collaborated', title: 'Partners Collaborated' },
  ]

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="flex items-center gap-2 mb-4">
        <span className="h-2 w-2 bg-orange-500 inline-block" />
        <span className="uppercase text-xs font-bold tracking-wider text-gray-700">
          Achievements
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Achievements</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((i) => (
          <Link
            key={i.slug}
            className="block border rounded-lg p-6 hover:shadow-md transition"
            href={`/achievements/${i.slug}`}
          >
            <div className="text-xl font-semibold text-blue-900">{i.title}</div>
            <div className="text-sm text-gray-600 mt-1">View details</div>
          </Link>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link href="/achievements" className="text-blue-900 font-semibold hover:underline">
          See all achievements
        </Link>
      </div>
    </section>
  )
}
