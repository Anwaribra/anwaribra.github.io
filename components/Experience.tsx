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
      
      {/* Refined Timeline Container with Lower Contrast Border */}
      <div className="relative border-l border-white/[0.08] ml-4 sm:ml-6 space-y-8 sm:space-y-10 pl-6 sm:pl-8 mt-6">
        {experiences.map((exp, index) => {
          const isPresent = exp.period.toLowerCase().includes('present')

          return (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Refined Timeline Node Dot */}
              <div 
                className={`absolute -left-[31px] sm:-left-[39px] top-2 flex items-center justify-center w-4 h-4 rounded-full transition-all duration-300 ${
                  index === 0 
                    ? 'bg-[#FF3B30] shadow-[0_0_10px_rgba(255,59,48,0.5)]' 
                    : 'bg-[#111111] border border-white/20 group-hover:border-white/60'
                }`}
              >
                <span className={`w-1 h-1 rounded-full ${index === 0 ? 'bg-white animate-pulse' : 'bg-white/40 group-hover:bg-white'}`} />
              </div>

              {/* Surface Elevated Glass Card */}
              <div className="glow-card p-5 sm:p-6 bg-[#111111]/90 backdrop-blur-xl border border-white/[0.08] transition-all duration-[220ms] ease-out rounded-2xl group-hover:-translate-y-[2px] group-hover:bg-[#161616] group-hover:border-white/20">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-4 mb-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-white transition-colors duration-200">
                      {exp.role}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-zinc-400 mt-0.5">{exp.company}</p>
                  </div>

                  {/* Period Badge / Text */}
                  {isPresent ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono text-zinc-300 bg-white/[0.05] border border-white/10 whitespace-nowrap self-start sm:self-auto">
                      {exp.period}
                    </span>
                  ) : (
                    <span className="text-xs text-zinc-400 font-mono whitespace-nowrap self-start sm:self-auto">
                      {exp.period}
                    </span>
                  )}
                </div>

                {/* Description bounded for 2–3 comfortable reading lines */}
                {exp.description && (
                  <p className="text-sm text-zinc-300 max-w-2xl mb-4 leading-relaxed">{exp.description}</p>
                )}

                {/* Achievements List */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="space-y-2.5" role="list">
                    {exp.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.12 + i * 0.05 }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 mt-2 flex-shrink-0" />
                        <span className="leading-relaxed">{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}
