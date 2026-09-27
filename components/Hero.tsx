'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { FileText, Mail } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { motion } from 'framer-motion'

import HeroVideoBackground from '@/components/HeroVideoBackground'

export default function Hero() {
  return (
    <motion.section
      id="about"
      className="relative pb-12 sm:pb-16 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* 1. Full-Width Video Section (NO TEXT OVERLAY) */}
      <div className="relative w-[100vw] left-1/2 -translate-x-1/2 h-[220px] sm:h-[280px] lg:h-[320px] mb-4 sm:mb-5">
        <HeroVideoBackground />
      </div>

      {/* 2. About Section Below (Identity + Description) */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-0">
        
        {/* Identity Row: Small Circular Avatar + Name */}
        <div className="flex flex-row items-center gap-4 mb-4">
          {/* Small Circular Profile Photo */}
          <motion.div
            className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src="https://github.com/Anwaribra.png"
              alt="Anwar Ibrahim"
              fill
              className="object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500 border border-black/10 dark:border-white/10 shadow-lg"
              priority
              unoptimized
            />
          </motion.div>

          {/* Name & Title */}
          <div className="flex flex-col justify-center">
            <motion.h1
              className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white tracking-tight"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Anwar Ibrahim
            </motion.h1>
            <motion.p
              className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              Software Engineer
            </motion.p>
          </div>
        </div>


        {/* Short Personal Summary */}
        <motion.div
          className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400/90 leading-relaxed font-normal space-y-3 mb-6 ml-[3.5rem] sm:ml-[4.5rem]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p>
            Building software at{' '}
            <a 
              href="https://www.thinkerlab.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group inline-block font-medium text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white transition-colors"
            >
              <span className="underline decoration-zinc-400 dark:decoration-zinc-500 underline-offset-4 group-hover:decoration-black dark:group-hover:decoration-white transition-colors">Thinker</span>
              {/* Sleek Tiny Tooltip */}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-8 h-8 bg-light-surface dark:bg-[#121214] border border-light-border dark:border-white/10 rounded-lg shadow-xl opacity-0 scale-75 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 origin-bottom flex items-center justify-center z-50">
                <img src="/assets/logos/thinkerlab.png" alt="Thinker" className="w-4 h-4 object-contain dark:brightness-200" />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-light-surface dark:bg-[#121214] border-b border-r border-light-border dark:border-white/10 rotate-45"></span>
              </span>
            </a>.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            Architecting robust data platforms, streaming pipelines, and scalable AI infrastructure. 
            I specialize in transforming complex, large-scale data into intelligent, autonomous systems. 
            With expertise in advanced ETL processes, data warehousing, and AI-powered applications, 
            I bridge the gap between raw data and actionable business intelligence.
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}
