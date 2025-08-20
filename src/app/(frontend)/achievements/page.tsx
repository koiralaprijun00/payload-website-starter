import Link from 'next/link'

const categories = [
  { slug: 'community-benefited', title: 'Community Benefited' },
  { slug: 'grant-secured', title: 'Grant Secured' },
  { slug: 'training-completed', title: 'Training Completed' },
  { slug: 'partners-collaborated', title: 'Partners Collaborated' },
]

export default function AchievementsIndex() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 lg:mb-12 text-center">
        Achievements
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/achievements/${c.slug}`}
              className="block p-4 sm:p-6 lg:p-8 rounded-lg border hover:shadow-md transition-all duration-200 hover:scale-105 bg-white"
            >
              <div className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                {c.title}
              </div>
              <div className="text-gray-600 text-sm sm:text-base mt-2 sm:mt-3">View details</div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
