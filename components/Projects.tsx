'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaGithub, FaExternalLinkAlt, FaGraduationCap, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { Project } from '@/data/portfolio'

interface ProjectsProps {
  projects: Project[]
}

const INITIAL_SHOW = 6

export default function Projects({ projects }: ProjectsProps) {
  const [showAll, setShowAll] = useState(false)

  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_SHOW)
  const hasMore = projects.length > INITIAL_SHOW

  return (
    <motion.section
      id="projects"
      className="py-8 sm:py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="section-heading mb-8 sm:mb-10">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mt-4">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.title}
              className="glow-card flex flex-col group overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              layout
            >

              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-base sm:text-lg font-bold tracking-tight group-hover:text-green-400 transition-colors">
                    {project.title}
                  </h3>
                  {project.isGraduation && (
                    <span className="graduation-badge flex-shrink-0">
                      <FaGraduationCap />
                      Graduation
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-500 mb-4 leading-relaxed flex-1">
                  {project.description}
                </p>

                <div className="mt-auto">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={project.source}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-green-500/30 transition-all duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View source code for ${project.title}`}
                    >
                      <FaGithub className="text-sm" />
                      Source
                    </Link>
                    {project.demo && (
                      <Link
                        href={project.demo}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-green-500 text-black hover:bg-green-400 transition-all duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View live demo for ${project.title}`}
                      >
                        <FaExternalLinkAlt className="text-xs" />
                        Demo
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Show More / Show Less Button */}
      {hasMore && (
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-green-500/30 transition-all duration-200"
          >
            {showAll ? (
              <>
                Show Less <FaChevronUp className="text-xs" />
              </>
            ) : (
              <>
                Show All Projects ({projects.length}) <FaChevronDown className="text-xs" />
              </>
            )}
          </button>
        </motion.div>
      )}
    </motion.section>
  )
}
