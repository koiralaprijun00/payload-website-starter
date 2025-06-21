import Image from 'next/image'

type TeamMember = {
  profileImage: { url: string }
  name: string
  role: string
}

type TeamSectionProps = {
  title: string
  members: TeamMember[]
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="flex flex-col items-center m-4">
      <Image
        src={member.profileImage.url}
        alt={member.name}
        width={150}
        height={150}
        className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
      />
      <h4 className="mt-2 font-semibold">{member.name}</h4>
      <p className="text-gray-600">{member.role}</p>
    </div>
  )
}

export default function TeamSection({ title, members = [] }: TeamSectionProps) {
  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-2xl font-bold text-center mb-8">{title}</h2>
      <div className="flex flex-wrap justify-center">
        {members.map((member) => (
          <TeamMemberCard key={member.name} member={member} />
        ))}
      </div>
    </section>
  )
}
