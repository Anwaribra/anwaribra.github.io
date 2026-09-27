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
  return (
    <motion.section
      id="experience"
      className="py-8 sm:py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <h2 className="section-heading mb-6">Experience</h2>

      {/* Ultra Minimalist Horizontal Row View */}
      <div className="flex flex-col pt-2">
        {experiences.map((exp, index) => {
          // Extract the last 4-digit year from the period (e.g. "2026")
          const yearMatch = exp.period.match(/\d{4}/g)
          const year = yearMatch ? yearMatch[yearMatch.length - 1] : (exp.period.toLowerCase().includes('present') ? 'Present' : exp.period.split(' ')[0])

          const CardWrapper = exp.url ? motion.a : motion.div
          const wrapperProps = exp.url ? { href: exp.url, target: "_blank", rel: "noopener noreferrer" } : {}

          return (
            // @ts-ignore - dynamic motion component props
            <CardWrapper
              {...wrapperProps}
              key={`${exp.company}-${exp.period}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              className="py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 group px-4 -mx-4 transition-all cursor-pointer"
            >
              {/* Year */}
              <div className="w-16 shrink-0 text-sm font-mono text-light-muted dark:text-zinc-500 group-hover:text-light-primary dark:group-hover:text-zinc-400 transition-colors">
                {year}
              </div>

              {/* Logo + Company Name */}
              <div className="flex items-center gap-3 w-48 shrink-0">
                <div className="flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {exp.logo ? (
                    <Image
                      src={exp.logo}
                      alt={exp.company}
                      width={20}
                      height={20}
                      className="object-contain w-5 h-5 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                      unoptimized
                    />
                  ) : (
                    <span className="text-[11px] font-mono font-bold text-light-secondary dark:text-zinc-300">
                      {exp.company.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-medium text-light-primary dark:text-zinc-200 group-hover:text-light-primary dark:group-hover:text-white transition-colors">
                  {exp.company}
                </h3>
              </div>

              {/* Role - Right Aligned on Desktop */}
              <div className="flex-1 min-w-0 flex items-center justify-start sm:justify-end gap-2 mt-1 sm:mt-0">
                <p className="text-sm text-light-secondary dark:text-zinc-500 truncate group-hover:text-light-primary dark:group-hover:text-zinc-300 transition-colors">
                  {exp.role}
                </p>
              </div>
            </CardWrapper>
          )
        })}
      </div>
    </motion.section>
  )
}





