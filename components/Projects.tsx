'use client'

import React from 'react'
import Link from 'next/link'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { Project } from '@/data/portfolio'

interface ProjectsProps {
  projects: Project[]
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <motion.section 
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg sm:text-xl font-bold mb-4">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <motion.div 
            key={index} 
            className="bg-[#111111] rounded-lg p-4 sm:p-6 hover:bg-[#1a1a1a] transition-colors duration-200 group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <div>
              <h3 className="text-base sm:text-lg font-bold mb-2">{project.title}</h3>
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="mt-auto">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {project.technologies.map((tech, i) => (
                    <React.Fragment key={i}>
                      <span className="text-[10px] sm:text-sm text-gray-300">{tech}</span>
                      {i < project.technologies.length - 1 && (
                        <span className="text-[10px] sm:text-sm text-gray-600">•</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Link 
                    href={project.source} 
                    className="inline-flex items-center px-3 py-1 rounded bg-white text-black text-sm hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#111111]"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View source code for ${project.title}`}
                  >
                    <FaGithub className="mr-2" />
                    Source
                  </Link>
                  {project.demo && (
                    <Link 
                      href={project.demo} 
                      className="inline-flex items-center px-3 py-1 rounded bg-accent-green text-black text-sm hover:bg-green-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-green focus:ring-offset-2 focus:ring-offset-[#111111]"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View live demo for ${project.title}`}
                    >
                      <FaExternalLinkAlt className="mr-2" />
                      Demo
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

