'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Experience } from '@/data/portfolio'

interface ExperienceProps {
  experiences: Experience[]
}

export default function ExperienceSection({ experiences }: ExperienceProps) {
  return (
    <motion.section
      id="experience"
      className="py-8 sm:py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="section-heading mb-8 sm:mb-10">Work Experience</h2>
      <div className="space-y-0 mt-4">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="relative pl-8 pb-8 last:pb-0 group"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            {/* Timeline line */}
            {index < experiences.length - 1 && (
              <div className="timeline-line" />
            )}

            {/* Timeline dot */}
            <div className={`absolute left-0 top-1.5 timeline-dot ${index === 0 ? 'timeline-dot-active' : ''}`} />

            {/* Content card */}
            <div className="glow-card p-5 sm:p-6 ml-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 mb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold tracking-tight">{exp.role}</h3>
                  <p className="text-sm font-medium text-green-400/80">{exp.company}</p>
                </div>
                <span className="text-xs sm:text-sm text-gray-500 font-mono whitespace-nowrap">{exp.period}</span>
              </div>
              {exp.description && (
                <p className="text-sm text-gray-400 mb-3 leading-relaxed">{exp.description}</p>
              )}
              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="space-y-2" role="list">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-400">
                      <span className="text-green-500 mt-0.5 flex-shrink-0">▸</span>
                      <span className="leading-relaxed">{achievement}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
