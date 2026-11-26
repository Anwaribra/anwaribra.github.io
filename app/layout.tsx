import React from 'react'
import type { Metadata } from 'next'
import Script from 'next/script'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Inter, Space_Grotesk } from 'next/font/google'

// Thinker UI brand fonts: Inter for text, Space Grotesk for headlines.
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const headline = Space_Grotesk({ subsets: ['latin'], variable: '--font-thinker-headline', display: 'swap' })
import './globals.css'
import './thinker-theme.css'
import 'glisse/styles.css'



import { ThemeProvider } from '@/components/ThemeProvider'

const siteUrl = 'https://anwarmousa.me'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  title: { default: 'Anwar Mousa | Data & Software Engineer, open to work', template: '%s' },
  description: 'Data and software engineer in Egypt, open to work. Airflow, Kafka, Spark, Snowflake, dbt, Power BI and AI-backed products.',
  keywords: ['Data Engineer', 'ETL', 'Apache Airflow', 'Data Pipeline', 'Big Data', 'Data Analytics', 'Python', 'Apache Spark', 'Snowflake', 'Apache Kafka', 'Real-time Analytics', 'Stream Processing', 'DBT', 'Grafana', 'InfluxDB'],
  authors: [{ name: 'Anwar Mousa' }],
  creator: 'Anwar Mousa',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Anwar Mousa | Data & Software Engineer, open to work',
    description: 'Data pipelines, BI models and AI-backed products. Available immediately, remote or on-site in Egypt.',
    siteName: 'Anwar Mousa Portfolio',
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Anwar Mousa, data and software engineer, open to work',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anwar Mousa | Data & Software Engineer, open to work',
    description: 'Data pipelines, BI models and AI-backed products. Available immediately, remote or on-site in Egypt.',
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
    name: 'Anwar Mousa',
    jobTitle: 'Data and Software Engineer',
    url: siteUrl,
    image: `${siteUrl}/opengraph-image`,
    address: { '@type': 'PostalAddress', addressCountry: 'EG' },
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
    <html lang="en" className="scroll-smooth" data-thinker-theme="dark" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} ${inter.variable} ${headline.variable} bg-light-bg text-light-primary dark:bg-[#0d0d0f] dark:text-white font-sans antialiased transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {/* Google Analytics GA4 */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-MTJ3REXMR7"
            strategy="lazyOnload"
          />
          <Script id="google-analytics" strategy="lazyOnload">
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
        </ThemeProvider>
      </body>
    </html>
  )
}
