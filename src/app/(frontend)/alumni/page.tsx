import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { getCachedAlumniMembers, type TeamMember } from '@/utilities/getTeamMembers'

// Convert to ISR with 5-minute revalidation
export const revalidate = 300

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <Link
      href={`/team-members/${member.slug}`}
      className="block hover:shadow-xl transition-all duration-300 group"
    >
      <div className="border border-gray-200 rounded-lg p-6 bg-white hover:border-mainBlue">
        <div className="flex flex-col items-center">
          {/* Profile Image - Now Rectangular */}
          {typeof member.profileImage.url === 'string' && member.profileImage.url.trim() !== '' && (
            <div className="relative w-48 h-64 mb-4 overflow-hidden rounded-lg">
              <Image
                src={member.profileImage.url}
                alt={member.name}
                fill
                className="object-cover rounded-lg border-2 border-gray-100 group-hover:border-mainBlue transition-all duration-300"
                sizes="192px"
              />
            </div>
          )}

          {/* Board Type Badge */}
          <span className="inline-block bg-gray-50 text-gray-700 font-medium px-3 py-1 rounded-full mb-3 text-xs border border-gray-100">
            Alumni
          </span>

          {/* Member Info - Simplified */}
          <div className="text-center">
            <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-mainBlue transition-colors">
              {member.name}
            </h3>
            <p className="text-sm text-gray-600 font-medium">{member.role}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default async function AlumniPage() {
  const members = await getCachedAlumniMembers()()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="text-mainBlue py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-left">Alumni</h1>
            <p className="text-xl md:text-2xl text-mainBlue-100 leading-relaxed text-left">
              Meet our alumni who have contributed to our organization&apos;s mission and growth
            </p>
          </div>
        </div>
      </div>

      {/* Alumni Members Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Alumni Members */}
          {members.length > 0 && (
            <div className="mb-16">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Alumni</h2>
                <p className="text-gray-600 max-w-2xl">
                  Former team members who have made significant contributions to our organization
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {members.map((member, idx) => (
                  <TeamMemberCard key={member.id || member.email || idx} member={member} />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {members.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  No Alumni Members Found
                </h3>
                <p className="text-gray-600">
                  Alumni member profiles will appear here once they are added to the system.
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
    title: 'Ujalyo Bardiya',
    description:
      'Meet our alumni who have contributed to our organization&apos;s mission and growth for Nepal&apos;s environmental protection and community support.',
  }
}
