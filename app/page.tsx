import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaGithub, FaTwitter, FaLinkedin, FaFileAlt } from 'react-icons/fa'

export default function Home() {
  return (
    <main className="min-h-screen p-2 md:p-15 max-w-3xl mx-auto pt-20">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-start gap-3 mb-10">
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-dark-secondary">
          <Image
            src="/assets/icons/profile/avatar.jpg"
            alt="Anwar Mousa"
            fill
            className="object-cover profile-image"
            priority
          />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-1xl font-bold mb-0.2">Anwar Mousa</h1>
              <p className="text-sm text-gray-400">Data Enthusiast</p>
            </div>
            <Link 
              href="https://github.com/Anwaribra" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xl text-white hover:text-accent-green transition-colors duration-200"
            >
              <FaGithub />
            </Link>
          </div>
          <p className="mt-2 text-gray-300 text-xs leading-relaxed">
            I am a Data Engineer passionate about building scalable data pipelines and delivering actionable insights. 
            I focus on data modeling, ETL processes, and cloud technologies to create efficient systems that support data-driven decision-making.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-[#111111] rounded-lg p-3">
            <h3 className="text-base font-bold mb-2 text-accent-white">Data Engineering</h3>
            <ul className="space-y-1 text-gray-300 text-xs">
              <li>• ETL Pipeline Development</li>
              <li>• Data Warehousing</li>
              <li>• Stream Processing</li>
              <li>• Data Modeling</li>
              <li>• Data Quality & Testing</li>
            </ul>
          </div>
          <div className="bg-[#111111] rounded-lg p-3">
            <h3 className="text-base font-bold mb-2 text-accent-white">Technologies</h3>
            <ul className="space-y-1 text-white-300 text-xs">
              <li>• Apache Airflow</li>
              <li>• Apache Kafka</li>
              <li>• Apache Spark</li>
              <li>• Snowflake</li>
              <li>• PostgreSQL</li>
            </ul>
          </div>
          <div className="bg-[#111111] rounded-lg p-3">
            <h3 className="text-base font-bold mb-2 text-accent-white">Programming</h3>
            <ul className="space-y-1 text-gray-300 text-xs">
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
        <h2 className="text-xl font-bold mb-3">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {projects.map((project, index) => (
            <div key={index} className="bg-[#111111] rounded-lg p-3 hover:bg-[#1a1a1a] transition-colors duration-200">
              <h3 className="text-base font-bold mb-1.5">{project.title}</h3>
              <p className="text-gray-400 mb-3 text-xs leading-relaxed min-h-[50px]">
                {project.description}
              </p>
              <div className="mt-auto">
                <div className="flex flex-wrap items-center gap-x-1.5 mb-2">
                  {project.technologies.map((tech, i) => (
                    <React.Fragment key={i}>
                      <span className="text-[10px] text-gray-300">{tech}</span>
                      {i < project.technologies.length - 1 && (
                        <span className="text-gray-600 text-[10px]">•</span>
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
        <h2 className="text-xl font-bold mb-3">Work Experience</h2>
        <div className="space-y-3">
          {experiences.map((exp, index) => (
            <div key={index} className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-bold">{exp.role}</h3>
                <p className="text-gray-400 text-xs">{exp.company}</p>
              </div>
              <p className="text-gray-400 text-xs">{exp.period}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Connect Section */}
      <section className="mb-10 pb-10">
        <h2 className="text-xl font-bold mb-3">Connect</h2>
        <p className="mb-3 text-xs">
          Feel free to contact me at{' '}
          <a href="mailto:anwarmousa100@gmail.com" className="text-accent-green">
            anwarmousa100@gmail.com
          </a>
        </p>
        <div className="flex flex-wrap gap-2">
          <Link 
            href="https://github.com/Anwaribra" 
            className="inline-flex items-center px-3 py-1 rounded-full bg-[#1a1a1a] text-white text-[10px] hover:bg-[#252525] transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="mr-1.5" />
            Github
          </Link>
          <Link 
            href="https://x.com/_anwarrrrr" 
            className="inline-flex items-center px-3 py-1 rounded-full bg-[#1a1a1a] text-white text-[10px] hover:bg-[#252525] transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="mr-1.5" />
            Twitter
          </Link>
          <Link 
            href="https://www.linkedin.com/in/anwar-mousa/" 
            className="inline-flex items-center px-3 py-1 rounded-full bg-[#1a1a1a] text-white text-[10px] hover:bg-[#252525] transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="mr-1.5" />
            LinkedIn
          </Link>
          <Link 
            href="/assets/docs/CV.pdf" 
            className="inline-flex items-center px-3 py-1 rounded-full bg-[#1a1a1a] text-white text-[10px] hover:bg-[#252525] transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFileAlt className="mr-1.5" />
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