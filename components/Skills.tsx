'use client'

import React from 'react'
import { motion } from 'framer-motion'

const skillsData = [
  {
    title: "Data Engineering",
    items: ["ETL Pipeline Development", "Data Warehousing", "Stream Processing", "Data Modeling", "Data Quality & Testing", "Real-time Analytics"]
  },
  {
    title: "Technologies",
    items: ["Apache Airflow", "Apache Kafka", "Apache Spark", "Snowflake", "PostgreSQL", "Grafana", "DBT"]
  },
  {
    title: "Programming & Tools",
    items: ["Python", "SQL", "PySpark", "Docker", "Git", "Scikit-learn"]
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mt-4">
        {skillsData.map((skill, index) => (
          <motion.div
            key={index}
            className="glow-card p-5 sm:p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <h3 className="text-base sm:text-lg font-bold tracking-tight">{skill.title}</h3>
            </div>
            <ul className="space-y-2.5" role="list">
              {skill.items.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-2.5 text-sm text-gray-400"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500/60 flex-shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
