'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, Award, ChevronsUpDown, X } from 'lucide-react'

interface EducationItem {
  degree: string
  institution: string
  period: string
  location: string
  icon: typeof GraduationCap
  shortName?: string
  highlights?: string[]
}

const educationData: EducationItem[] = [
  {
    degree: "Bachelor of Computer Science and Informatics",
    institution: "Delta University for Science and Technology",
    shortName: "Delta University",
    period: "Aug 2022 – Jun 2026",
    location: "Egypt",
    icon: GraduationCap,
    highlights: [
      "Graduation Project: Ayn — AI-native QA & accreditation platform",
      "Relevant Coursework: Database Systems, Data Structures & Algorithms, Machine Learning, Software Engineering",
      "Built data engineering projects including real-time streaming pipelines and analytics dashboards",
      "Hands-on experience with cloud technologies, distributed systems, and data warehousing"
    ]
  },
  {
    degree: "Data Analytics Scholarship",
    institution: "Digital Egypt Pioneers Initiative (DEPI) — MCIT Egypt",
    shortName: "DEPI Scholarship",
    period: "Oct 2024 – May 2025",
    location: "Egypt",
    icon: Award,
    highlights: [
      "Intensive training in data analytics, ETL pipelines, and business intelligence",
      "Worked on real-world data projects using Python, SQL, and Apache tools",
      "Developed skills in data modeling, visualization, and statistical analysis"
    ]
  }
]

export default function Education() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.section
      id="education"
      className="py-8 sm:py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Row with Title + See More / See Less Toggle Button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-heading mb-0">Education</h2>

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
            key="compact-timeline-edu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full overflow-x-auto pb-3 pt-2 no-scrollbar"
          >
            <div className="relative min-w-[480px] sm:min-w-full px-2">
              {/* Horizontal Line Track */}
              <div
                className="absolute top-[6px] left-6 right-6 h-[1.5px] bg-gradient-to-r from-white/10 via-white/20 to-white/10 -z-10"
                aria-hidden="true"
              />

              {/* Horizontal Node Items */}
              <div className="grid grid-cols-2 gap-6 text-left max-w-xl">
                {educationData.map((edu, index) => {
                  const IconComponent = edu.icon

                  return (
                    <button
                      key={`${edu.institution}-${index}`}
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

                      {/* Squircle Badge containing Icon + Institution / Short Title */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#141416] border border-white/10 group-hover:border-white/30 group-hover:bg-[#1a1a1e] group-hover:-translate-y-0.5 shadow-sm transition-all duration-200 max-w-full">
                        <IconComponent className="w-4 h-4 text-zinc-300 group-hover:text-white stroke-[1.8] shrink-0 transition-colors" />
                        <span className="text-xs font-semibold text-white tracking-tight truncate group-hover:text-white">
                          {edu.shortName || edu.institution}
                        </span>
                      </div>

                      {/* Date Range */}
                      <span className="text-[11px] font-mono text-zinc-400/80 group-hover:text-zinc-300 transition-colors mt-1.5 truncate max-w-full pl-0.5">
                        {edu.period}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          /* ======================================================== */
          /* 2. EXPANDED VERTICAL LIST VIEW (Max Katz Style)          */
          /* ======================================================== */
          <motion.div
            key="expanded-list-edu"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="divide-y divide-white/[0.06] pt-2"
          >
            {educationData.map((edu, index) => {
              const IconComponent = edu.icon

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.05 }}
                  className="py-6 first:pt-2 last:pb-2 flex items-start gap-3 sm:gap-4 group"
                >
                  {/* Icon Badge */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center p-1.5 shrink-0 group-hover:border-white/20 transition-colors shadow-sm mt-0.5">
                    <IconComponent className="w-5 h-5 text-zinc-300 group-hover:text-white stroke-[1.8] transition-colors" />
                  </div>

                  {/* Right Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header line */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-zinc-100 transition-colors">
                        {edu.degree}
                      </h3>

                      <span className="text-xs font-mono text-zinc-400 font-normal">
                        {edu.period}
                      </span>
                    </div>

                    {/* Institution */}
                    <p className="text-xs sm:text-sm font-medium text-zinc-400 mt-0.5">
                      {edu.institution}
                    </p>

                    {/* Bulleted Highlights List */}
                    {edu.highlights && edu.highlights.length > 0 && (
                      <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-zinc-300/90" role="list">
                        {edu.highlights.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-500 group-hover:bg-zinc-400 transition-colors" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}


