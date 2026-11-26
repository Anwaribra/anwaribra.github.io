'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SettlingText } from '@/components/thinker-ui/TextMotion'
import { Mail, FileText } from 'lucide-react'

const highlights = [
  { strong: '40% faster', label: 'data processing after rebuilding ETL in Apache Airflow (DEPI).' },
  { strong: '35% faster', label: 'analytical queries after tuning a Snowflake warehouse.' },
  { strong: '27 dbt tests, 22 tools', label: 'behind DataOps Agent, with a human approval gate before any fix runs.' },
  { strong: '98%+ R²', label: 'on a car price model fed by its own ETL pipeline.' },
]

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
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs sm:text-[13px] font-medium text-emerald-700 dark:text-emerald-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Open to work · Available now · Remote or on-site
        </div>

        <p>
          I&apos;m Anwar, a data and software engineer in Egypt. I build data pipelines, BI models and AI-backed
          products, and I ship them. Currently building at{' '}
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

        <ul className="space-y-1.5 text-zinc-600 dark:text-zinc-300">
          {highlights.map((h) => (
            <li key={h.label} className="flex gap-2.5">
              <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-[#9333EA] dark:bg-[#C084FC]" />
              <span>
                <strong className="font-semibold text-zinc-900 dark:text-zinc-100">{h.strong}</strong> {h.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          <a
            href="mailto:anwarmousa100@gmail.com?subject=Opportunity%20for%20Anwar%20Mousa"
            className="inline-flex items-center gap-2 rounded-full bg-[#9333EA] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#7e22ce] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9333EA]"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Get in touch
          </a>
          <a
            href="/assets/docs/CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-white/15 px-4 py-2 text-sm font-medium text-zinc-800 dark:text-zinc-200 transition hover:bg-zinc-100 dark:hover:bg-white/5"
          >
            <FileText className="h-4 w-4" aria-hidden="true" />
            Resume
          </a>
        </div>
      </div>
    </motion.section>
  )
}
