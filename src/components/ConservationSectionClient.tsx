'use client'
import { useStaggeredAnimation } from '@/utilities/useScrollAnimation'
import ConservationSection, { ConservationSectionProps } from './ConservationSection'

const ConservationSectionClient = (props: ConservationSectionProps) => {
  const ref = useStaggeredAnimation<HTMLDivElement>(200)

  return (
    <div ref={ref}>
      <ConservationSection {...props} />
    </div>
  )
}

export default ConservationSectionClient
