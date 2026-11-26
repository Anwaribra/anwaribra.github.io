'use client'

import React from 'react'
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
      className="pt-2 pb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h2 className="section-heading mb-0">Certifications</h2>
      </div>

      <div className="flex flex-col gap-2 pt-1">
        {certifications.map((cert) => {
          const issuer = cert.issuer.includes('DEPI') ? 'DEPI' : cert.issuer
          const body = (
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 px-4 py-3 hover:border-[#A855F7]/60 transition-colors">
              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{cert.name}</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 shrink-0">{issuer === 'Amazon Web Services' ? 'AWS' : issuer}</span>
            </div>
          )
          return cert.url
            ? <a key={cert.name} href={cert.url} target="_blank" rel="noopener noreferrer">{body}</a>
            : <div key={cert.name}>{body}</div>
        })}
      </div>
    </motion.section>
  )
}
