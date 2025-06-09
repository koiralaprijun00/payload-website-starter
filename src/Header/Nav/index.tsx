'use client'

import React from 'react'
import Link from 'next/link'

export default function HeaderNav() {
  return (
    <nav className="flex gap-8 items-center">
      <Link href="#" className="font-semibold text-blue-900 hover:underline">
        Our Impact
      </Link>
      <Link href="#" className="font-semibold text-blue-900 hover:underline">
        Projects
      </Link>
      <Link href="#" className="font-semibold text-blue-900 hover:underline">
        About Us
      </Link>
      <Link
        href="#"
        className="ml-6 px-6 py-2 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 transition"
      >
        Donate Now
      </Link>
    </nav>
  )
}
