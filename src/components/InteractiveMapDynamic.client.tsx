'use client'

import dynamic from 'next/dynamic'

const InteractiveMap = dynamic(() => import('./InteractiveMap'), {
  ssr: false,
  loading: () => <div className="h-[700px] lg:h-[800px] bg-gray-100 rounded-lg shadow-sm" />,
})

export default InteractiveMap


