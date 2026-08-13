export interface Project {
  title: string
  description: string
  technologies: string[]
  source: string
  demo?: string
  isGraduation?: boolean
  image?: string
}

export interface Experience {
  role: string
  company: string
  period: string
  description?: string
  achievements?: string[]
}

export const projects: Project[] = [
  {
    title: "DataOps Agent",
    description: "Agentic data observability, automated diagnosis, and closed-loop remediation platform. Integrates dlt ingestion, dbt (27 test assertions), Dagster asset orchestration, 22 FastMCP stdio tools, and a 30-min TTL human-in-the-loop governance gate.",
    technologies: ["Python", "dlt", "PostgreSQL", "dbt-core", "Dagster", "FastMCP", "OpenRouter", "FastAPI", "Docker"],
    source: "https://github.com/Anwaribra/DataOps-Agent",
    demo: "/demo/dataops"
  },
  {
    title: "Ayn",
    description: "Quality assurance and accreditation platform built with Next.js, FastAPI, Python, and PostgreSQL. Features Horus AI assistant for document classification, gap analysis, and evidence management.",
    technologies: ["TypeScript", "Next.js", "React", "FastAPI", "Python", "AI/ML", "PostgreSQL"],
    source: "https://github.com/Anwaribra/Ayn",
    demo: "https://aynplatform.app",
    isGraduation: true,
    image: "/assets/projects/ayn.png"
  },
  {
    title: "Real-time Forex Data Pipeline & Analytics Dashboard",
    description: "ETL pipeline built with Apache Airflow for processing currency rates from Alpha Vantage API into Snowflake using Medallion architecture.",
    technologies: ["Apache Airflow", "Python", "Snowflake Cloud", "Docker", "Apache Kafka", "Apache Spark", "Streamlit"],
    source: "https://github.com/Anwaribra/Real-time-Forex-Data-Pipeline",
    image: "/assets/projects/forex-pipeline.png"
  },
  {
    title: "Lakehouse Analytics Platform",
    description: "Lakehouse platform using Apache Spark and Delta Lake implementing Medallion architecture (Bronze, Silver, Gold) for schema enforcement.",
    technologies: ["Python", "Apache Spark", "Delta Lake", "Docker"],
    source: "https://github.com/Anwaribra/Lakehouse-Analytics-Platform"
  },
  {
    title: "RideTrack - Real-time Ride-Sharing Analytics",
    description: "Real-time ride-sharing analytics system ingesting trip data via Apache Kafka, processing with Apache Spark, and storing in PostgreSQL for Streamlit dashboards.",
    technologies: ["Python", "Apache Kafka", "Apache Spark", "PostgreSQL", "Streamlit", "Docker"],
    source: "https://github.com/Anwaribra/RideTrack"
  },
  {
    title: "Real-Time EIS Pipeline",
    description: "Data pipeline collecting, transforming, and validating Egypt's economic indicators using Apache Airflow, Kafka, and PostgreSQL.",
    technologies: ["Apache Airflow", "Python", "PostgreSQL", "Docker", "Apache Kafka"],
    source: "https://github.com/Anwaribra/Real-Time-EIS-Pipeline"
  },
  {
    title: "NASA Log Analytics",
    description: "Log analytics pipeline processing streaming server logs with Apache Kafka and Spark, storing analytics in Snowflake, and displaying metrics on Grafana.",
    technologies: ["Apache Kafka", "Apache Spark", "Apache Airflow", "PostgreSQL", "Grafana"],
    source: "https://github.com/Anwaribra/Log-Analytics-Pipeline"
  },
  {
    title: "IoT Fleet Monitoring System",
    description: "Fleet monitoring system tracking vehicle performance and sensor telemetry using Apache Kafka, Spark, InfluxDB, and Grafana.",
    technologies: ["Python", "Apache Kafka", "Apache Spark", "InfluxDB", "Grafana", "Docker"],
    source: "https://github.com/Anwaribra/IoT-Fleet-Monitoring-System"
  },
  {
    title: "AdInsight360",
    description: "Reddit marketing analytics platform using Apache Airflow, dbt, and scikit-learn to ingest posts and generate campaign insights.",
    technologies: ["Apache Airflow", "Python", "scikit-learn", "DBT", "Docker", "Streamlit"],
    source: "https://github.com/Anwaribra/AdInsight360"
  },
  {
    title: "Sales ETL Pipeline (Informatica)",
    description: "ETL pipeline built with Informatica for sales transaction data processing, transformation, and loading into a SQL data warehouse.",
    technologies: ["Python", "Informatica", "SQL", "ETL"],
    source: "https://github.com/Anwaribra/Sales-ETL-Informatica"
  },
  {
    title: "ShopStream Data Warehouse",
    description: "E-commerce data warehouse solution using Python, SQL, and Docker to process shopping data for analytical querying.",
    technologies: ["Python", "SQL", "Data Warehouse", "Docker"],
    source: "https://github.com/Anwaribra/ShopStream-Data-Warehouse"
  },
  {
    title: "Financial Fraud Detection System",
    description: "Fraud detection system using scikit-learn, Pandas, and Python to train classification models on financial transaction datasets.",
    technologies: ["Python", "Jupyter", "scikit-learn", "Pandas", "Machine Learning"],
    source: "https://github.com/Anwaribra/Financial-Fraud-Detection-System"
  },
  {
    title: "Car Price Prediction ETL Pipeline",
    description: "ETL pipeline and regression model for car price prediction built with Python, scikit-learn, and PostgreSQL, achieving a 98%+ R² score.",
    technologies: ["Python", "Scikit-learn", "Matplotlib", "PostgreSQL"],
    source: "https://github.com/Anwaribra/car-price-prediction-etl"
  }
]

export const experiences: Experience[] = [
  {
    role: "Founder & Freelance Software Engineer",
    company: "Personal Projects",
    period: "Present",
    description: "Building SaaS products, data platforms, AI-powered applications, and full-stack software from idea to deployment.",
    achievements: [
      "Building SaaS products using Next.js, FastAPI, PostgreSQL, and Python.",
      "Designing ETL pipelines and backend systems.",
      "Developing AI-powered features and workflow automation.",
      "Maintaining production-ready personal products and technical projects."
    ]
  },
  {
    role: "BI Engineer",
    company: "Link Development",
    period: "Jul 2025 – Jan 2026 · Hybrid",
    description: "Built BI dashboards and data models at Link Development to support internal decision-making.",
    achievements: [
      "Built and maintained interactive dashboards and reports using Power BI",
      "Designed star-schema data models and automated ETL pipelines for reporting",
      "Translated business requirements from operational teams into SQL and BI reporting datasets",
      "Validated data quality and schema consistency across reporting platforms"
    ]
  },
  {
    role: "Data Engineer",
    company: "DPEI",
    period: "Oct 2024 - May 2025",
    description: "Built ETL and streaming data pipelines using Apache Airflow, Kafka, Spark, and Snowflake.",
    achievements: [
      "Designed and implemented ETL pipelines using Apache Airflow, reducing data processing time by 40%",
      "Built streaming data pipelines using Apache Kafka and Apache Spark",
      "Optimized analytical queries in Snowflake, improving query performance by 35%",
      "Delivered data models and ETL workflows alongside engineering teams"
    ]
  },
  {
    role: "Data Analyst Intern",
    company: "NeuronetiX",
    period: "Sep 2024 – Oct 2024",
    description: "Analyzed operational datasets at NeuronetiX to extract business trends using Python and SQL.",
    achievements: [
      "Created automated reporting dashboards using Python and SQL",
      "Performed statistical analysis on datasets to identify operational trends",
      "Presented data findings to stakeholders using visualizations and dashboards"
    ]
  },
  {
    role: "Business Intelligence Intern",
    company: "PwC",
    period: "Jun 2024 – Aug 2024",
    description: "Built client reporting dashboards and performed data quality checks at PwC.",
    achievements: [
      "Built interactive Power BI dashboards for client reporting engagements",
      "Ran data quality validation checks across client datasets",
      "Developed dimensional data models and ETL pipelines for reporting workflows"
    ]
  }
]

export interface Certification {
  name: string
  issuer: string
  image: string
  url?: string
}

export const certifications: Certification[] = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    image: "/assets/icons/AWS-Certified-Cloud.png",
    url: "https://cp.certmetrics.com/amazon/en/public/verify/credential/24b89d107d764cee870cbaff5dc1144f"
  },
  {
    name: "Google Data Analytics Professional Certificate",
    issuer: "Google",
    image: "/assets/icons/Professional_Certificate_-_Data_Analyst.png",
    url: "https://www.coursera.org/professional-certificates/google-data-analytics"
  },
  {
    name: "Data Analytics - Google Data Analyst Specialist",
    issuer: "Digital Egypt Pioneers Initiative (DEPI)",
    image: "/assets/icons/GCC.png",
    url: "https://www.linkedin.com/in/anwar-mousa/overlay/Certifications/1886682763/treasury/?profileId=ACoAAD4quLMB2qUytspA-11zDBxaK7gJG-4HLB8"
  }
]
