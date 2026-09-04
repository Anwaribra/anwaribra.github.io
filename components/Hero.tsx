'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { FileText, Mail } from 'lucide-react'
import { FaGithub, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <motion.section
      id="about"
      className="relative pb-12 sm:pb-16 max-w-4xl mx-auto"
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

            {/* Social Icons (Borderless - Max Katz Style) */}
            <motion.div
              className="relative flex items-center gap-4 sm:gap-5 text-zinc-400 text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <Link
                href="https://github.com/Anwaribra"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-200"
                aria-label="GitHub"
              >
                <FaGithub className="text-base" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/anwar-mousa/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-base" />
              </Link>
              <a
                href="mailto:anwarmousa100@gmail.com"
                className="hover:text-white transition-colors duration-200"
                aria-label="Email"
              >
                <Mail className="w-4.5 h-4.5 stroke-[1.8]" />
              </a>
              <Link
                href="/assets/docs/CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-200"
                aria-label="Download CV"
              >
                <FileText className="w-4.5 h-4.5 stroke-[1.8]" />
              </Link>

              {/* Batman Emblem Watermark anchored cleanly in the top right background */}
              <div 
                className="absolute -top-6 right-0 -z-10 pointer-events-none select-none opacity-35 sm:opacity-45" 
                aria-hidden="true"
              >
                <div className="relative w-44 h-24 sm:w-64 sm:h-36 select-none pointer-events-none">
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

          {/* Direct CTA Action Buttons */}
          <motion.div
            className="mt-5 flex flex-wrap items-center gap-3 relative z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href="mailto:anwarmousa100@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-all duration-200 shadow-md active:scale-95"
            >
              <Mail className="w-3.5 h-3.5 stroke-[2]" /> Get in Touch
            </a>
          </motion.div>
        </div>
      </div>

      {/* ThinkerLab Inspired Glowing Arc Curve Divider between Hero and Experience */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-full max-w-5xl h-16 pointer-events-none -z-10 overflow-hidden opacity-60 sm:opacity-75">
        <svg className="w-full h-full" viewBox="0 0 1000 80" preserveAspectRatio="none">
          <defs>
            <linearGradient id="hero-divider-curve" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="25%" stopColor="#ffffff" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="75%" stopColor="#ffffff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 0,10 Q 500,70 1000,10"
            fill="none"
            stroke="url(#hero-divider-curve)"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </motion.section>
  )
}






