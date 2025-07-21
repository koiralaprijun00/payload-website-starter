'use client'
import { useStaggeredAnimation } from '@/utilities/useScrollAnimation'
import HomePageImpact, { HomePageImpactProps } from './HomePageImpact'

const HomePageImpactClient = (props: HomePageImpactProps) => {
  const ref = useStaggeredAnimation<HTMLElement>(600)

  return (
    <section ref={ref}>
      <HomePageImpact {...props} />
    </section>
  )
}

export default HomePageImpactClient
