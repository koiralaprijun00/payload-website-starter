import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Fira_Sans, Sansita } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

// Optimized Google Fonts loading
const firaSans = Fira_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-fira-sans',
})

const sansita = Sansita({
  subsets: ['latin'],
  weight: ['400', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-sansita',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable, firaSans.variable, sansita.variable)}
      lang="en"
      suppressHydrationWarning
      data-theme="light"
    >
      <head>
        <link href="/ujyalo-logo.png" rel="icon" sizes="32x32" />
        <link href="/ujyalo-logo.png" rel="icon" type="image/png" />
        <link rel="apple-touch-icon" href="/ujyalo-logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <AdminBar
          adminBarProps={{
            preview: isEnabled,
          }}
        />
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <Header />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: 'Ujalyo Bardiya',
  description: 'Conservation and community development organization in Nepal',
  openGraph: mergeOpenGraph({
    title: 'Ujalyo Bardiya',
    description: 'Conservation and community development organization in Nepal',
  }),
  twitter: {
    card: 'summary_large_image',
    creator: '@ujyalobardiya',
  },
}
