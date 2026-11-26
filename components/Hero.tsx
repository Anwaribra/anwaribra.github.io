'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SettlingText } from '@/components/thinker-ui/TextMotion'
import { Mail, FileText } from 'lucide-react'
import { AgenticBadge } from '@/components/thinker-ui/AgenticControls'

export default function Hero() {
  return (
    <motion.section
      id="about"
      className="pb-1 sm:pb-2"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="sr-only">About Anwar Mousa</h1>

      <div className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-4 font-normal">
        <div className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs sm:text-[13px] font-medium text-emerald-700 dark:text-emerald-300">
          Open to work · Available now · Remote or on-site
        </div>

        <div className="flex flex-wrap gap-2 pb-1">
          <AgenticBadge tone="new" label="Software engineer" />
          <AgenticBadge tone="new" label="Data systems" />
          <AgenticBadge tone="new" label="Egypt" />
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
            <Mail className="h-4 w-4" aria-hidden="true" />
            Get in touch
          </a>
          <a
            href="/assets/docs/CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn"
          >
            <FileText className="h-4 w-4" aria-hidden="true" />
            Resume
          </a>
        </div>
      </div>
    </motion.section>
  )
}
