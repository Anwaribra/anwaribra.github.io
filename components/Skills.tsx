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

      <div className="skills-list mt-4">
        {skillsData.map((category, index) => (
          <motion.div
            key={category.title}
            className="skills-row"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <h3 className="skills-category">
              {category.title}
            </h3>

            <div className="skills-cloud">
              {category.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skill.name}
                  className="skills-token"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: index * 0.05 + skillIndex * 0.025 }}
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
