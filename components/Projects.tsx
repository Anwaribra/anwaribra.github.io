'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { Project } from '@/data/portfolio'

interface ProjectsProps {
  projects: Project[]
  title?: string
  subtitle?: string
}

export default function Projects({
  projects,
  title = 'Projects',
  subtitle,
}: ProjectsProps) {
  return (
    <motion.section
      id="projects"
      className="pb-12"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 font-normal">
            {subtitle}
          </p>
        )}
      </div>

      {/* Projects List */}
      <div className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
        {projects.map((project, index) => {
          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.03 }}
              className="py-5 first:pt-2 last:pb-4 flex flex-col group"
            >
              {/* Content */}
              <div className="w-full">
                {/* Title & Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight group-hover:text-zinc-950 dark:group-hover:text-[#A855F7] transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                    <a
                      href={project.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-[#A855F7] hover:border-zinc-900/30 dark:hover:border-[#A855F7]/30 transition-all duration-200 text-xs font-mono font-medium"
                      aria-label={`Source code for ${project.title}`}
                    >
                      <FaGithub className="text-xs" />
                      <span>Source</span>
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target={project.demo.startsWith('/') ? undefined : '_blank'}
                        rel={project.demo.startsWith('/') ? undefined : 'noopener noreferrer'}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#A855F7] text-white hover:bg-[#9333ea] text-xs font-mono font-semibold transition-all duration-200 shadow-sm"
                        aria-label={`Live Demo for ${project.title}`}
                      >
                        <span>Demo</span>
                        <ExternalLink className="w-3 h-3 stroke-[2.2]" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mt-2 font-normal">
                  {project.description}
                </p>

                {/* Technology Badges */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 mt-3">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-black/[0.03] dark:bg-white/[0.03] text-zinc-600 dark:text-zinc-400 border border-black/[0.05] dark:border-white/[0.06] hover:border-[#A855F7]/30 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}
