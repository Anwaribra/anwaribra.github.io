'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHome, FaFolderOpen, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const dockItems = [
  {
    id: 'about',
    label: 'Home',
    icon: FaHome,
    href: '#about',
    external: false,
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: FaFolderOpen,
    href: '#projects',
    external: false,
  },
  {
    id: 'divider-1',
    isDivider: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: FaGithub,
    href: 'https://github.com/Anwaribra',
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: FaLinkedin,
    href: 'https://www.linkedin.com/in/anwar-mousa/',
    external: true,
  },
  {
    id: 'connect',
    label: 'Contact',
    icon: FaEnvelope,
    href: '#connect',
    external: false,
  },
]

export default function FloatingDock() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<string>('about')

  useEffect(() => {
    const handleScroll = () => {
      const connectEl = document.getElementById('connect')
      const projectsEl = document.getElementById('projects')

      if (connectEl && connectEl.getBoundingClientRect().top <= window.innerHeight * 0.5) {
        setActiveSection('connect')
      } else if (projectsEl && projectsEl.getBoundingClientRect().top <= window.innerHeight * 0.4 && projectsEl.getBoundingClientRect().bottom > 150) {
        setActiveSection('projects')
      } else {
        setActiveSection('about')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScrollTo = (href: string) => {
    const targetId = href.replace('#', '')
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 md:hidden pointer-events-none">
      <motion.nav
        className="pointer-events-auto relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0a0a0d]/85 backdrop-blur-2xl border border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.85)] ring-1 ring-white/5"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 350, damping: 26, delay: 0.1 }}
      >
        {dockItems.map((item) => {
          if (item.isDivider) {
            return (
              <div
                key={item.id}
                className="w-[1px] h-4 bg-white/10 mx-0.5"
                aria-hidden="true"
              />
            )
          }

          const IconComponent = item.icon!
          const isActive = !item.external && activeSection === item.id

          const buttonContent = (
            <motion.div
              className={`relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 ${
                isActive
                  ? 'bg-white/[0.09] text-white shadow-[0_0_12px_rgba(255,255,255,0.1)]'
                  : 'bg-transparent text-zinc-400 hover:text-white hover:bg-white/[0.05]'
              }`}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.92 }}
              onMouseEnter={() => setActiveTooltip(item.id)}
              onMouseLeave={() => setActiveTooltip(null)}
              onTouchStart={() => setActiveTooltip(item.id)}
              onTouchEnd={() => setTimeout(() => setActiveTooltip(null), 1000)}
            >
              <IconComponent className={`text-sm ${isActive ? 'text-red-400' : ''}`} />

              {/* Minimal Red Glowing Active Dot */}
              {isActive && (
                <motion.span
                  layoutId="activeDockDot"
                  className="absolute -bottom-0.5 w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}

              {/* Glassmorphism Floating Tooltip */}
              <AnimatePresence>
                {activeTooltip === item.id && (
                  <motion.div
                    className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-zinc-200 bg-[#121216]/95 border border-white/10 rounded-md backdrop-blur-xl whitespace-nowrap shadow-md pointer-events-none"
                    initial={{ opacity: 0, y: 4, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 3, scale: 0.9 }}
                    transition={{ duration: 0.12 }}
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )

          if (item.external) {
            return (
              <Link
                key={item.id}
                href={item.href!}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="relative flex items-center justify-center"
              >
                {buttonContent}
              </Link>
            )
          }

          return (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.href!)}
              aria-label={item.label}
              className="relative flex items-center justify-center"
            >
              {buttonContent}
            </button>
          )
        })}
      </motion.nav>
    </div>
  )
}
