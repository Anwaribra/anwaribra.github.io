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
      className="pt-2 pb-6 sm:pb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <h2 className="section-heading mb-6 sm:mb-8">Experience</h2>

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
                          isThinker ? 'dark:invert' : ''
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
                      className="text-base sm:text-lg font-medium text-zinc-900 dark:text-zinc-100 underline decoration-zinc-400/60 dark:decoration-zinc-600 underline-offset-4 hover:decoration-zinc-950 hover:text-zinc-950 dark:hover:decoration-[#C6F36A] dark:hover:text-[#C6F36A] transition-colors"
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

              {/* Row 4: Sub-projects (e.g. Dots under Thinker) with subtle connecting border line */}
              {exp.subProjects && exp.subProjects.length > 0 && (
                <div className="mt-3 ml-2 pl-3.5 border-l border-zinc-300 dark:border-zinc-800 space-y-3">
                  {exp.subProjects.map((sub) => (
                    <div key={sub.title} className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        {sub.url ? (
                          <a
                            href={sub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-zinc-900 dark:text-zinc-100 underline decoration-zinc-400/60 dark:decoration-zinc-600 underline-offset-4 hover:decoration-zinc-950 hover:text-zinc-950 dark:hover:decoration-[#C6F36A] dark:hover:text-[#C6F36A] transition-colors"
                          >
                            {sub.title}
                          </a>
                        ) : (
                          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                            {sub.title}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400/90 leading-relaxed font-normal">
                        {sub.description}
                      </p>
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
