'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Certification } from '@/data/portfolio'

interface CertificationsProps {
  certifications: Certification[]
}

export default function Certifications({ certifications }: CertificationsProps) {
  return (
    <motion.section 
      className="mb-8 sm:mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Certifications</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            className="bg-[#111111] rounded-lg p-4 sm:p-6 hover:bg-[#1a1a1a] transition-colors duration-200 group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <div className="relative w-full h-32 sm:h-40 mb-4 overflow-hidden rounded">
              <Image
                src={cert.image}
                alt={cert.name}
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-sm sm:text-base font-bold mb-1">{cert.name}</h3>
            <p className="text-xs sm:text-sm text-gray-400">{cert.issuer}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

