import React from 'react'
import { Leaf, Target, Heart, Zap, Award, Clock, Lightbulb } from 'lucide-react'
import Footer from '../components/Footer'

const VALUES = [
  { icon: Heart, title: 'Kualitas Terbaik', desc: 'Kami berkomitmen memberikan produk herbal berkualitas tinggi' },
  { icon: Leaf, title: 'Alami & Organik', desc: 'Semua produk dari bahan alami tanpa bahan kimia berbahaya' },
  { icon: Zap, title: 'Teknologi Modern', desc: 'Menggunakan teknologi pengeringan presisi untuk hasil optimal' },
  { icon: Award, title: 'Terpercaya', desc: 'Dipercaya oleh pelanggan setia kami' },
]

const TIMELINE = [
  { year: '2023', title: 'Awal Usaha', desc: 'Memulai usaha kecil pengolahan cabai jawa di rumah' },
  { year: '2024', title: 'Alat Pertama', desc: 'Membeli alat pengering sederhana untuk meningkatkan kualitas' },
  { year: '2025', title: 'Berkembang', desc: 'Menambah variasi produk dan pelanggan tetap' },
  { year: '2026', title: 'Teknologi Baru', desc: 'Upgrade ke alat pengering dengan kontrol suhu presisi' },
]

const INNOVATIONS = [
  { title: 'Alat Pengering Modern', desc: 'Menggunakan alat pengering dengan kontrol suhu untuk hasil lebih baik', icon: '🌡️' },
  { title: 'Proses Higienis', desc: 'Menjaga kebersihan dan kualitas produk di setiap tahap', icon: '✨' },
  { title: 'Harga Terjangkau', desc: 'Produk berkualitas dengan harga yang ramah di kantong', icon: '💰' },
  { title: 'Produksi Rumahan', desc: 'Diproduksi dengan penuh perhatian dan kehati-hatian', icon: '🏠' },
]

function ValueCard({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: '16px',
        padding: '2rem',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(45,74,30,0.08)',
        border: '1px solid rgba(74,124,47,0.1)',
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          background: 'linear-gradient(135deg,#7ab648,#4a7c2f)',
          borderRadius: '16px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
        }}
      >
        <Icon size={32} color="white" />
      </div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a2810', marginBottom: '0.5rem' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.88rem', color: '#6a7a5a', lineHeight: 1.6 }}>
        {desc}
      </p>
    </div>
  )
}

export default function About() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768)

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <div style={{ paddingTop: isMobile ? '56px' : '64px', minHeight: '100vh', background: '#f5f2eb' }}>
        {/* Hero Section */}
        <section
          style={{
            background: 'linear-gradient(135deg,#1a2e0f 0%,#2d4a1e 45%,#4a7c2f 100%)',
            padding: isMobile ? '3rem 1rem' : '5rem 2rem',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div
              style={{
                display: 'inline-block',
                background: 'rgba(122,182,72,0.18)',
                border: '1px solid rgba(122,182,72,0.38)',
                borderRadius: '20px',
                padding: '6px 16px',
                marginBottom: '1rem',
              }}
            >
              <span style={{ color: '#a8d878', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.06em' }}>
                TENTANG KAMI
              </span>
            </div>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2rem,4vw,3rem)',
                fontWeight: 800,
                color: 'white',
                marginBottom: '1rem',
              }}
            >
              JavaHerbal
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', lineHeight: 1.75 }}>
              Menjaga Tradisi, Menghadirkan Inovasi
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section style={{ padding: isMobile ? '3rem 1rem' : '5rem 2rem', background: 'white' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <Target size={32} color="#4a7c2f" />
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: '#1a2810',
                }}
              >
                Cerita Kami
              </h2>
            </div>
            <div style={{ fontSize: '1rem', color: '#4a5c3a', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              <p style={{ marginBottom: '1rem' }}>
                JavaHerbal adalah usaha rumahan yang dimulai pada tahun 2023 dengan fokus pada 
                pengolahan cabai jawa dan rempah-rempah tradisional. Kami percaya bahwa produk berkualitas 
                tidak harus mahal dan bisa diproduksi dengan skala kecil namun tetap higienis.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                Dengan menggunakan alat pengering modern yang dapat mengatur suhu antara 50°C - 70°C, 
                kami berusaha menghasilkan produk cabai jawa kering yang tetap mempertahankan warna, 
                aroma, dan khasiat alaminya. Semua proses dilakukan dengan penuh kehati-hatian di rumah.
              </p>
              <p>
                Meskipun masih berskala kecil, kami terus belajar dan berkembang untuk memberikan 
                produk terbaik kepada pelanggan setia kami. Setiap produk dibuat dengan penuh perhatian 
                dan dedikasi untuk menjaga kualitas.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section style={{ padding: isMobile ? '3rem 1rem' : '5rem 2rem', background: '#f5f2eb' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <Clock size={32} color="#4a7c2f" />
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: '#1a2810',
                  }}
                >
                  Sejarah Kami
                </h2>
              </div>
              <p style={{ color: '#6a7a5a', fontSize: '1rem' }}>
                Perjalanan usaha kami dari awal hingga sekarang
              </p>
            </div>

            <div style={{ position: 'relative' }}>
              {/* Timeline line */}
              {!isMobile && (
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '0',
                    bottom: '0',
                    width: '2px',
                    background: 'linear-gradient(180deg, #7ab648, #4a7c2f)',
                    transform: 'translateX(-50%)',
                  }}
                />
              )}

              {TIMELINE.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: isMobile ? 'block' : 'grid',
                    gridTemplateColumns: i % 2 === 0 ? '1fr auto 1fr' : '1fr auto 1fr',
                    gap: '2rem',
                    marginBottom: '3rem',
                    alignItems: 'center',
                  }}
                >
                  {isMobile ? (
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          background: 'linear-gradient(135deg,#7ab648,#4a7c2f)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          boxShadow: '0 4px 12px rgba(74,124,47,0.3)',
                          flexShrink: 0,
                        }}
                      >
                        {item.year}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            background: 'white',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            boxShadow: '0 4px 20px rgba(45,74,30,0.1)',
                            border: '1px solid rgba(74,124,47,0.1)',
                          }}
                        >
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a2810', marginBottom: '0.5rem' }}>
                            {item.title}
                          </h3>
                          <p style={{ fontSize: '0.88rem', color: '#6a7a5a', lineHeight: 1.6 }}>
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : i % 2 === 0 ? (
                    <>
                      <div style={{ textAlign: 'right' }}>
                        <div
                          style={{
                            background: 'white',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            boxShadow: '0 4px 20px rgba(45,74,30,0.1)',
                            border: '1px solid rgba(74,124,47,0.1)',
                          }}
                        >
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a2810', marginBottom: '0.5rem' }}>
                            {item.title}
                          </h3>
                          <p style={{ fontSize: '0.88rem', color: '#6a7a5a', lineHeight: 1.6 }}>
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          background: 'linear-gradient(135deg,#7ab648,#4a7c2f)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          boxShadow: '0 4px 12px rgba(74,124,47,0.3)',
                          zIndex: 1,
                        }}
                      >
                        {item.year}
                      </div>
                      <div />
                    </>
                  ) : (
                    <>
                      <div />
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          background: 'linear-gradient(135deg,#7ab648,#4a7c2f)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          boxShadow: '0 4px 12px rgba(74,124,47,0.3)',
                          zIndex: 1,
                        }}
                      >
                        {item.year}
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <div
                          style={{
                            background: 'white',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            boxShadow: '0 4px 20px rgba(45,74,30,0.1)',
                            border: '1px solid rgba(74,124,47,0.1)',
                          }}
                        >
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a2810', marginBottom: '0.5rem' }}>
                            {item.title}
                          </h3>
                          <p style={{ fontSize: '0.88rem', color: '#6a7a5a', lineHeight: 1.6 }}>
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Innovation Section */}
        <section style={{ padding: isMobile ? '3rem 1rem' : '5rem 2rem', background: 'white' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <Lightbulb size={32} color="#4a7c2f" />
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: '#1a2810',
                  }}
                >
                  Inovasi Kami
                </h2>
              </div>
              <p style={{ color: '#6a7a5a', fontSize: '1rem' }}>
                Upaya kami meningkatkan kualitas produk
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '2rem',
              }}
            >
              {INNOVATIONS.map((innovation, i) => (
                <div
                  key={i}
                  style={{
                    background: 'linear-gradient(135deg, #f8faf5, #ffffff)',
                    borderRadius: '16px',
                    padding: '2rem',
                    textAlign: 'center',
                    border: '1px solid rgba(74,124,47,0.1)',
                    boxShadow: '0 4px 20px rgba(45,74,30,0.08)',
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{innovation.icon}</div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1a2810', marginBottom: '0.5rem' }}>
                    {innovation.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#6a7a5a', lineHeight: 1.6 }}>
                    {innovation.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section style={{ padding: isMobile ? '3rem 1rem' : '5rem 2rem', background: '#f5f2eb' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: '#1a2810',
                  marginBottom: '0.5rem',
                }}
              >
                Nilai-Nilai Kami
              </h2>
              <p style={{ color: '#6a7a5a', fontSize: '1rem' }}>
                Prinsip yang kami pegang dalam setiap langkah
              </p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
              }}
            >
              {VALUES.map((value, i) => (
                <ValueCard key={i} icon={value.icon} title={value.title} desc={value.desc} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          style={{
            padding: isMobile ? '3rem 1rem' : '4rem 2rem',
            background: 'linear-gradient(135deg,#2d4a1e,#4a7c2f)',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2rem',
                fontWeight: 700,
                color: 'white',
                marginBottom: '1rem',
              }}
            >
              Dukung Usaha Kami
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', marginBottom: '2rem', lineHeight: 1.7 }}>
              Terima kasih telah mendukung usaha kami. Mari bersama-sama menikmati 
              produk herbal berkualitas yang dibuat dengan penuh dedikasi.
            </p>
            <button
              style={{
                background: 'linear-gradient(135deg,#d48c2a,#f0b855)',
                color: 'white',
                padding: '14px 32px',
                borderRadius: '10px',
                fontSize: '0.95rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 18px rgba(212,140,42,0.38)',
              }}
            >
              Hubungi Kami
            </button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
