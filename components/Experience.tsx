'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Experience } from '@/data/portfolio'

interface ExperienceProps {
  experiences: Experience[]
}

export default function ExperienceSection({ experiences }: ExperienceProps) {
  return (
    <motion.section
      id="experience"
      className="!mt-4 sm:!mt-6 pt-0 pb-6 sm:pb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <h2 className="section-heading mb-4 sm:mb-6">Experience</h2>

      {/* Clean Typographic Minimalist List (matching user reference) */}
      <div className="space-y-6 sm:space-y-8">
        {experiences.map((exp, index) => {
          const isThinker = exp.company === 'Thinker' || exp.company === 'ThinkerLab'

          return (
            <motion.div
              key={`${exp.company}-${exp.period}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              className="flex flex-col group"
            >
              {/* Row 1: Company Name (with link) on left, Period on right */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {exp.logo && (
                    <div className="relative w-4 h-4 flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                      <Image
                        src={exp.logo}
                        alt={exp.company}
                        width={16}
                        height={16}
                        className={`object-contain w-4 h-4 ${
                          isThinker ? 'invert dark:invert-0' : ''
                        }`}
                        unoptimized
                      />
                    </div>
                  )}
                  {exp.url ? (
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base sm:text-lg font-medium text-zinc-900 dark:text-zinc-100 underline decoration-zinc-400/60 dark:decoration-zinc-600 underline-offset-4 hover:decoration-zinc-950 hover:text-zinc-950 dark:hover:decoration-[#A855F7] dark:hover:text-[#A855F7] transition-colors"
                    >
                      {exp.company}
                    </a>
                  ) : (
                    <span className="text-base sm:text-lg font-medium text-zinc-900 dark:text-zinc-100">
                      {exp.company}
                    </span>
                  )}
                </div>

                {/* Period on right */}
                <span className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-normal shrink-0">
                  {exp.period}
                </span>
              </div>

              {/* Row 2: Role */}
              <p className="text-sm sm:text-base font-normal text-zinc-700 dark:text-zinc-300 mt-1">
                {exp.role}
              </p>

              {/* Row 3: Concise 1-2 line description */}
              {exp.description && (
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400/90 leading-relaxed mt-1 font-normal">
                  {exp.description}
                </p>
              )}

              {exp.subProjects && exp.subProjects.length > 0 && (
                <div className="mt-3 space-y-2">
                  {exp.subProjects.map((sub) => (
                    <div key={sub.title} className="rounded-xl border border-zinc-200 dark:border-zinc-800 px-3.5 py-3 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <a href={sub.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-zinc-900 dark:text-zinc-100 underline decoration-zinc-400/60 dark:decoration-zinc-600 underline-offset-4 hover:decoration-[#A855F7]">
                          {sub.title}
                        </a>
                        {sub.source && (
                          <a href={sub.source} target="_blank" rel="noopener noreferrer" aria-label={`${sub.title} on GitHub`}>
                            <span className="inline-flex items-center rounded-full bg-zinc-200/70 dark:bg-white/10 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors">{sub.tag}</span>
                          </a>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400/90 leading-relaxed font-normal">{sub.description}</p>
                    </div>
                  ))}
                </div>
              )}

            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}
