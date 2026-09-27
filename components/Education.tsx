'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Award } from 'lucide-react'

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
  return (
    <motion.section
      id="education"
      className="py-8 sm:py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Row */}
      <div className="mb-6">
        <h2 className="section-heading mb-0">Education</h2>
      </div>

      {/* Ultra Minimalist Horizontal Row View */}
      <div className="flex flex-col pt-2">
        {educationData.map((edu, index) => {


          const IconComponent = edu.icon

          return (
            <motion.div
              key={`${edu.institution}-${index}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              className="py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 group px-4 -mx-4 transition-all"
            >
              {/* Period */}
              <div className="w-32 sm:w-36 shrink-0 text-[11px] sm:text-xs font-mono text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-400 transition-colors pt-0.5">
                {edu.period}
              </div>

              {/* Icon + Institution */}
              <div className="flex items-center gap-3 sm:w-64 shrink-0">
                <div className="flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-5 h-5 text-zinc-500 dark:text-zinc-500 group-hover:text-black dark:group-hover:text-zinc-300 transition-colors" />
                </div>
                <h3 className="text-base font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white transition-colors">
                  {edu.shortName || edu.institution}
                </h3>
              </div>

              {/* Degree - Right Aligned on Desktop */}
              <div className="flex-1 min-w-0 flex items-center justify-start sm:justify-end gap-2 mt-1 sm:mt-0">
                <p className="text-sm text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors text-right sm:text-right">
                  {edu.degree}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}


