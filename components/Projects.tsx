'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ExternalLink, 
  ChevronsUpDown, 
  X 
} from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { Project } from '@/data/portfolio'

interface ProjectsProps {
  projects: Project[]
}

// Precise Gamma (γ) vector icon matching user screenshot
const ProjectLogoIcon = ({ className = "w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M7 4.5c1.2 3.8 3.5 8 5.2 12.5 0 0-2.2 2.2-2 0s2.2-4.2 3.8-6L17.5 4.5" />
  </svg>
)

export default function Projects({ projects }: ProjectsProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Display top 4 projects when collapsed, or all projects when expanded
  const INITIAL_SHOW = 4
  const visibleProjects = isExpanded ? projects : projects.slice(0, INITIAL_SHOW)

  return (
    <motion.section
      id="projects"
      className="py-8 sm:py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Row: Title + Toggle Button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-heading mb-0">Projects</h2>

        {projects.length > INITIAL_SHOW && (
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
                <span>See all projects ({projects.length})</span>
                <ChevronsUpDown className="w-3.5 h-3.5 stroke-[2]" />
              </>
            )}
          </button>
        )}
      </div>

      {/* Clean Borderless List View (Experience Style - Max Katz) */}
      <div className="divide-y divide-white/[0.06] pt-2">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project, index) => {
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                className="py-6 first:pt-2 last:pb-2 flex items-start gap-3 sm:gap-4 group"
              >
                {/* Project Icon Badge with Custom V Logo matching user drawing */}
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center p-1.5 shrink-0 group-hover:border-white/20 transition-colors shadow-sm mt-0.5">
                  <ProjectLogoIcon className="w-5 h-5 text-zinc-400 group-hover:text-white stroke-[1.8] transition-colors" />
                </div>

                {/* Right Content */}
                <div className="flex-1 min-w-0">
                  {/* Top Line: Title & Action Links */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-zinc-100 transition-colors">
                      {project.title}
                    </h3>

                    {/* Action Links */}
                    <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                      <a
                        href={project.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-zinc-300 hover:text-white hover:bg-white/[0.08] hover:border-white/20 text-xs font-mono font-medium transition-all duration-200"
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
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white text-black hover:bg-zinc-200 text-xs font-mono font-medium transition-all duration-200 shadow-sm"
                          aria-label={`Live Demo for ${project.title}`}
                        >
                          <span>Demo</span>
                          <ExternalLink className="w-3 h-3 stroke-[2]" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-400/90 leading-relaxed mt-2">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-mono text-zinc-400 bg-white/[0.04] border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Bottom Toggle Button if expanded */}
      {projects.length > INITIAL_SHOW && (
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-medium text-zinc-300 bg-white/[0.05] border border-white/10 hover:border-white/25 hover:text-white rounded-xl transition-all duration-200 cursor-pointer active:scale-95 shadow-sm"
          >
            {isExpanded ? (
              <>
                <span>See less</span>
                <X className="w-3.5 h-3.5 stroke-[2]" />
              </>
            ) : (
              <>
                <span>See all projects ({projects.length})</span>
                <ChevronsUpDown className="w-3.5 h-3.5 stroke-[2]" />
              </>
            )}
          </button>
        </div>
      )}
    </motion.section>
  )
}
