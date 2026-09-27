'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ExternalLink, Award, ShieldCheck } from 'lucide-react'
import { FaAws } from 'react-icons/fa'
import { SiGoogle } from 'react-icons/si'
import { Certification } from '@/data/portfolio'

interface CertificationsProps {
  certifications: Certification[]
}

const ISSUER_META: Record<string, { icon: React.ReactNode; tag: string }> = {
  "Amazon Web Services": {
    icon: <FaAws className="w-5 h-5 text-zinc-400 dark:text-zinc-300 group-hover:text-[#FF9900] transition-colors" />,
    tag: "AWS Certified",
  },
  Google: {
    icon: <SiGoogle className="w-4 h-4 text-zinc-400 dark:text-zinc-300 group-hover:text-[#4285F4] transition-colors" />,
    tag: "Google Professional",
  },
  "Digital Egypt Pioneers Initiative (DEPI)": {
    icon: <ShieldCheck className="w-5 h-5 text-zinc-400 dark:text-zinc-300 group-hover:text-cyan-400 transition-colors" />,
    tag: "DEPI Specialist",
  },
}

export default function Certifications({ certifications }: CertificationsProps) {
  return (
    <motion.section
      id="certifications"
      className="py-8 sm:py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h2 className="section-heading mb-0">Certifications</h2>
      </div>

      <div className="flex flex-col pt-2">
        {certifications.map((cert, index) => {
          const meta = ISSUER_META[cert.issuer] ?? {
            icon: <Award className="w-4 h-4 text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors" />,
            tag: "Verified Certificate",
          }

          const CardWrapper = cert.url ? motion.a : motion.div
          const wrapperProps = cert.url ? { href: cert.url, target: "_blank", rel: "noopener noreferrer" } : {}

          // Format long issuer names for cleaner layout
          const displayIssuer = cert.issuer.includes("DEPI") ? "DEPI" : cert.issuer

          return (
            // @ts-ignore - dynamic motion component props
            <CardWrapper
              {...wrapperProps}
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              className="py-3 sm:py-4 flex flex-col sm:flex-row gap-1 sm:gap-6 group px-4 -mx-4 transition-all cursor-pointer"
            >
              {/* Issuer (Left Column) */}
              <div className="w-48 shrink-0 text-sm font-medium text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-400 transition-colors">
                {displayIssuer}
              </div>

              {/* Icon + Title (Right Column) */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {meta.icon}
                </div>
                <h3 className="text-base font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white transition-colors truncate">
                  {cert.name}
                </h3>
                {cert.url && (
                  <ExternalLink className="w-3.5 h-3.5 stroke-[2] text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors shrink-0" />
                )}
              </div>
            </CardWrapper>
          )
        })}
      </div>
    </motion.section>
  )
}
