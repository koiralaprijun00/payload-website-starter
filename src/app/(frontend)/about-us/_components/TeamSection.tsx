import Image from 'next/image'
import Link from 'next/link'

type TeamMember = {
  id?: string
  slug: string
  profileImage: { url: string }
  name: string
  role: string
  email: string
  phone: string
  boardType: 'advisory' | 'executive'
}

type TeamSectionProps = {
  title: string
  members: TeamMember[]
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <Link href={`/team-members/${member.slug}`} className="block hover:shadow-lg transition">
      <div className="border border-gray-300 rounded-sm p-4 bg-white">
        <div className="flex flex-col items-center">
          {typeof member.profileImage.url === 'string' && member.profileImage.url.trim() !== '' && (
            <Image
              src={member.profileImage.url}
              alt={member.name}
              width={120}
              height={120}
              className="w-30 h-30 object-cover mb-3"
            />
          )}
          <div className="text-center">
            <h4 className="font-semibold text-sm mb-1">{member.name}</h4>
            <div className="text-xs text-gray-600 mb-1">{member.role}</div>
            <div className="text-xs text-blue-600 mb-1">{member.email}</div>
            <div className="text-xs text-gray-600">{member.phone}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function TeamSection({ members = [] }: TeamSectionProps) {
  const advisory = members.filter((m) => m.boardType === 'advisory')
  const executive = members.filter((m) => m.boardType === 'executive')

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-xl font-bold mb-2">Team Members</h1>
        <h2 className="text-2xl font-bold text-gray-800">
          Skilled Team Innovating
          <br />
          the Product
        </h2>
      </div>

      {/* Advisory Board Section */}
      {advisory.length > 0 && (
        <div className="flex flex-col lg:flex-row items-start mb-12 gap-6">
          {/* Left: Board type heading */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <h3 className="text-lg font-semibold mb-6">Advisory Board Members</h3>
          </div>
          {/* Right: Team members */}
          <div className="flex-1">
            <div className="flex flex-wrap">
              {advisory.map((member, idx) => (
                <div key={member.id || member.email || idx} className="mr-4 lg:mr-6 last:mr-0 mb-6">
                  <TeamMemberCard member={member} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Executive Board Section */}
      {executive.length > 0 && (
        <div className="flex flex-col lg:flex-row items-start gap-6">
          <div className="w-full lg:w-64 flex-shrink-0">
            <h3 className="text-lg font-semibold mb-6">Executive Board Members</h3>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {executive.map((member, idx) => (
                <TeamMemberCard key={member.id || member.email || idx} member={member} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
