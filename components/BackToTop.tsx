'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowUp } from 'react-icons/fa'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 w-11 h-11 rounded-full hidden md:flex items-center justify-center bg-light-surface dark:bg-white/[0.06] backdrop-blur-md border border-light-border dark:border-white/10 text-light-secondary dark:text-white hover:bg-[rgba(24,24,27,0.05)] dark:hover:bg-white/[0.12] hover:border-black/20 dark:hover:border-white/25 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 ease-out"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-sm text-light-secondary dark:text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
