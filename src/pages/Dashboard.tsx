import React from 'react'
import { Thermometer, Leaf, Sparkles, ChefHat } from 'lucide-react'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

const BENEFITS = [
  { title: 'Meningkatkan Metabolisme', desc: 'Capsaicin dalam cabai jawa membantu meningkatkan metabolisme tubuh' },
  { title: 'Kaya Antioksidan', desc: 'Mengandung vitamin C dan A yang tinggi untuk menangkal radikal bebas' },
  { title: 'Melancarkan Pencernaan', desc: 'Membantu merangsang produksi enzim pencernaan' },
  { title: 'Meredakan Nyeri', desc: 'Sifat analgesik alami membantu meredakan nyeri sendi dan otot' },
]

const RECIPES = [
  { name: 'Jamu Penghangat Badan', emoji: '🍵', desc: 'Minuman jamu hangat untuk meningkatkan metabolisme tubuh' },
  { name: 'Teh Herbal Cabai', emoji: '☕', desc: 'Teh herbal dengan campuran cabai untuk stamina' },
  { name: 'Minyak Gosok Herbal', emoji: '💧', desc: 'Minyak gosok dengan ekstrak cabai untuk meredakan nyeri' },
  { name: 'Kapsul Herbal', emoji: '💊', desc: 'Suplemen herbal untuk meningkatkan daya tahan tubuh' },
  { name: 'Ramuan Jamu Tradisional', emoji: '🌿', desc: 'Campuran jamu khas untuk kesehatan pencernaan' },
  { name: 'Minuman Herbal Hangat', emoji: '🥤', desc: 'Minuman herbal untuk melancarkan peredaran darah' },
]

export default function Dashboard() {
  return (
    <>
      <Hero />
      
      {/* About Tool Section */}
      <section style={{ background: 'white', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div
              style={{
                display: 'inline-block',
                background: 'rgba(74,124,47,0.1)',
                border: '1px solid rgba(74,124,47,0.2)',
                borderRadius: '20px',
                padding: '5px 16px',
                marginBottom: '0.8rem',
              }}
            >
              <span style={{ color: '#4a7c2f', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em' }}>
                TEKNOLOGI KAMI
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.8rem,3vw,2.5rem)',
                fontWeight: 700,
                color: '#1a2810',
                marginBottom: '1rem',
              }}
            >
              Alat Pengering Presisi
            </h2>
            <p style={{ color: '#6a7a5a', fontSize: '1rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.7 }}>
              Alat pengering kami menggunakan teknologi kontrol suhu presisi yang dapat diatur antara 50°C - 70°C.
              Dengan sistem monitoring real-time, kami memastikan setiap rempah dikeringkan pada suhu optimal untuk
              mempertahankan khasiat, warna, aroma, dan nutrisi alami.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
              marginTop: '3rem',
            }}
          >
            <div
              style={{
                background: '#f8faf5',
                borderRadius: '16px',
                padding: '2rem',
                textAlign: 'center',
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
                <Thermometer size={32} color="white" />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a2810', marginBottom: '0.5rem' }}>
                Kontrol Suhu Presisi
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#6a7a5a', lineHeight: 1.6 }}>
                Suhu dapat dikontrol dengan akurat untuk hasil pengeringan optimal
              </p>
            </div>

            <div
              style={{
                background: '#f8faf5',
                borderRadius: '16px',
                padding: '2rem',
                textAlign: 'center',
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
                <Sparkles size={32} color="white" />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a2810', marginBottom: '0.5rem' }}>
                Kualitas Terjaga
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#6a7a5a', lineHeight: 1.6 }}>
                Mempertahankan warna, aroma, dan nutrisi alami rempah
              </p>
            </div>

            <div
              style={{
                background: '#f8faf5',
                borderRadius: '16px',
                padding: '2rem',
                textAlign: 'center',
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
                <Leaf size={32} color="white" />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a2810', marginBottom: '0.5rem' }}>
                Higienis & Aman
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#6a7a5a', lineHeight: 1.6 }}>
                Proses pengeringan yang bersih dan aman untuk konsumsi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ background: '#f5f2eb', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div
              style={{
                display: 'inline-block',
                background: 'rgba(212,140,42,0.1)',
                border: '1px solid rgba(212,140,42,0.2)',
                borderRadius: '20px',
                padding: '5px 16px',
                marginBottom: '0.8rem',
              }}
            >
              <span style={{ color: '#d48c2a', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em' }}>
                MANFAAT KESEHATAN
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.8rem,3vw,2.5rem)',
                fontWeight: 700,
                color: '#1a2810',
                marginBottom: '1rem',
              }}
            >
              Kasiat Cabai Jawa
            </h2>
            <p style={{ color: '#6a7a5a', fontSize: '1rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.7 }}>
              Cabai jawa kaya akan nutrisi dan memiliki berbagai manfaat untuk kesehatan tubuh
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {BENEFITS.map((benefit, i) => (
              <div
                key={i}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '1.8rem',
                  border: '1px solid rgba(74,124,47,0.1)',
                  boxShadow: '0 2px 12px rgba(45,74,30,0.05)',
                }}
              >
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    background: '#d48c2a',
                    borderRadius: '50%',
                    marginBottom: '1rem',
                  }}
                />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1a2810', marginBottom: '0.5rem' }}>
                  {benefit.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#6a7a5a', lineHeight: 1.6 }}>
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recipes Section */}
      <section style={{ background: 'white', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div
              style={{
                display: 'inline-block',
                background: 'rgba(74,124,47,0.1)',
                border: '1px solid rgba(74,124,47,0.2)',
                borderRadius: '20px',
                padding: '5px 16px',
                marginBottom: '0.8rem',
              }}
            >
              <span style={{ color: '#4a7c2f', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em' }}>
                INSPIRASI OLAHAN
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.8rem,3vw,2.5rem)',
                fontWeight: 700,
                color: '#1a2810',
                marginBottom: '1rem',
              }}
            >
              Produk Herbal dari Cabai Jawa
            </h2>
            <p style={{ color: '#6a7a5a', fontSize: '1rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.7 }}>
              Cabai jawa kering dapat diolah menjadi berbagai produk herbal untuk kesehatan
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '2rem',
            }}
          >
            {RECIPES.map((recipe, i) => (
              <div
                key={i}
                style={{
                  background: 'linear-gradient(135deg,#f8faf5,#ffffff)',
                  borderRadius: '16px',
                  padding: '2rem',
                  textAlign: 'center',
                  border: '1px solid rgba(74,124,47,0.1)',
                  boxShadow: '0 2px 12px rgba(45,74,30,0.05)',
                }}
              >
                <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>{recipe.emoji}</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1a2810', marginBottom: '0.5rem' }}>
                  {recipe.name}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#6a7a5a', lineHeight: 1.6 }}>
                  {recipe.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
