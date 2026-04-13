'use client'

import React from 'react'
import { FaGraduationCap, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

interface Education {
  degree: string
  institution: string
  period: string
  location: string
  description?: string
  highlights?: string[]
}

const education: Education[] = [
  {
    degree: "Bachelor of Computer Science and Informatics",
    institution: "Delta University for Science and Technology",
    period: "Aug 2022 – Jun 2026",
    location: "Egypt",
    highlights: [
      "Graduation Project: Ayn — AI-native QA & accreditation platform",
      "Relevant coursework: Database Systems, Data Structures & Algorithms, Machine Learning, Software Engineering",
      "Built multiple data engineering projects including real-time pipelines and analytics dashboards",
      "Gained hands-on experience with cloud technologies, distributed systems, and data warehousing"
    ]
  },
  {
    degree: "Data Analytics Scholarship - Digital Egypt Pioneers Initiative (DEPI)",
    institution: "Ministry of Communications and Information Technology (MCIT), Egypt",
    period: "Oct 2024 – May 2025",
    location: "Egypt",
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
      <h2 className="section-heading mb-8 sm:mb-10">Education</h2>

      {education.map((edu, index) => (
        <motion.div
          key={index}
          className="glow-card p-5 sm:p-6 mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center mt-0.5">
              <FaGraduationCap className="text-green-400 text-lg" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 mb-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold tracking-tight">{edu.degree}</h3>
                  <p className="text-green-400 font-medium text-sm">{edu.institution}</p>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-1 flex-shrink-0">
                  <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 font-mono">
                    <FaCalendar className="text-[10px]" />
                    {edu.period}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                    <FaMapMarkerAlt className="text-[10px]" />
                    {edu.location}
                  </span>
                </div>
              </div>

              {edu.description && (
                <p className="text-sm text-gray-500 leading-relaxed mb-3">
                  {edu.description}
                </p>
              )}

              {edu.highlights && (
                <ul className="space-y-1.5">
                  {edu.highlights.map((item, i) => (
                    <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                      <span className="text-green-500 mt-1.5 text-[6px]">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.section>
  )
}
