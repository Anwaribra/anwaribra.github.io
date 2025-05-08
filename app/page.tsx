import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaGithub, FaTwitter, FaLinkedin, FaFileAlt } from 'react-icons/fa'

export default function Home() {
  return (
    <main className="min-h-screen p-3 md:p-6 max-w-3xl mx-auto">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-start gap-3 mb-6">
        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-dark-secondary">
          <Image
            src="/assets/icons/profile/avatar.jpg"
            alt="Anwar Mousa"
            fill
            className="object-cover profile-image"
            priority
          />
        </div>
        <div className="flex-1 w-full">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-bold mb-0.5">Anwar Mousa</h1>
              <p className="text-xs md:text-sm text-gray-400">Data Enthusiast</p>
            </div>
            <Link 
              href="https://github.com/Anwaribra" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg md:text-xl text-white hover:text-accent-green transition-colors duration-200"
            >
              <FaGithub />
            </Link>
          </div>
          <p className="mt-2 text-xs md:text-sm text-gray-300 leading-relaxed">
            I am a Data Engineer passionate about building scalable data pipelines and delivering actionable insights. 
            I focus on data modeling, ETL processes, and cloud technologies to create efficient systems that support data-driven decision-making.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-6">
        <h2 className="text-lg md:text-xl font-bold mb-3">Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div className="bg-[#111111] rounded-lg p-3">
            <h3 className="text-sm md:text-base font-bold mb-2 text-accent-white">Data Engineering</h3>
            <ul className="space-y-1 text-[10px] md:text-xs text-gray-300">
              <li>• ETL Pipeline Development</li>
              <li>• Data Warehousing</li>
              <li>• Stream Processing</li>
              <li>• Data Modeling</li>
              <li>• Data Quality & Testing</li>
            </ul>
          </div>
          <div className="bg-[#111111] rounded-lg p-3">
            <h3 className="text-sm md:text-base font-bold mb-2 text-accent-white">Technologies</h3>
            <ul className="space-y-1 text-[10px] md:text-xs text-white-300">
              <li>• Apache Airflow</li>
              <li>• Apache Kafka</li>
              <li>• Apache Spark</li>
              <li>• Snowflake</li>
              <li>• PostgreSQL</li>
            </ul>
          </div>
          <div className="bg-[#111111] rounded-lg p-3">
            <h3 className="text-sm md:text-base font-bold mb-2 text-accent-white">Programming</h3>
            <ul className="space-y-1 text-[10px] md:text-xs text-gray-300">
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
      <section className="mb-6">
        <h2 className="text-lg md:text-xl font-bold mb-3">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {projects.map((project, index) => (
            <div key={index} className="bg-[#111111] rounded-lg p-3 hover:bg-[#1a1a1a] transition-colors duration-200">
              <h3 className="text-sm md:text-base font-bold mb-1.5">{project.title}</h3>
              <p className="text-[10px] md:text-xs text-gray-400 mb-3 leading-relaxed min-h-[40px] md:min-h-[50px]">
                {project.description}
              </p>
              <div className="mt-auto">
                <div className="flex flex-wrap items-center gap-x-1.5 mb-2">
                  {project.technologies.map((tech, i) => (
                    <React.Fragment key={i}>
                      <span className="text-[8px] md:text-[10px] text-gray-300">{tech}</span>
                      {i < project.technologies.length - 1 && (
                        <span className="text-gray-600 text-[8px] md:text-[10px]">•</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <Link 
                  href={project.source} 
                  className="inline-flex items-center px-2 py-0.5 rounded bg-white text-black text-[10px] hover:bg-gray-100 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="mr-1" />
                  Source
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Work Experience */}
      <section className="mb-6">
        <h2 className="text-lg md:text-xl font-bold mb-3">Work Experience</h2>
        <div className="space-y-3">
          {experiences.map((exp, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0">
              <div>
                <h3 className="text-sm md:text-base font-bold">{exp.role}</h3>
                <p className="text-[10px] md:text-xs text-gray-400">{exp.company}</p>
              </div>
              <p className="text-[10px] md:text-xs text-gray-400">{exp.period}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Connect Section */}
      <section className="mb-10 pb-10">
        <h2 className="text-lg md:text-xl font-bold mb-3">Connect</h2>
        <p className="mb-3 text-[10px] md:text-xs">
          Feel free to contact me at{' '}
          <a href="mailto:anwarmousa100@gmail.com" className="text-accent-green">
            anwarmousa100@gmail.com
          </a>
        </p>
        <div className="flex flex-wrap gap-2">
          <Link 
            href="https://github.com/Anwaribra" 
            className="inline-flex items-center px-2 py-1 rounded-full bg-[#1a1a1a] text-white text-[10px] hover:bg-[#252525] transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="mr-1.5 text-xs md:text-sm" />
            Github
          </Link>
          <Link 
            href="https://x.com/_anwarrrrr" 
            className="inline-flex items-center px-2 py-1 rounded-full bg-[#1a1a1a] text-white text-[10px] hover:bg-[#252525] transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="mr-1.5 text-xs md:text-sm" />
            Twitter
          </Link>
          <Link 
            href="https://www.linkedin.com/in/anwar-mousa/" 
            className="inline-flex items-center px-2 py-1 rounded-full bg-[#1a1a1a] text-white text-[10px] hover:bg-[#252525] transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="mr-1.5 text-xs md:text-sm" />
            LinkedIn
          </Link>
          <Link 
            href="/assets/docs/CV.pdf" 
            className="inline-flex items-center px-2 py-1 rounded-full bg-[#1a1a1a] text-white text-[10px] hover:bg-[#252525] transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFileAlt className="mr-1.5 text-xs md:text-sm" />
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
    title: "DataPulse API Pipeline",
    description: "DataPulse is a real-time data pipeline system designed to collect, process, store, and serve cryptocurrency price data. The system fetches price information from the CoinGecko API at regular intervals, transforms raw data into meaningful aggregates, and makes both raw and processed data available through a RESTful API.",
    technologies: ["Apache Airflow", "Python,", "Pandas", "Docker"],
    source: "https://github.com/Anwaribra/DataPulse-Real-Time-API-Data-Pipeline"
  }
]

const experiences = [
  {
    role: "Data Engineer",
    company: "DPEI",
    period: "Oct 2024 - Present"
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