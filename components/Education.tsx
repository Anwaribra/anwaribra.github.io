'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Award } from 'lucide-react'
import { SoftAccordion } from '@/components/thinker-ui/FeedbackControls'
import { AgenticBadge } from '@/components/thinker-ui/AgenticControls'

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
      className="pt-2 pb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Row */}
      <div className="mb-6">
        <h2 className="section-heading mb-0">Education</h2>
      </div>

      <SoftAccordion
        defaultOpen={false}
        items={educationData.map((edu) => ({
          id: edu.shortName || edu.institution,
          title: (edu.shortName || edu.institution) + ' · ' + edu.period,
          content: (
            <div className="space-y-2">
              <p><AgenticBadge tone="review" label={edu.degree} /></p>
              <ul className="list-disc pl-4 space-y-1">{(edu.highlights || []).map((h) => <li key={h}>{h}</li>)}</ul>
            </div>
          ),
        }))}
      />
    </motion.section>
  )
}


