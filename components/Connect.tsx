'use client'

import React from 'react'
import Link from 'next/link'
import { FaGithub, FaTwitter, FaLinkedin, FaFileAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function Connect() {
  const socialLinks = [
    {
      href: "https://github.com/Anwaribr1",
      icon: FaGithub,
      label: "Github",
      ariaLabel: "Visit Anwar Mousa's GitHub profile"
    },
    {
      href: "https://x.com/_vincenzzo",
      icon: FaTwitter,
      label: "Twitter",
      ariaLabel: "Visit Anwar Mousa's Twitter profile"
    },
    {
      href: "https://www.linkedin.com/in/anwar-mousa/",
      icon: FaLinkedin,
      label: "LinkedIn",
      ariaLabel: "Visit Anwar Mousa's LinkedIn profile"
    },
    {
      href: "/assets/docs/CV.pdf",
      icon: FaFileAlt,
      label: "CV",
      ariaLabel: "Download Anwar Mousa's CV"
    }
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Connect</h2>
      <p className="text-sm sm:text-base mb-4 sm:mb-6">
        Feel free to contact me at{' '}
        <a 
          href="mailto:anwarmousa100@gmail.com" 
          className="text-accent-green hover:underline focus:outline-none focus:ring-2 focus:ring-accent-green focus:ring-offset-2 focus:ring-offset-black rounded"
          aria-label="Send email to anwarmousa100@gmail.com"
        >
          anwarmousa100@gmail.com
        </a>
      </p>
      <div className="flex flex-wrap gap-2 sm:gap-3">
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
                className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-[#1a1a1a] text-white text-sm hover:bg-[#252525] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-green focus:ring-offset-2 focus:ring-offset-black"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
              >
                <Icon className="mr-2" />
                {link.label}
              </Link>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}

