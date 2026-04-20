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
          className="inline-flex items-center gap-3 px-5 py-3 rounded-lg text-sm font-medium bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 hover:border-green-500/30 transition-all duration-200 mb-6"
          aria-label="Send email to anwarmousa100@gmail.com"
        >
          <FaEnvelope />
          anwarmousa100@gmail.com
        </a>

        {/* Divider */}
        <div className="section-divider my-6" />

        {/* Social links */}
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((link, index) => {
            const Icon = link.icon
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-sm font-medium bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-green-500/30 transition-all duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                >
                  <Icon className="text-base" />
                  {link.label}
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>


    </motion.section>
  )
}
