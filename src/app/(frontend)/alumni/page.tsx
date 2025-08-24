import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

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
  boardType: 'executive' | 'staff' | 'alumni'
  description?: string
  sortOrder?: number // Added sortOrder to the type
}

// Helper to fetch alumni members from Payload
async function getAlumniMembers(): Promise<TeamMember[]> {
  const payload = await getPayload({ config: configPromise })
  const res = await payload.find({
    collection: 'team-members',
    where: {
      boardType: {
        equals: 'alumni',
      },
    },
    depth: 1,
    limit: 100,
    sort: 'sortOrder', // Sort by sortOrder first
  })

  // Custom sorting: sortOrder first (lower numbers first), then alphabetically by name
  const members = res.docs as TeamMember[]
  return members.sort((a, b) => {
    // If both have sortOrder, sort by that
    if (a.sortOrder !== undefined && b.sortOrder !== undefined) {
      return a.sortOrder - b.sortOrder
    }
    // If only one has sortOrder, prioritize the one with sortOrder
    if (a.sortOrder !== undefined && b.sortOrder === undefined) {
      return -1
    }
    if (a.sortOrder === undefined && b.sortOrder !== undefined) {
      return 1
    }
    // If neither has sortOrder, sort alphabetically by name
    return a.name.localeCompare(b.name)
  })
}

function TeamMemberCard({ member }: { member: TeamMember }) {
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

          {/* Alumni Badge */}
          <span className="inline-block bg-orange-50 text-orange-700 font-medium px-3 py-1 rounded-full mb-3 text-xs border border-orange-200">
            Alumni
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

export default async function AlumniPage() {
  const members = await getAlumniMembers()

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
    title: 'Alumni - Meet Our Former Team',
    description:
      'Meet our alumni who have contributed to our organization&apos;s mission and growth for Nepal&apos;s environmental protection and community support.',
  }
}
