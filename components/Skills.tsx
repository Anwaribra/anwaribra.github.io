'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface Skill {
  name: string
}

interface SkillCategory {
  title: string
  skills: Skill[]
}

const skillsData: SkillCategory[] = [
  {
    title: "Data Engineering Core",
    skills: [
      { name: "ETL / ELT Pipelines" },
      { name: "Data Warehousing" },
      { name: "Data Modeling" },
      { name: "Stream Processing" },
      { name: "Real-time Analytics" },
      { name: "Data Quality & Testing" },
    ]
  },
  {
    title: "Technologies & Frameworks",
    skills: [
      { name: "Apache Airflow" },
      { name: "Apache Kafka" },
      { name: "Apache Spark" },
      { name: "Snowflake" },
      { name: "PostgreSQL" },
      { name: "DBT" },
      { name: "Grafana" },
    ]
  },
  {
    title: "Programming Languages & Tools",
    skills: [
      { name: "Python" },
      { name: "SQL" },
      { name: "TypeScript" },
      { name: "PySpark" },
      { name: "Docker" },
      { name: "Git" },
    ]
  },
  {
    title: "AI & Machine Learning",
    skills: [
      { name: "Scikit-learn" },
      { name: "Classification Models" },
      { name: "NLP & Text Analysis" },
      { name: "API Integration" },
      { name: "FastAPI" },
      { name: "LLM Orchestration" },
    ]
  }
]

export default function Skills() {
  return (
    <motion.section
      id="skills"
      className="py-8 sm:py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="section-heading mb-8 sm:mb-10">Skills</h2>

      {/* Glassmorphism Container wrapping the entire section */}
      <div className="glow-card p-6 sm:p-8 md:p-10 backdrop-blur-md bg-white/[0.02] border border-white/10 rounded-2xl mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {skillsData.map((category, index) => (
            <motion.div
              key={index}
              className="flex flex-col"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-green-400/90 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                {category.title}
              </h3>
              
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-full text-xs bg-white/5 border border-white/5 text-gray-300 hover:text-green-400 hover:bg-green-400/5 hover:border-green-400/30 transition-all duration-200 cursor-default"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
