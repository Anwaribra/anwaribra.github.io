'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <motion.section
      id="about"
      className="pb-4 sm:pb-6"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
        About
      </h1>

      <div className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-3 font-normal">
        <p>
          I&apos;m Anwar, a software engineer and data systems specialist in Egypt. I architect and build
          resilient data platforms, real-time streaming pipelines, and autonomous AI infrastructure. Currently building
          software at{' '}
          <a
            href="https://www.thinkerlab.tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-zinc-900 dark:text-zinc-200 underline decoration-zinc-400 dark:decoration-zinc-500 underline-offset-4 hover:decoration-[#C6F36A] hover:text-[#C6F36A] transition-colors"
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
      </div>
    </motion.section>
  )
}
