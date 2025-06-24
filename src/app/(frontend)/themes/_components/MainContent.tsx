import React from 'react'
import RichText from '@/components/RichText'
import { ThemePage } from '@/payload-types'

type Props = {
  mainContent: ThemePage['mainContent']
}

const MainContent = ({ mainContent }: Props) => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">{mainContent.heading}</h2>
          <RichText data={mainContent.content} />
        </div>
      </div>
    </section>
  )
}

export default MainContent
