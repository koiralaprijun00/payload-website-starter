import React from 'react'
import Link from 'next/link'

interface ErrorPageProps {
  statusCode?: number
  hasGetInitialPropsRun?: boolean
  err?: Error
}

function ErrorPage({ statusCode }: ErrorPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">{statusCode || 'Error'}</h1>
        <h2 className="text-xl text-gray-600 mb-8">
          {statusCode === 404
            ? 'This page could not be found.'
            : statusCode
              ? `A ${statusCode} error occurred on server`
              : 'An error occurred on client'}
        </h2>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}

ErrorPage.getInitialProps = ({ res, err }: { res?: any; err?: any }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default ErrorPage
