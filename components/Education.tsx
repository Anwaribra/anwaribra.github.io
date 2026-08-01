'use client'

import React from 'react'
import { FaGraduationCap, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

interface EducationItem {
  degree: string
  institution: string
  period: string
  location: string
  description?: string
  highlights?: string[]
}

const educationData: EducationItem[] = [
  {
    degree: "Bachelor of Computer Science and Informatics",
    institution: "Delta University for Science and Technology",
    period: "Aug 2022 – Jun 2026",
    location: "Egypt",
    highlights: [
      "Graduation Project: Ayn — AI-native QA & accreditation platform",
      "Relevant Coursework: Database Systems, Data Structures & Algorithms, Machine Learning, Software Engineering",
      "Built data engineering projects including real-time streaming pipelines and analytics dashboards",
      "Hands-on experience with cloud technologies, distributed systems, and data warehousing"
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

      <div className="space-y-6 mt-4">
        {educationData.map((edu, index) => (
          <motion.div
            key={index}
            className="glow-card group p-6 sm:p-8 bg-[#111111]/90 backdrop-blur-xl border border-white/[0.08] rounded-3xl transition-all duration-[220ms] ease-out hover:-translate-y-1 hover:bg-[#161616] hover:border-white/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            {/* Top Row: Icon + Title/Institution + Quiet Right Metadata */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                {/* Graduation Icon in subtle glass square */}
                <div className="w-12 h-12 rounded-2xl bg-[#181818] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-white/20 transition-colors duration-200">
                  <FaGraduationCap className="text-xl text-white" />
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                    {edu.degree}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-[#A3A3A3] mt-1">
                    {edu.institution}
                  </p>
                </div>
              </div>

              {/* Quiet Right-aligned Date & Location Metadata */}
              <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-1.5 flex-shrink-0 self-start sm:self-auto pt-1">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D4D4D4]">
                  <FaCalendar className="text-[10px] text-[#A3A3A3]" />
                  {edu.period}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A3A3A3]">
                  <FaMapMarkerAlt className="text-[10px] text-[#A3A3A3]" />
                  {edu.location}
                </span>
              </div>
            </div>

            {/* Middle: Thin Divider with Very Low Opacity */}
            {edu.highlights && edu.highlights.length > 0 && (
              <div className="border-b border-white/[0.06] my-5 sm:my-6" />
            )}

            {/* Bottom: Clean Editorial Highlight List (No mini cards!) */}
            {edu.highlights && edu.highlights.length > 0 && (
              <ul className="space-y-2.5">
                {edu.highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#D4D4D4] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B30] mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
