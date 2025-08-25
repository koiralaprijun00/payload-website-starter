import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

export type TeamMember = {
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
  sortOrder?: number
}

async function getTeamMembersByType(
  boardType: 'executive' | 'staff' | 'alumni',
): Promise<TeamMember[]> {
  const payload = await getPayload({ config: configPromise })
  const res = await payload.find({
    collection: 'team-members',
    where: {
      boardType: {
        equals: boardType,
      },
    },
    depth: 1,
    limit: 100,
    sort: 'sortOrder',
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

/**
 * Returns cached staff members with 5-minute revalidation
 */
export const getCachedStaffMembers = () =>
  unstable_cache(async () => getTeamMembersByType('staff'), ['team-members-staff'], {
    tags: ['team-members', 'team-members-staff'],
    revalidate: 300, // 5 minutes
  })

/**
 * Returns cached alumni members with 5-minute revalidation
 */
export const getCachedAlumniMembers = () =>
  unstable_cache(async () => getTeamMembersByType('alumni'), ['team-members-alumni'], {
    tags: ['team-members', 'team-members-alumni'],
    revalidate: 300, // 5 minutes
  })

/**
 * Returns cached executive team members with 5-minute revalidation
 */
export const getCachedExecutiveMembers = () =>
  unstable_cache(async () => getTeamMembersByType('executive'), ['team-members-executive'], {
    tags: ['team-members', 'team-members-executive'],
    revalidate: 300, // 5 minutes
  })
