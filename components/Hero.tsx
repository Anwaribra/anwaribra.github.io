'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <motion.section
      id="about"
      className="pb-8 sm:pb-12 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
        {/* Profile Photo */}
        <motion.div
          className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl p-1 bg-gradient-to-b from-white/15 to-white/5 border border-white/10 shadow-2xl flex-shrink-0"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative w-full h-full rounded-[14px] overflow-hidden">
            <Image
              src="https://github.com/Anwaribra.png"
              alt="Anwar Ibrahim"
              fill
              className="object-cover profile-image"
              priority
              unoptimized
            />
          </div>
        </motion.div>

        {/* Hero Content Container */}
        <div className="flex-1 w-full">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-3">
            <div>
              <motion.h1
                className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-1"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Anwar Ibrahim
              </motion.h1>

              <motion.p
                className="text-base sm:text-lg font-medium text-zinc-300 tracking-wide"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                Data Engineer
              </motion.p>
            </div>

            {/* Social Actions + Batman Emblem relative container */}
            <motion.div
              className="relative flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <Link
                href="https://github.com/Anwaribra"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.08] hover:border-red-500/30 active:scale-95 transition-all duration-200"
                aria-label="GitHub"
              >
                <FaGithub className="text-lg" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/anwar-mousa/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.08] hover:border-red-500/30 active:scale-95 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-lg" />
              </Link>
              <Link
                href="/assets/docs/CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.08] hover:border-red-500/30 active:scale-95 transition-all duration-200"
                aria-label="Download CV"
              >
                <FaFileAlt className="text-lg" />
              </Link>

              {/* Batman Emblem Watermark near social icons */}
              <div 
                className="absolute top-full left-1/2 -translate-x-1/2 -mt-10 -z-10 pointer-events-none select-none opacity-45 sm:opacity-55" 
                aria-hidden="true"
              >
                <div className="relative w-56 h-32 sm:w-72 sm:h-40 select-none pointer-events-none">
                  <Image
                    src="/78b72283-9eab-4d14-9aad-25689318b047.svg"
                    alt="Bat Watermark"
                    fill
                    className="object-contain select-none pointer-events-none filter [filter:brightness(0)_invert(25%)_sepia(100%)_saturate(4000%)_hue-rotate(345deg)]"
                    unoptimized
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Short Personal Summary */}
          <motion.div
            className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal space-y-1 mt-3 max-w-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p>Building software powered by data.</p>
            <p>From data platforms and analytics systems to AI-powered applications and digital products.</p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
