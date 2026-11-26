'use client'

import React from 'react'
import { SettlingText } from '@/components/thinker-ui/TextMotion'
import { Mail, FileText } from 'lucide-react'

export default function Hero() {
  return (
    <section id="about" className="hero-enter pb-1 sm:pb-2">
      <h1 className="sr-only">About Anwar Mousa</h1>

      <div className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-4 font-normal">
        <div className="inline-flex items-center rounded-full border border-zinc-300 dark:border-white/15 px-3.5 py-0.5 font-handwritten text-lg sm:text-xl leading-tight text-zinc-600 dark:text-zinc-400">
          Open to work · Available now · Remote or on-site
        </div>

        <p>
          I&apos;m Anwar, a software engineer and data systems specialist in Egypt. I architect and build
          resilient data platforms, real-time streaming pipelines, and autonomous AI infrastructure. Currently building
          software at{' '}
          <a
            href="https://www.thinkerlab.tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-zinc-900 dark:text-zinc-200 underline decoration-zinc-400 dark:decoration-zinc-500 underline-offset-4 hover:decoration-zinc-950 hover:text-zinc-950 dark:hover:decoration-[#A855F7] dark:hover:text-[#A855F7] transition-colors"
          >
            Thinker
          </a>
          .
        </p>

        <p className="text-zinc-500 dark:text-zinc-400/90">
          My primary focus spans end-to-end data engineering, distributed streaming with Apache Kafka and Spark,
          and agentic AI systems with FastMCP, dbt-core, and modern vector databases. I specialize in bridging raw telemetry
          into reliable, self-healing data products and intelligent workflows.
        </p>

        <div className="cta-glass-wrap flex flex-wrap items-center gap-2.5 pt-1">
          <a
            href="mailto:anwarmousa100@gmail.com?subject=Opportunity%20for%20Anwar%20Mousa"
            className="glass-btn glass-btn-primary"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            Get in touch
          </a>
          <a
            href="/assets/docs/CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn"
          >
            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
            Resume
          </a>
        </div>
      </div>
    </section>
  )
}
