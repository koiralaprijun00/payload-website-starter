'use client'
import { useStaggeredAnimation } from '@/utilities/useScrollAnimation'
import HomePageProjects, { HomePageProjectsProps } from './HomePageProjects'

const HomePageProjectsClient = (props: HomePageProjectsProps) => {
  const ref = useStaggeredAnimation<HTMLElement>(400)

  return (
    <section ref={ref}>
      <HomePageProjects {...props} />
    </section>
  )
}

export default HomePageProjectsClient
