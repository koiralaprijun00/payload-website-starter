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
  try {
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

    console.log(`Fetched ${res.docs.length} ${boardType} members`)

    // Transform and filter members to ensure they have valid profile images
    const members = res.docs
      .map((doc: any) => {
        // Handle profile image - it might be populated or just an ID
        let profileImage
        if (typeof doc.profileImage === 'object' && doc.profileImage?.url) {
          // Already populated
          profileImage = doc.profileImage
        } else if (typeof doc.profileImage === 'string') {
          // Just an ID - skip this member for now as image isn't populated
          console.warn(`Team member ${doc.name} has unpopulated profile image: ${doc.profileImage}`)
          return null
        } else {
          console.warn(`Team member ${doc.name} has invalid profile image:`, doc.profileImage)
          return null
        }

        return {
          id: doc.id,
          slug: doc.slug,
          profileImage,
          name: doc.name,
          role: doc.role,
          email: doc.email,
          phone: doc.phone,
          boardType: doc.boardType,
          description: doc.description,
          sortOrder: doc.sortOrder,
        } as TeamMember
      })
      .filter((member): member is TeamMember => member !== null)

    // Custom sorting: sortOrder first (lower numbers first), then alphabetically by name
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
  } catch (error) {
    console.error(`Error fetching ${boardType} team members:`, error)
    return []
  }
}

/**
 * Returns cached staff members with 5-minute revalidation
 */
export const getCachedStaffMembers = () =>
  unstable_cache(async () => getTeamMembersByType('staff'), ['team-members-staff'], {
    tags: ['team-members', 'team-members-staff'],
    revalidate: false, // Instant updates
  })

/**
 * Returns cached alumni members with 5-minute revalidation
 */
export const getCachedAlumniMembers = () =>
  unstable_cache(async () => getTeamMembersByType('alumni'), ['team-members-alumni'], {
    tags: ['team-members', 'team-members-alumni'],
    revalidate: false, // Instant updates
  })

/**
 * Returns cached executive team members with 5-minute revalidation
 */
export const getCachedExecutiveMembers = () =>
  unstable_cache(async () => getTeamMembersByType('executive'), ['team-members-executive'], {
    tags: ['team-members', 'team-members-executive'],
    revalidate: false, // Instant updates
  })
