'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { FaGithub, FaExternalLinkAlt, FaGraduationCap, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { Project } from '@/data/portfolio'

interface ProjectsProps {
  projects: Project[]
}

const INITIAL_SHOW = 6

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.08,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
}

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
            <motion.a
              key={project.title}
              href={project.source}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-card flex flex-col group overflow-hidden cursor-pointer"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={index}
              layout
            >
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-base sm:text-lg font-bold tracking-tight group-hover:text-green-400 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {project.isGraduation && (
                      <span className="graduation-badge">
                        <FaGraduationCap />
                        Graduation
                      </span>
                    )}
                    <FaGithub className="text-gray-600 group-hover:text-white transition-colors duration-200" />
                  </div>
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
                    <span
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white/5 border border-white/10 text-white group-hover:bg-white/10 group-hover:border-green-500/30 transition-all duration-200"
                      aria-label={`View source code for ${project.title}`}
                    >
                      <FaGithub className="text-sm" />
                      Source
                    </span>
                    {project.demo && (
                      <Link
                        href={project.demo}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-green-500 text-black hover:bg-green-400 transition-all duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View live demo for ${project.title}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaExternalLinkAlt className="text-xs" />
                        Demo
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.a>
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
