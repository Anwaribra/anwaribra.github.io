'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <motion.section 
      className="flex flex-col md:flex-row items-start gap-4 sm:gap-6 mb-8 sm:mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-dark-secondary"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Image
          src="https://github.com/Anwaribra.png"
          alt="Anwar Mousa"
          fill
          className="object-cover profile-image"
          priority
          unoptimized
        />
      </motion.div>
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Anwar Mousa</h1>
            <p className="text-sm sm:text-base text-gray-400">Data Engineer</p>
          </div>
          <Link 
            href="https://github.com/Anwaribra" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xl sm:text-2xl text-white hover:text-accent-green transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-green focus:ring-offset-2 focus:ring-offset-black rounded"
            aria-label="Visit Anwar Mousa's GitHub profile"
          >
            <FaGithub />
          </Link>
        </div>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-300 leading-relaxed">
          I am a Data Engineer passionate about building scalable data pipelines and delivering actionable insights. 
          I focus on data modeling, ETL processes, and cloud technologies to create efficient systems that support data-driven decision-making.
        </p>
      </div>
    </motion.section>
  )
}

