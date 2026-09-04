'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const sections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'github', label: 'GitHub' },
  { id: 'connect', label: 'Connect' },
]

export default function DotNav() {
  const [activeSection, setActiveSection] = useState('about')
  const [hoveredDot, setHoveredDot] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0.1 }
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden flex-col items-center gap-3 lg:flex">
      {sections.map(({ id, label }) => (
        <div key={id} className="relative flex items-center">
          {/* Label tooltip */}
          <AnimatePresence>
            {hoveredDot === id && (
              <motion.span
                className="absolute right-6 whitespace-nowrap text-[10px] font-medium text-gray-300 bg-black/80 backdrop-blur-sm border border-white/10 px-2 py-0.5 rounded"
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 5 }}
                transition={{ duration: 0.15 }}
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Dot */}
          <button
            onClick={() => scrollTo(id)}
            onTouchStart={() => setHoveredDot(id)}
            onTouchEnd={() => setTimeout(() => setHoveredDot(null), 800)}
            className="relative p-1.5 group"
            aria-label={`Go to ${label}`}
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                activeSection === id
                  ? 'w-2.5 h-2.5 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]'
                  : 'w-1.5 h-1.5 bg-gray-600 group-active:bg-gray-400'
              }`}
            />
          </button>
        </div>
      ))}
    </nav>
  )
}
