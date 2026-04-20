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
      className="pb-8 sm:pb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col md:flex-row items-start gap-6 sm:gap-8">
        {/* Profile Image */}
        <motion.div
          className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden ring-2 ring-white/10 ring-offset-2 ring-offset-black"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
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

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <motion.h1
                className="text-3xl sm:text-4xl font-bold tracking-tight mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Anwar Mousa
              </motion.h1>

              <motion.p
                className="text-base sm:text-lg text-gray-400 font-medium"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Data Engineer
              </motion.p>
            </div>

            {/* Social icons + CV */}
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href="https://github.com/Anwaribra"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-green-500/30 transition-all duration-200"
                aria-label="GitHub"
              >
                <FaGithub className="text-lg" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/anwar-mousa/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-green-500/30 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-lg" />
              </Link>
              <Link
                href="/assets/docs/CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-green-400 hover:bg-white/10 hover:border-green-500/30 transition-all duration-200 text-sm font-medium"
                aria-label="Download CV"
              >
                <FaFileAlt className="text-sm" />
                <span className="hidden sm:inline">CV</span>
              </Link>
            </motion.div>
          </div>

          <motion.p
            className="mt-4 text-sm sm:text-base text-gray-400 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Passionate about building scalable data pipelines and turning complex datasets into
            actionable insights. I focus on data modeling, ETL workflows, and cloud technologies
            to design reliable systems that enable faster, data-driven decision-making. Experienced
            with Apache Airflow, Kafka, Spark, and Snowflake.
          </motion.p>
        </div>
      </div>
    </motion.section>
  )
}
