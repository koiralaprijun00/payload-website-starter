import { notFound } from 'next/navigation'
import Image from 'next/image'

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await the params Promise
  const { slug } = await params

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/team-members?where[slug][equals]=${slug}&depth=1`,
    { next: { revalidate: 0 } }, // Instant updates
  )
  const data = await res.json()
  const member = data.docs?.[0]
  if (!member) return notFound()

  // Board badge label
  const boardLabel =
    member.boardType === 'advisory'
      ? 'Board of Directors'
      : member.boardType === 'executive'
        ? 'Executive Board'
        : 'Staff Member'

  return (
    <div className="w-full max-w-6xl mx-auto pt-4 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-lg flex flex-col lg:flex-row gap-8 lg:gap-12 p-6 sm:p-8 lg:p-10 border border-gray-100">
        {/* Left: Text */}
        <div className="flex-1 min-w-0 flex flex-col justify-center order-2 lg:order-1">
          <div className="mb-4">
            <span className="inline-block bg-blue-100 text-blue-900 font-semibold px-3 sm:px-4 py-1 rounded mb-2 text-sm border border-blue-300">
              {boardLabel}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-4 leading-tight text-gray-900">
            {member.name}
          </h1>
          <div className="flex flex-col gap-1 mb-6">
            <span className="text-base sm:text-lg text-gray-700 font-medium">{member.role}</span>
            <span className="text-sm sm:text-base text-gray-500">{member.email}</span>
            <span className="text-sm sm:text-base text-gray-500">{member.phone}</span>
          </div>
          {member.description && (
            <div className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed whitespace-pre-line mb-6 max-w-2xl">
              {member.description}
            </div>
          )}
        </div>
        {/* Right: Image */}
        <div className="flex-shrink-0 relative flex items-start justify-center order-1 lg:order-2">
          {/* Desktop image */}
          <div className="relative w-full sm:w-[320px] lg:w-[380px] xl:w-[420px] h-[300px] sm:h-[400px] lg:h-[480px] xl:h-[520px] hidden md:block">
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 w-full h-full bg-[#174A67] rounded-xl -z-10" />
            <Image
              src={member.profileImage.url}
              alt={member.name}
              fill
              className="object-cover rounded-xl border-4 border-white shadow-xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 380px, (max-width: 1280px) 420px, 420px"
            />
          </div>
          {/* Mobile image */}
          <div className="md:hidden mb-6 w-full flex justify-center">
            <div className="relative w-[280px] sm:w-[320px] h-[220px] sm:h-[280px]">
              <div className="absolute top-2 left-2 w-full h-full bg-[#174A67] rounded-xl -z-10" />
              <Image
                src={member.profileImage.url}
                alt={member.name}
                fill
                className="object-cover rounded-xl border-4 border-white shadow-xl"
                sizes="(max-width: 640px) 280px, 320px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
