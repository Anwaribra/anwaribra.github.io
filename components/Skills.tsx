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
      { name: "ETL Pipeline Development" },
      { name: "Data Warehousing" },
      { name: "Stream Processing" },
      { name: "Data Modeling" },
      { name: "Real-time Analytics" },
      { name: "Data Quality & Testing" },
    ]
  },
  {
    title: "Technologies",
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
    title: "Programming & Tools",
    skills: [
      { name: "Python" },
      { name: "SQL" },
      { name: "PySpark" },
      { name: "Docker" },
      { name: "Git" },
      { name: "Scikit-learn" },
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {skillsData.map((category, index) => (
          <motion.div
            key={index}
            className="glow-card p-5 sm:p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <h3 className="text-base sm:text-lg font-bold tracking-tight mb-5">
              {category.title}
            </h3>
            <ul className="space-y-3" role="list">
              {category.skills.map((skill, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-2.5 text-sm text-gray-300"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500/60 flex-shrink-0" />
                  {skill.name}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
