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
    title: "Ayn",
    description: "An AI-native quality assurance and accreditation platform for educational institutions. Brings standards, evidence, gap analysis, analytics, workflows, and institutional AI assistance into one product, with Horus as the platform intelligence layer.",
    technologies: ["TypeScript", "Next.js", "React", "FastAPI", "Python"],
    source: "https://github.com/Anwaribra/Ayn",
    isGraduation: true,
    image: "/assets/projects/ayn.png"
  },
  {
    title: "Real-time Forex Data Pipeline & Analytics Dashboard",
    description: "Built an automated ETL pipeline using Apache Airflow for processing and analyzing large-scale data from Alpha Vantage API. Implemented data quality using medallion checks and monitoring.",
    technologies: ["Apache Airflow", "Python", "Snowflake Cloud", "Docker", "Apache Kafka", "Apache Spark", "Streamlit"],
    source: "https://github.com/Anwaribra/Real-time-Forex-Data-Pipeline",
    image: "/assets/projects/forex-pipeline.png"
  },
  {
    title: "Lakehouse Analytics Platform",
    description: "A modern lakehouse analytics platform implementing the medallion architecture (Bronze/Silver/Gold) for scalable data processing and analytics workloads.",
    technologies: ["Python", "Apache Spark", "Delta Lake", "Docker"],
    source: "https://github.com/Anwaribra/Lakehouse-Analytics-Platform"
  },
  {
    title: "RideTrack - Real-time Ride-Sharing Analytics",
    description: "A real-time ride-sharing analytics platform that processes, stores, and visualizes large-scale trip data. Built with modern data engineering practices for high-throughput streaming analytics.",
    technologies: ["Python", "Apache Kafka", "Apache Spark", "PostgreSQL", "Streamlit", "Docker"],
    source: "https://github.com/Anwaribra/RideTrack"
  },
  {
    title: "Real-Time EIS Pipeline",
    description: "A comprehensive data pipeline that collects, transforms, validates, and analyzes Egypt's economic indicators in real-time using modern ETL architecture. Enables data-driven economic insights.",
    technologies: ["Apache Airflow", "Python", "PostgreSQL", "Docker", "Apache Kafka"],
    source: "https://github.com/Anwaribra/Real-Time-EIS-Pipeline"
  },
  {
    title: "NASA Log Analytics",
    description: "Developed a real-time analytics platform using Apache Kafka and Apache Spark for processing streaming data. Implemented data warehousing solutions using Snowflake.",
    technologies: ["Apache Kafka", "Apache Spark", "Apache Airflow", "PostgreSQL", "Grafana"],
    source: "https://github.com/Anwaribra/Log-Analytics-Pipeline"
  },
  {
    title: "IoT Fleet Monitoring System",
    description: "An IoT-based fleet monitoring system that tracks vehicle performance, location, and analytics in real-time. Processes sensor data streams for fleet optimization and predictive maintenance.",
    technologies: ["Python", "Apache Kafka", "Apache Spark", "InfluxDB", "Grafana", "Docker"],
    source: "https://github.com/Anwaribra/IoT-Fleet-Monitoring-System"
  },
  {
    title: "AdInsight360",
    description: "Reddit Marketing Analytics Platform & Real-time Insights & AI-Powered Recommendations. Analyzes Reddit data to provide actionable marketing insights and AI-driven recommendations.",
    technologies: ["Apache Airflow", "Python", "scikit-learn", "DBT", "Docker", "Streamlit"],
    source: "https://github.com/Anwaribra/AdInsight360"
  },
  {
    title: "Sales ETL Pipeline (Informatica)",
    description: "An enterprise-grade ETL pipeline built with Informatica for sales data processing, transformation, and loading into a data warehouse for business analytics.",
    technologies: ["Python", "Informatica", "SQL", "ETL"],
    source: "https://github.com/Anwaribra/Sales-ETL-Informatica"
  },
  {
    title: "ShopStream Data Warehouse",
    description: "A modern data warehouse solution for e-commerce analytics. Processes and organizes shopping data for efficient querying and business intelligence reporting.",
    technologies: ["Python", "SQL", "Data Warehouse", "Docker"],
    source: "https://github.com/Anwaribra/ShopStream-Data-Warehouse"
  },
  {
    title: "Financial Fraud Detection System",
    description: "Machine learning-based financial fraud detection system. Uses advanced algorithms to identify suspicious transactions and predict fraudulent activity in real-time.",
    technologies: ["Python", "Jupyter", "scikit-learn", "Pandas", "Machine Learning"],
    source: "https://github.com/Anwaribra/Financial-Fraud-Detection-System"
  },
  {
    title: "Car Price Prediction ETL Pipeline",
    description: "A robust ETL pipeline for car price prediction with machine learning integration. This project processes car sales data, trains a high-accuracy prediction model (98%+ R² score), and provides detailed performance tracking",
    technologies: ["Python", "Scikit-learn", "Matplotlib", "PostgreSQL"],
    source: "https://github.com/Anwaribra/car-price-prediction-etl"
  }
]

export const experiences: Experience[] = [
  {
    role: "BI Engineer",
    company: "Link Development",
    period: "Jul 2025 – Jan 2026 · Hybrid",
    description: "Designed and delivered business intelligence solutions to support data-driven decision-making across the organization.",
    achievements: [
      "Built and maintained interactive dashboards and reports for stakeholders using BI tools",
      "Developed and optimized data models and ETL pipelines for reporting workflows",
      "Collaborated with cross-functional teams to translate business requirements into analytical solutions",
      "Ensured data quality and consistency across reporting platforms"
    ]
  },
  {
    role: "Data Engineer",
    company: "DPEI",
    period: "Oct 2024 - May 2025",
    description: "Developed and maintained scalable data pipelines for processing large-scale datasets.",
    achievements: [
      "Designed and implemented ETL pipelines using Apache Airflow, reducing data processing time by 40%",
      "Built real-time streaming data solutions using Apache Kafka and Apache Spark",
      "Optimized data warehouse queries in Snowflake, improving query performance by 35%",
      "Collaborated with cross-functional teams to deliver data-driven insights"
    ]
  },
  {
    role: "Data Analyst Intern",
    company: "NeuronetiX",
    period: "Sep 2024 – Oct 2024",
    description: "Analyzed complex datasets to extract actionable business insights.",
    achievements: [
      "Created automated reporting dashboards using Python and SQL",
      "Performed statistical analysis on large datasets to identify trends and patterns",
      "Presented findings to stakeholders with clear visualizations and recommendations"
    ]
  },
  {
    role: "Business Intelligence Intern",
    company: "PwC",
    period: "Jun 2024 – Aug 2024",
    description: "Supported business intelligence initiatives and data visualization projects.",
    achievements: [
      "Developed interactive dashboards for client reporting using BI tools",
      "Assisted in data quality assessments and validation processes",
      "Contributed to data modeling and ETL pipeline development"
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
    image: "/assets/icons/AWS-Certified-Cloud.png"
  },
  {
    name: "Google Data Analytics Professional Certificate",
    issuer: "Google",
    image: "/assets/icons/Professional_Certificate_-_Data_Analyst.png"
  },
  {
    name: "Google Cloud Computing",
    issuer: "Google",
    image: "/assets/icons/GCC.png"
  }
]
