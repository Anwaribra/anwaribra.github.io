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
      className="mb-8 sm:mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {skillsData.map((skill, index) => (
          <motion.div 
            key={index}
            className="bg-[#111111] rounded-lg p-4 sm:p-6 hover:bg-[#1a1a1a] transition-colors duration-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-accent-white">{skill.title}</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-gray-300" role="list">
              {skill.items.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

