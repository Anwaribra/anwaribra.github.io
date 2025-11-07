import React from 'react'
import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

const siteUrl = 'https://anwaribra.github.io'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Anwar Mousa - Data Engineer Portfolio',
  description: 'Data Engineer passionate about building scalable data pipelines and delivering actionable insights. Specialized in ETL processes, data modeling, and cloud technologies.',
  keywords: ['Data Engineer', 'ETL', 'Apache Airflow', 'Data Pipeline', 'Big Data', 'Data Analytics', 'Python', 'Apache Spark', 'Snowflake', 'Apache Kafka', 'Real-time Analytics', 'Stream Processing', 'DBT', 'Grafana', 'InfluxDB'],
  authors: [{ name: 'Anwar Mousa' }],
  creator: 'Anwar Mousa',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Anwar Mousa - Data Engineer Portfolio',
    description: 'Data Engineer passionate about building scalable data pipelines and delivering actionable insights.',
    siteName: 'Anwar Mousa Portfolio',
    images: [
      {
        url: 'https://github.com/Anwaribra.png',
        width: 1200,
        height: 630,
        alt: 'Anwar Mousa - Data Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anwar Mousa - Data Engineer Portfolio',
    description: 'Data Engineer passionate about building scalable data pipelines and delivering actionable insights.',
    creator: '@_vincenzzo',
    images: ['https://github.com/Anwaribra.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add verification codes if needed
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Anwar Mousa',
    jobTitle: 'Data Engineer',
    url: siteUrl,
    sameAs: [
      'https://github.com/Anwaribra',
      'https://www.linkedin.com/in/anwar-mousa/',
      'https://x.com/_vincenzzo',
    ],
    email: 'anwarmousa100@gmail.com',
    description: 'Data Engineer passionate about building scalable data pipelines and delivering actionable insights.',
    knowsAbout: [
      'Data Engineering',
      'ETL Pipeline Development',
      'Apache Airflow',
      'Apache Kafka',
      'Apache Spark',
      'Snowflake',
      'Python',
      'SQL',
      'Data Warehousing',
    ],
  }

  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-white font-sans">
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  )
} 