import Link from 'next/link'

const categories = [
  { slug: 'community-benefited', title: 'Community Benefited' },
  { slug: 'grant-secured', title: 'Grant Secured' },
  { slug: 'training-completed', title: 'Training Completed' },
  { slug: 'partners-collaborated', title: 'Partners Collaborated' },
]

export default function AchievementsIndex() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Achievements</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/achievements/${c.slug}`}
              className="block p-6 rounded-lg border hover:shadow-md transition"
            >
              <div className="text-xl font-semibold">{c.title}</div>
              <div className="text-gray-600 text-sm mt-1">View details</div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
