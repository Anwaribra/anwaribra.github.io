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
    title: "Data Engineering",
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
    title: "Infrastructure",
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
    title: "Backend & Languages",
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mt-4">
        {skillsData.map((category, index) => (
          <motion.div
            key={category.title}
            className="glow-card group p-6 sm:p-8 bg-[#111111]/90 backdrop-blur-xl border border-white/[0.08] rounded-3xl transition-all duration-200 ease-out hover:-translate-y-1 hover:bg-[#161616] hover:border-white/20"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-5">
              {category.title}
            </h3>

            <div className="flex flex-wrap gap-2.5">
              {category.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-[#D4D4D4] bg-[#161616]/80 border border-white/[0.08] hover:border-white/20 hover:text-white transition-all duration-200"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
