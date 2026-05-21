import React, { useState } from 'react'
import { Thermometer, Shield, } from 'lucide-react'

const FEATURES = [
  { icon: <Thermometer size={22} />, label: 'Presisi Suhu' },
  { icon: <Shield size={22} />, label: 'Kualitas Terjaga' }
]

function CTAButton({
  children,
  primary,
}: {
  children: React.ReactNode
  primary?: boolean
}) {
  const [hovered, setHovered] = useState(false)

  const baseStyle: React.CSSProperties = {
    padding: '14px 28px',
    borderRadius: '10px',
    fontSize: '0.95rem',
    fontWeight: 700,
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s',
  }

  const primaryStyle: React.CSSProperties = {
    ...baseStyle,
    background: 'linear-gradient(135deg,#d48c2a,#f0b855)',
    color: 'white',
    boxShadow: hovered
      ? '0 8px 28px rgba(212,140,42,0.55)'
      : '0 4px 18px rgba(212,140,42,0.38)',
    transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
  }

  const secondaryStyle: React.CSSProperties = {
    ...baseStyle,
    background: hovered ? 'rgba(255,255,255,0.1)' : 'transparent',
    color: 'white',
    border: `2px solid ${hovered ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)'}`,
  }

  return (
    <button
      style={primary ? primaryStyle : secondaryStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  )
}

export default function Hero() {
  // Cek apakah user sudah login
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  
  return (
    <section
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg,#1a2e0f 0%,#2d4a1e 45%,#4a7c2f 100%)',
        display: 'flex',
        alignItems: 'center',
        padding: '80px 1rem 4rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background blobs */}
      <div
        style={{
          position: 'absolute', top: '-120px', right: '-120px',
          width: '520px', height: '520px', borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(122,182,72,0.14) 0%,transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute', bottom: '-60px', left: '35%',
          width: '320px', height: '320px', borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(212,140,42,0.1) 0%,transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1200px', margin: '0 auto', width: '100%',
          display: 'grid', 
          gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
          gap: '4rem', alignItems: 'center',
        }}
      >
        {/* LEFT */}
        <div style={{ animation: 'fadeUp 0.7s ease both' }}>
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(122,182,72,0.18)',
              border: '1px solid rgba(122,182,72,0.38)',
              borderRadius: '20px', padding: '6px 16px', marginBottom: '1.5rem',
            }}
          >
            <div
              style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: '#7ab648', animation: 'pulseGlow 2s infinite',
              }}
            />
            <span style={{ color: '#a8d878', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.06em' }}>
              TEKNOLOGI PENGERINGAN 
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem,4vw,3.2rem)',
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.2,
              marginBottom: '1.2rem',
            }}
          >
            Kualitas Herbal Terbaik,
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg,#7ab648,#d48c2a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Kering Sempurna.
            </span>
          </h1>

          <p
            style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '1rem', lineHeight: 1.75,
              marginBottom: '2.5rem', maxWidth: '420px',
            }}
          >
            Teknologi pengeringan untuk menjaga khasiat alami rempah Nusantara.
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            
          </div>

          {/* Feature icons */}
          <div style={{ display: 'flex', gap: '2.5rem' }}>
            {FEATURES.map((f) => (
              <div key={f.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '48px', height: '48px',
                    background: 'rgba(122,182,72,0.15)',
                    border: '1px solid rgba(122,182,72,0.3)',
                    borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#7ab648',
                  }}
                >
                  {f.icon}
                </div>
                <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.78rem', fontWeight: 500, textAlign: 'center' }}>
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT – decorative card */}
        <div style={{ animation: 'fadeUp 0.9s ease both', position: 'relative' }}>
          <div
            style={{
              borderRadius: '24px',
              aspectRatio: '4/3',
              background: 'linear-gradient(135deg,#3d5c25,#2d4a1e)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.08)',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute', inset: 0,
                background: `
                  radial-gradient(ellipse at 30% 50%,rgba(180,120,40,0.55) 0%,transparent 55%),
                  radial-gradient(ellipse at 70% 25%,rgba(80,140,40,0.45) 0%,transparent 55%),
                  radial-gradient(ellipse at 55% 80%,rgba(140,80,30,0.35) 0%,transparent 55%)
                `,
              }}
            />
            <span style={{ fontSize: '6.5rem', filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.45))', zIndex: 1 }}>
              🌿
            </span>
          </div>

          {/* Floating stat - Hanya tampil jika sudah login */}
          {isAuthenticated && (
            <div
              style={{
                position: 'absolute', bottom: '-18px', left: '-18px',
                background: 'white',
                borderRadius: '14px',
                padding: '12px 18px',
                boxShadow: '0 10px 36px rgba(0,0,0,0.18)',
                display: 'flex', alignItems: 'center', gap: '12px',
              }}
            >
              <div
                style={{
                  width: '40px', height: '40px',
                  background: 'linear-gradient(135deg,#4a7c2f,#7ab648)',
                  borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem',
                }}
              >
                🌡️
              </div>
              <div>
                <div style={{ fontSize: '0.68rem', color: '#8a9a7a', fontWeight: 600 }}>SUHU OPTIMAL</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1a2810' }}>50°C – 70°C</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
