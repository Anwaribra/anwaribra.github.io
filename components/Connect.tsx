'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MaterialButton } from '@/components/thinker-ui/MaterialControls'
import { CopySnippet } from '@/components/thinker-ui/FeedbackControls'

const open = (href: string) => () => window.open(href, '_blank', 'noopener')

export default function Connect() {
  return (
    <motion.section
      id="connect"
      className="!mt-4 !mb-2 py-2"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
    >
      <div className="space-y-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-handwritten text-[#9333EA] dark:text-[#C084FC] leading-tight tracking-wide">
          Let&apos;s build something that has to stay up.
        </h2>
        <CopySnippet text="anwarmousa100@gmail.com" label="Copy email address" />
        <div className="flex flex-wrap items-center gap-2.5">
          <MaterialButton onClick={open('https://github.com/Anwaribra')}>GitHub</MaterialButton>
          <MaterialButton onClick={open('https://www.linkedin.com/in/anwar-mousa/')}>LinkedIn</MaterialButton>
          <MaterialButton onClick={open('https://x.com/_vincenzzo')}>X</MaterialButton>
          <MaterialButton variant="graphite" onClick={open('/assets/docs/CV.pdf')}>Resume</MaterialButton>
        </div>
      </div>
    </motion.section>
  )
}
