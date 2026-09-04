'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronsUpDown, X, ExternalLink } from 'lucide-react'
import { Experience } from '@/data/portfolio'

interface ExperienceProps {
  experiences: Experience[]
}

export default function ExperienceSection({ experiences }: ExperienceProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.section
      id="experience"
      className="py-8 sm:py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Row with Title + See More / See Less Toggle Button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-heading mb-0">Experience</h2>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-zinc-300 bg-white/[0.05] border border-white/10 hover:border-white/25 hover:text-white rounded-lg transition-all duration-200 cursor-pointer active:scale-95 shadow-sm"
        >
          {isExpanded ? (
            <>
              <span>See less</span>
              <X className="w-3.5 h-3.5 stroke-[2]" />
            </>
          ) : (
            <>
              <span>See more</span>
              <ChevronsUpDown className="w-3.5 h-3.5 stroke-[2]" />
            </>
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!isExpanded ? (
          /* ======================================================== */
          /* 1. COMPACT HORIZONTAL TIMELINE VIEW (Max Katz Style)     */
          /* ======================================================== */
          <motion.div
            key="compact-timeline"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full overflow-x-auto pb-3 pt-2 no-scrollbar"
          >
            <div className="relative min-w-[640px] sm:min-w-full px-2">
              {/* Horizontal Connecting Line Track */}
              <div
                className="absolute top-[6px] left-6 right-6 h-[1.5px] bg-zinc-800/80 -z-10"
                aria-hidden="true"
              />

              {/* Horizontal Node Items */}
              <div className="grid grid-cols-5 gap-3 text-left">
                {experiences.map((exp, index) => {
                  const shortPeriod = exp.period.split('·')[0].trim()

                  return (
                    <button
                      key={`${exp.company}-${exp.period}`}
                      onClick={() => setIsExpanded(true)}
                      type="button"
                      className="flex flex-col items-start group text-left cursor-pointer transition-all duration-200"
                    >
                      {/* Node Dot on track line */}
                      <div className="relative flex items-center justify-center mb-3">
                        <span
                          className={`w-3 h-3 rounded-full border-2 border-[#09090b] transition-all duration-200 ${
                            index === 0
                              ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]'
                              : 'bg-zinc-600 group-hover:bg-white group-hover:shadow-[0_0_8px_rgba(255,255,255,0.6)]'
                          }`}
                        />
                      </div>

                      {/* Squircle Badge containing Logo + Company Name */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#141416] border border-white/10 group-hover:border-white/30 group-hover:bg-[#1a1a1e] group-hover:-translate-y-0.5 shadow-sm transition-all duration-200 max-w-full">
                        {exp.logo ? (
                          <Image
                            src={exp.logo}
                            alt={exp.company}
                            width={16}
                            height={16}
                            className="object-contain w-4 h-4 shrink-0 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                            unoptimized
                          />
                        ) : (
                          <span className="w-4 h-4 rounded bg-white/10 flex items-center justify-center text-[9px] font-mono font-bold text-zinc-300 shrink-0">
                            {exp.company.slice(0, 2).toUpperCase()}
                          </span>
                        )}
                        <span className="text-xs font-semibold text-white tracking-tight truncate group-hover:text-white">
                          {exp.company}
                        </span>
                      </div>

                      {/* Date Range */}
                      <span className="text-[11px] font-mono text-zinc-400/80 group-hover:text-zinc-300 transition-colors mt-1.5 truncate max-w-full pl-0.5">
                        {shortPeriod}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          /* ======================================================== */
          /* 2. EXPANDED VERTICAL LIST VIEW (See All Experiences View) */
          /* ======================================================== */
          <motion.div
            key="expanded-list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="divide-y divide-white/[0.06] pt-2"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${exp.period}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.05 }}
                className="py-6 first:pt-2 last:pb-2 flex items-start gap-3 sm:gap-4 group"
              >
                {/* Company Logo Badge */}
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center p-1.5 shrink-0 group-hover:border-white/20 transition-colors shadow-sm mt-0.5">
                  {exp.logo ? (
                    <Image
                      src={exp.logo}
                      alt={exp.company}
                      width={24}
                      height={24}
                      className="object-contain w-5 h-5 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                      unoptimized
                    />
                  ) : (
                    <span className="text-xs font-mono font-bold text-zinc-300">
                      {exp.company.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Right Content */}
                <div className="flex-1 min-w-0">
                  {/* Top Line: Company Name (+ Link) & Period */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-zinc-100 transition-colors">
                        {exp.company}
                      </h3>
                      {exp.url && (
                        <a
                          href={exp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-zinc-400 hover:text-white transition-colors"
                          aria-label={`Visit ${exp.company}`}
                        >
                          <ExternalLink className="w-3.5 h-3.5 stroke-[1.8]" />
                        </a>
                      )}
                    </div>

                    <span className="text-xs font-mono text-zinc-400 font-normal">
                      {exp.period}
                    </span>
                  </div>

                  {/* Subtitle Line: Role */}
                  <p className="text-xs sm:text-sm font-medium text-zinc-400 mt-0.5">
                    {exp.role}
                  </p>

                  {/* Description */}
                  {exp.description && (
                    <p className="text-xs sm:text-sm text-zinc-400/90 leading-relaxed mt-2">
                      {exp.description}
                    </p>
                  )}

                  {/* Bullet achievements list */}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-zinc-300/90">
                      {exp.achievements.map((achievement) => (
                        <li key={achievement} className="flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-500 group-hover:bg-zinc-400 transition-colors" />
                          <span className="leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}





