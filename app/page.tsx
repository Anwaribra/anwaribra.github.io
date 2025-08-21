import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaGithub, FaTwitter, FaLinkedin, FaFileAlt } from 'react-icons/fa'

export default function Home() {
  return (
    <main className="min-h-screen px-4 sm:px-6 py-8 sm:py-12 max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-start gap-4 sm:gap-6 mb-8 sm:mb-12">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-dark-secondary">
          <Image
            src="../assets/icons/profile/avatar.jpg"
            alt="Anwar Mousa"
            fill
            className="object-cover profile-image"
            priority
          />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Anwar Mousa</h1>
              <p className="text-sm sm:text-base text-gray-400">Data Engineer</p>
            </div>
            <Link 
              href="https://github.com/Anwaribra" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xl sm:text-2xl text-white hover:text-accent-green transition-colors duration-200"
            >
              <FaGithub />
            </Link>
          </div>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-300 leading-relaxed">
            I am a Data Engineer passionate about building scalable data pipelines and delivering actionable insights. 
            I focus on data modeling, ETL processes, and cloud technologies to create efficient systems that support data-driven decision-making.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-[#111111] rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-accent-white">Data Engineering</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-gray-300">
              <li>• ETL Pipeline Development</li>
              <li>• Data Warehousing</li>
              <li>• Stream Processing</li>
              <li>• Data Modeling</li>
              <li>• Data Quality & Testing</li>
            </ul>
          </div>
          <div className="bg-[#111111] rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-accent-white">Technologies</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-gray-300">
              <li>• Apache Airflow</li>
              <li>• Apache Kafka</li>
              <li>• Apache Spark</li>
              <li>• Snowflake</li>
              <li>• PostgreSQL</li>
            </ul>
          </div>
          <div className="bg-[#111111] rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-accent-white">Programming</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-gray-300">
              <li>• Python</li>
              <li>• SQL</li>
              <li>• PySpark</li>
              <li>• Docker</li>
              <li>• Git</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Selected Projects */}
      <section className="mb-8">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <div key={index} className="bg-[#111111] rounded-lg p-4 hover:bg-[#1a1a1a] transition-colors duration-200">
              <h3 className="text-base sm:text-lg font-bold mb-2">{project.title}</h3>
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="mt-auto">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {project.technologies.map((tech, i) => (
                    <React.Fragment key={i}>
                      <span className="text-[10px] sm:text-sm text-gray-300">{tech}</span>
                      {i < project.technologies.length - 1 && (
                        <span className="text-[10px] sm:text-sm text-gray-600">•</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <Link 
                  href={project.source} 
                  className="inline-flex items-center px-3 py-1 rounded bg-white text-black text-sm hover:bg-gray-100 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="mr-2" />
                  Source
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Work Experience */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Work Experience</h2>
        <div className="space-y-4 sm:space-y-6">
          {experiences.map((exp, index) => (
            <div key={index} className="flex flex-col gap-1 sm:gap-2">
              <div>
                <h3 className="text-base sm:text-lg font-bold">{exp.role}</h3>
                <p className="text-sm sm:text-base text-gray-400">{exp.company}</p>
              </div>
              <p className="text-sm sm:text-base text-gray-400">{exp.period}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Connect Section */}
      <section>
        <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Connect</h2>
        <p className="text-sm sm:text-base mb-4 sm:mb-6">
          Feel free to contact me at{' '}
          <a href="mailto:anwarmousa100@gmail.com" className="text-accent-green">
            anwarmousa100@gmail.com
          </a>
        </p>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Link 
            href="https://github.com/Anwaribra" 
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-[#1a1a1a] text-white text-sm hover:bg-[#252525] transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="mr-2" />
            Github
          </Link>
          <Link 
            href="https://x.com/_vincenzzo" 
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-[#1a1a1a] text-white text-sm hover:bg-[#252525] transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="mr-2" />
            Twitter
          </Link>
          <Link 
            href="https://www.linkedin.com/in/anwar-mousa/" 
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-[#1a1a1a] text-white text-sm hover:bg-[#252525] transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="mr-2" />
            LinkedIn
          </Link>
          <Link 
            href="/assets/docs/CV.pdf" 
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-[#1a1a1a] text-white text-sm hover:bg-[#252525] transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFileAlt className="mr-2" />
            CV
          </Link>
        </div>
      </section>
    </main>
  )
}

const projects = [
  {
    title: "Real-time Forex Data Pipeline & Analytics Dashboard",
    description: "Built an automated ETL pipeline using Apache Airflow for processing and analyzing large-scale data from Alpha Vantage API. Implemented data quality by use medallion checks and monitoring.",
    technologies: ["Apache Airflow", "Python", "Snowflake Cloud", "Docker", "Apache Kafka", "Apache Spark", "Streamlit"],
    source: "https://github.com/Anwaribra/Real-time-Forex-Data-Pipeline"
  },
  {
    title: "NASA Log Analytics",
    description: "Developed a real-time analytics platform using Apache Kafka and Apache Spark for processing streaming data. Implemented data warehousing solutions using Snowflake.",
    technologies: ["Apache Kafka", "Apache Spark", "Apache Airflow","PostgreSQL","Grafana"],
    source: "https://github.com/Anwaribra/Log-Analytics-Pipeline"
  },
  {
    title: "Car Price Prediction ETL Pipeline",
    description: "A robust ETL pipeline for car price prediction with machine learning integration. This project processes car sales data, trains a high-accuracy prediction model (98%+ R² score), and provides detailed performance tracking",
    technologies: ["Python", "Scikit-learn", "Matplotlib", "PostgreSQL"],
    source: "https://github.com/Anwaribra/car-price-prediction-etl"
  },
  {
    title: "AdInsight360",
    description: "Reddit Marketing Analytics Platform & Real-time Insights & AI-Powered Recommendations.",
    technologies: ["Apache Airflow", "Python,", "scikit-learn", "DBT", "Docker", "Streamlit"],
    source: "https://github.com/Anwaribra/AdInsight360"
  }
]

const experiences = [
  {
    role: "Data Engineer",
    company: "DPEI",
    period: "Oct 2024 - May 2025"
  },
  {
    role: "Data Analyst Intern",
    company: "NeuronetiX",
    period: "Sep 2024 – Oct 2024"
  },
  {
    role: "Business Intelligence Intern",
    company: "PwC",
    period: "Jun 2024 – Aug 2024"
  }
] 