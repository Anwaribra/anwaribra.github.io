export interface Project {
  title: string
  description: string
  technologies: string[]
  source: string
  demo?: string
  isGraduation?: boolean
  image?: string
}

export interface SubProject {
  title: string
  url?: string
  description: string
}

export interface Experience {
  role: string
  company: string
  period: string
  url?: string
  logo?: string
  description?: string
  achievements?: string[]
  subProjects?: SubProject[]
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
    title: "ResolveAI",
    description: "AI-powered support ticket triage and auto-resolution agent with risk-aware decision engine, RAG grounded generation via pgvector, dbt star-schema warehouse, Apache Airflow orchestration, and Ragas/DeepEval evaluation pipeline.",
    technologies: ["Python", "PostgreSQL", "pgvector", "dbt-core", "FastAPI", "Google GenAI", "Apache Airflow", "Streamlit", "Docker"],
    source: "https://github.com/Anwaribra/ResolveAI"
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
    title: "Car Price Prediction ETL Pipeline",
    description: "ETL pipeline and regression model for car price prediction built with Python, scikit-learn, and PostgreSQL, achieving a 98%+ R² score.",
    technologies: ["Python", "Scikit-learn", "Matplotlib", "PostgreSQL"],
    source: "https://github.com/Anwaribra/car-price-prediction-etl"
  }
]

export const experiences: Experience[] = [
  {
    role: "Software Engineer",
    company: "Thinker",
    period: "Aug 2025 — Present",
    url: "https://www.thinkerlab.tech/",
    logo: "/assets/logos/thinkerlab.png",
    description: "Data platforms, autonomous AI workflows, and practical software systems built with Next.js, FastAPI, and PostgreSQL.",
    subProjects: [
      {
        title: "Dots",
        url: "https://dots-execution.vercel.app/",
        description: "AI-powered personal execution planner that turns priorities into realistic weekly plans and adapts dynamically."
      }
    ],
    achievements: [
      "Built SaaS products using Next.js, FastAPI, PostgreSQL, and Python.",
      "Designed ETL pipelines, backend systems, and AI-powered workflow automation.",
      "Maintained production-ready products and technical projects from concept to deployment."
    ]
  },
  {
    role: "BI Engineer",
    company: "Link Development",
    period: "Jul 2025 — Jan 2026",
    url: "https://linkdevelopment.com/",
    logo: "/assets/logos/link-development.png",
    description: "Interactive Power BI dashboards, star-schema data models, and automated SQL reporting pipelines for operational teams.",
    achievements: [
      "Built and maintained interactive dashboards and reports using Power BI",
      "Designed star-schema data models and automated ETL pipelines for reporting",
      "Translated business requirements from operational teams into SQL and BI reporting datasets"
    ]
  },
  {
    role: "Data Engineer",
    company: "DEPI",
    period: "Oct 2024 — May 2025",
    url: "https://depi.gov.eg/",
    logo: "/assets/logos/depi.svg",
    description: "End-to-end ETL and streaming data pipelines using Apache Airflow, Kafka, Spark, and Snowflake warehouse optimization.",
    achievements: [
      "Designed and implemented ETL pipelines using Apache Airflow, reducing data processing time by 40%",
      "Built streaming data pipelines using Apache Kafka and Apache Spark",
      "Optimized analytical queries in Snowflake, improving query performance by 35%"
    ]
  },
  {
    role: "Business Intelligence Intern",
    company: "PwC",
    period: "Jun 2024 — Aug 2024",
    url: "https://www.pwc.com/",
    logo: "/assets/logos/pwc.png",
    description: "Client reporting dashboards in Power BI, data quality validation pipelines, and dimensional warehouse modeling.",
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
