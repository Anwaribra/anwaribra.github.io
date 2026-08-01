'use client'

import React from 'react'
import Link from 'next/link'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function Connect() {
  const socialLinks = [
    {
      href: "https://github.com/Anwaribra",
      icon: FaGithub,
      label: "GitHub",
      ariaLabel: "Visit Anwar Mousa's GitHub profile"
    },
    {
      href: "https://www.linkedin.com/in/anwar-mousa/",
      icon: FaLinkedin,
      label: "LinkedIn",
      ariaLabel: "Visit Anwar Mousa's LinkedIn profile"
    },
  ]

  return (
    <motion.section
      id="connect"
      className="py-8 sm:py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="section-heading mb-8 sm:mb-10">Connect</h2>

      <div className="glow-card p-6 sm:p-8 mt-4">
        <p className="text-base sm:text-lg text-gray-300 mb-2 font-medium">
          Let&apos;s work together
        </p>
        <p className="text-sm sm:text-base text-gray-500 mb-6 leading-relaxed">
          I&apos;m always interested in new opportunities, collaborations, and conversations about data engineering.
          Feel free to reach out!
        </p>

        {/* Email link */}
        <a
          href="mailto:anwarmousa100@gmail.com"
          className="inline-flex items-center gap-3 px-5 py-3 rounded-lg text-sm font-medium bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-200 mb-6"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
          <span>Open to new opportunities</span>
        </a>

        <div className="flex flex-wrap gap-3">
          <motion.a
            href="mailto:anwarmousa100@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-[#FF3B30] text-white hover:bg-[#E03228] active:scale-95 transition-all duration-200"
          >
            <FaEnvelope className="text-white" />
            Email Me
          </motion.a>
          <motion.a
            href="https://github.com/Anwaribra"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-[#1A1A1A] border border-[#262626] text-[#D4D4D4] hover:text-white hover:bg-[#222222] active:scale-95 transition-all duration-200"
          >
            <FaGithub className="text-gray-400 group-hover:text-white" />
            GitHub
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/anwar-mousa/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-[#1A1A1A] border border-[#262626] text-[#D4D4D4] hover:text-white hover:bg-[#222222] active:scale-95 transition-all duration-200"
          >
            <FaLinkedin className="text-gray-400 group-hover:text-white" />
            LinkedIn
          </motion.a>
        </div>
      </div>
    </motion.section>
  )
}
