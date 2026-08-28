import React from 'react'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const siteUrl = 'https://anwarmousa.me'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Anwar Ibrahim - Data Engineer Portfolio',
  description: 'Data Engineer passionate about building scalable data pipelines and delivering actionable insights. Specialized in ETL processes, data modeling, and cloud technologies.',
  keywords: ['Data Engineer', 'ETL', 'Apache Airflow', 'Data Pipeline', 'Big Data', 'Data Analytics', 'Python', 'Apache Spark', 'Snowflake', 'Apache Kafka', 'Real-time Analytics', 'Stream Processing', 'DBT', 'Grafana', 'InfluxDB'],
  authors: [{ name: 'Anwar Ibrahim' }],
  creator: 'Anwar Ibrahim',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Anwar Ibrahim | Data Engineer & AI Infrastructure',
    description: 'Data Engineer specialized in automated data pipelines, dbt, Apache Airflow, pgvector RAG agents, and FastMCP platforms.',
    siteName: 'Anwar Ibrahim Portfolio',
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Anwar Ibrahim - Data Engineer Showcase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anwar Ibrahim | Data Engineer & AI Infrastructure',
    description: 'Data Engineer specialized in automated data pipelines, dbt, Apache Airflow, pgvector RAG agents, and FastMCP platforms.',
    creator: '@_vincenzzo',
    images: [`${siteUrl}/opengraph-image`],
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
    name: 'Anwar Ibrahim',
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
      <body className={`${inter.variable} ${mono.variable} bg-black text-white font-sans`}>
        {/* Google Analytics GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MTJ3REXMR7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MTJ3REXMR7');
          `}
        </Script>

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
