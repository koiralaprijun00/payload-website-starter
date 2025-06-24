import { notFound } from 'next/navigation'
import Image from 'next/image'

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await the params Promise
  const { slug } = await params

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/team-members?where[slug][equals]=${slug}&depth=1`,
    { cache: 'no-store' },
  )
  const data = await res.json()
  const member = data.docs?.[0]
  if (!member) return notFound()

  // Board badge label
  const boardLabel = member.boardType === 'advisory' ? 'Board of Directors' : 'Executive Board'

  return (
    <div className="max-w-6xl mx-auto pt-4 pb-16 px-4">
      <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row gap-12 p-10 border border-gray-100">
        {/* Left: Text */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="mb-4">
            <span className="inline-block bg-blue-100 text-blue-900 font-semibold px-4 py-1 rounded mb-2 text-sm border border-blue-300">
              {boardLabel}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold mb-4 leading-tight text-gray-900">
            {member.name}
          </h1>
          <div className="flex flex-col gap-1 mb-6">
            <span className="text-base text-gray-700 font-medium">{member.role}</span>
            <span className="text-sm text-gray-500">{member.email}</span>
            <span className="text-sm text-gray-500">{member.phone}</span>
          </div>
          {member.description && (
            <div className="text-gray-700 text-base leading-relaxed whitespace-pre-line mb-6 max-w-2xl">
              {member.description}
            </div>
          )}
        </div>
        {/* Right: Image */}
        <div className="flex-shrink-0 relative flex items-start justify-center">
          <div className="relative w-[420px] h-[520px] hidden md:block">
            <div className="absolute top-6 left-6 w-full h-full bg-[#174A67] rounded-xl -z-10" />
            <Image
              src={member.profileImage.url}
              alt={member.name}
              fill
              className="object-cover rounded-xl border-4 border-white shadow-xl"
              sizes="(max-width: 768px) 100vw, 420px"
            />
          </div>
          {/* Mobile image */}
          <div className="md:hidden mb-8 w-full flex justify-center">
            <div className="relative w-[320px] h-[400px]">
              <Image
                src={member.profileImage.url}
                alt={member.name}
                fill
                className="object-cover rounded-xl border-4 border-white shadow-xl"
                sizes="(max-width: 768px) 100vw, 320px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
