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
      className="mb-8 sm:mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Work Experience</h2>
      <div className="space-y-4 sm:space-y-6">
        {experiences.map((exp, index) => (
          <motion.div 
            key={index} 
            className="flex flex-col gap-1 sm:gap-2 bg-[#111111] rounded-lg p-4 sm:p-6 hover:bg-[#1a1a1a] transition-colors duration-200"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div>
              <h3 className="text-base sm:text-lg font-bold">{exp.role}</h3>
              <p className="text-sm sm:text-base text-gray-400">{exp.company}</p>
            </div>
            <p className="text-sm sm:text-base text-gray-400">{exp.period}</p>
            {exp.description && (
              <p className="text-sm sm:text-base text-gray-300 mt-2 leading-relaxed">{exp.description}</p>
            )}
            {exp.achievements && exp.achievements.length > 0 && (
              <ul className="mt-3 space-y-2 text-sm sm:text-base text-gray-300" role="list">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-accent-green mr-2">▸</span>
                    <span>{achievement}</span>
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

