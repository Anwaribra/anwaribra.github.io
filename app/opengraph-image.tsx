import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Anwar Ibrahim - Data Engineer Portfolio'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#07080a',
          backgroundImage:
            'radial-gradient(ellipse 80% 60% at 50% 10%, rgba(239,68,68,0.12) 0%, transparent 60%), linear-gradient(180deg, #0a0c10 0%, #050608 100%)',
          padding: '60px 80px',
          fontFamily: 'sans-serif',
          color: '#ffffff',
        }}
      >
        {/* Header Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '999px',
              padding: '8px 20px',
              color: '#fca5a5',
              fontSize: '18px',
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#ef4444',
                boxShadow: '0 0 10px #ef4444',
              }}
            />
            PORTFOLIO & ENGINEERING SHOWCASE
          </div>
        </div>

        {/* Main Brand Section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '40px',
            marginTop: '20px',
          }}
        >
          {/* Avatar container */}
          <div
            style={{
              display: 'flex',
              width: '130px',
              height: '130px',
              borderRadius: '28px',
              padding: '4px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
              border: '1px solid rgba(255,255,255,0.15)',
              overflow: 'hidden',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://github.com/Anwaribra.png"
              alt="Anwar Ibrahim"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '24px',
                objectFit: 'cover',
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1
              style={{
                fontSize: '64px',
                fontWeight: 800,
                color: '#ffffff',
                margin: 0,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
              }}
            >
              Anwar Ibrahim
            </h1>
            <p
              style={{
                fontSize: '32px',
                fontWeight: 600,
                color: '#a1a1aa',
                margin: '8px 0 0 0',
                letterSpacing: '-0.01em',
              }}
            >
              Data Engineer
            </p>
          </div>
        </div>

        {/* Taglines & Key Tech Stack */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {['DataOps Agent', 'ResolveAI (RAG)', 'dbt & Airflow', 'pgvector & FastMCP', 'PostgreSQL'].map(
              (tech) => (
                <div
                  key={tech}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    padding: '8px 18px',
                    color: '#e4e4e7',
                    fontSize: '18px',
                    fontWeight: 500,
                  }}
                >
                  {tech}
                </div>
              )
            )}
          </div>
        </div>

        {/* Footer info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '20px',
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: '#71717a',
              fontWeight: 500,
            }}
          >
            Building software powered by data.
          </div>

          <div
            style={{
              fontSize: '20px',
              color: '#fca5a5',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            github.com/Anwaribra
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
