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
      <div className="mb-6">
        <h2 className="section-heading mb-0">Skills</h2>
      </div>

      <div className="flex flex-col pt-2">
        {skillsData.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.25, delay: index * 0.05 }}
            className="py-3 sm:py-4 flex flex-col sm:flex-row gap-1 sm:gap-6 group px-4 -mx-4 transition-all"
          >
            {/* Category Title (Left Column) */}
            <div className="w-48 shrink-0 text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
              {category.title}
            </div>

            {/* Skills List (Right Column) */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors leading-relaxed">
                {category.skills.map((skill, i) => (
                  <React.Fragment key={skill.name}>
                    <span className="group-hover:text-zinc-300 transition-colors">{skill.name}</span>
                    {i < category.skills.length - 1 && <span className="mx-1.5 text-zinc-600">·</span>}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
