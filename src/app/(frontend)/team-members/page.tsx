import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

type TeamMember = {
  id?: string
  slug: string
  profileImage: {
    url: string
    filename?: string
    alt?: string
    thumbnailURL?: string
  }
  name: string
  role: string
  email: string
  phone: string
  boardType: 'advisory' | 'executive' | 'staff'
  description?: string
}

// Helper to fetch team members from Payload
async function getTeamMembers(): Promise<TeamMember[]> {
  const teamMembersReq = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/team-members`, {
    next: { revalidate: 86400 },
  })
  const teamMembersData = await teamMembersReq.json()
  return teamMembersData.docs || []
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  const boardLabel =
    member.boardType === 'advisory'
      ? 'Advisory Board'
      : member.boardType === 'executive'
        ? 'Executive Board'
        : 'Staff Member'

  return (
    <Link
      href={`/team-members/${member.slug}`}
      className="block hover:shadow-xl transition-all duration-300 group"
    >
      <div className="border border-gray-200 rounded-lg p-6 bg-white hover:border-mainBlue">
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          {typeof member.profileImage.url === 'string' && member.profileImage.url.trim() !== '' && (
            <div className="relative w-32 h-32 mb-4">
              <Image
                src={member.profileImage.url}
                alt={member.name}
                fill
                className="object-cover rounded-full border-4 border-gray-100 group-hover:border-mainBlue transition-all duration-300"
                sizes="128px"
              />
            </div>
          )}

          {/* Board Type Badge */}
          <span className="inline-block bg-blue-50 text-mainBlue font-medium px-3 py-1 rounded-full mb-3 text-xs border border-blue-100">
            {boardLabel}
          </span>

          {/* Member Info */}
          <div className="text-center">
            <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-mainBlue transition-colors">
              {member.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2 font-medium">{member.role}</p>
            <p className="text-xs text-blue-600 mb-1">{member.email}</p>
            <p className="text-xs text-gray-500">{member.phone}</p>

            {/* Description Preview */}
            {member.description && (
              <p className="text-xs text-gray-500 mt-3 line-clamp-2">
                {member.description.slice(0, 100)}...
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default async function TeamMembersPage() {
  const members = await getTeamMembers()

  const advisory = members.filter((m) => m.boardType === 'advisory')
  const executive = members.filter((m) => m.boardType === 'executive')
  const staff = members.filter((m) => m.boardType === 'staff')

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="text-mainBlue py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-left">Our Team</h1>
            <p className="text-xl md:text-2xl text-mainBlue-100 leading-relaxed text-left">
              Meet the dedicated professionals working to protect Nepal&#39;s environment and
              support local communities
            </p>
          </div>
        </div>
      </div>

      {/* Team Members Sections */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Advisory Board Section */}
          {advisory.length > 0 && (
            <div className="mb-16">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Advisory Board Members</h2>
                <p className="text-gray-600 max-w-2xl">
                  Experienced leaders providing strategic guidance and oversight to our organization
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {advisory.map((member, idx) => (
                  <TeamMemberCard key={member.id || member.email || idx} member={member} />
                ))}
              </div>
            </div>
          )}

          {/* Executive Board Section */}
          {executive.length > 0 && (
            <div className="mb-16">
              <div className=" mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Executive Board Members</h2>
                <p className="text-gray-600 max-w-2xl">
                  Executive leaders responsible for organizational strategy and operations
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {executive.map((member, idx) => (
                  <TeamMemberCard key={member.id || member.email || idx} member={member} />
                ))}
              </div>
            </div>
          )}

          {/* Staff Members Section */}
          {staff.length > 0 && (
            <div className="mb-16">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Staff Members</h2>
                <p className="text-gray-600 max-w-2xl">
                  Dedicated professionals implementing our mission on the ground
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {staff.map((member, idx) => (
                  <TeamMemberCard key={member.id || member.email || idx} member={member} />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {members.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Team Members Found</h3>
                <p className="text-gray-600">
                  Team member profiles will appear here once they are added to the system.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Our Team - Meet Our Dedicated Professionals',
    description:
      "Meet the experienced team members working to protect Nepal's environment and support local communities through our advisory board, executive leadership, and dedicated staff.",
  }
}
