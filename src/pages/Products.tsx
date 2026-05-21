import React, { useState } from 'react'
import { Filter } from 'lucide-react'
import Footer from '../components/Footer'

interface Product {
  id: number
  name: string
  description: string
  price: string
  unit: string
  emoji: string
  badge?: string
  rating: number
  reviews: number
  bgColor: string
  category: string
}

const ALL_PRODUCTS: Product[] = [
  { id: 1, name: 'Cabai Jawa Kering Premium', description: 'Dikeringkan pada suhu presisi untuk mempertahankan warna dan aroma.', price: 'Rp 85.000', unit: '100g', emoji: '🌶️', badge: 'TERLARIS', rating: 4.9, reviews: 128, bgColor: 'linear-gradient(135deg,#8B1A0A,#C0392B)', category: 'Rempah' },
  { id: 2, name: 'Cabai Jawa', description: 'Proses higienis, warna dan rasa alami terjaga sepanjang proses pengeringan.', price: 'Rp 30.000', unit: '100g', emoji: '🌿', rating: 4.7, reviews: 84, bgColor: 'linear-gradient(135deg,#5c3a1e,#8b5e3c)', category: 'Rempah' },
  { id: 3, name: 'Teh Rempah Hangat', description: 'Campuran herbal pilihan untuk kesehatan yang menyegarkan jiwa dan raga.', price: 'Rp 55.000', unit: 'pack', emoji: '🍵', badge: 'BARU', rating: 4.8, reviews: 56, bgColor: 'linear-gradient(135deg,#4a3220,#7a5c3a)', category: 'Teh' },
  { id: 4, name: 'Bubuk Cabai Jawa', description: 'Cabai jawa pilihan kaya antioksidan, diproses tanpa bahan pengawet.', price: 'Rp 135.000', unit: '1000g', emoji: '🫚', rating: 4.6, reviews: 72, bgColor: 'linear-gradient(135deg,#7a2010,#b84030)', category: 'Rempah' },
]

const CATEGORIES = ['Semua', 'Rempah', 'Teh',]

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: hovered ? '0 14px 44px rgba(45,74,30,0.15)' : '0 2px 20px rgba(45,74,30,0.06)',
        border: '1px solid rgba(74,124,47,0.08)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          height: '175px',
          background: product.bgColor,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute', top: '12px', left: '12px',
            width: '26px', height: '26px',
            background: 'rgba(0,0,0,0.28)',
            borderRadius: '7px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: '0.72rem', fontWeight: 700,
          }}
        >
          {product.id}
        </div>
        <span style={{ fontSize: '3.8rem', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}>
          {product.emoji}
        </span>
      </div>

      <div style={{ padding: '1.1rem' }}>
        <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1a2810', marginBottom: '5px', lineHeight: 1.3 }}>
          {product.name}
        </h3>
        <p style={{ fontSize: '0.78rem', color: '#7a8a6a', lineHeight: 1.5, marginBottom: '1rem' }}>
          {product.description}
        </p>
        <div>
          <span style={{ fontSize: '1rem', fontWeight: 800, color: '#1a2810' }}>{product.price}</span>
          <span style={{ fontSize: '0.74rem', color: '#a0a898' }}> / {product.unit}</span>
        </div>
      </div>
    </div>
  )
}

function CategoryBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '7px 16px', borderRadius: '20px',
        fontSize: '0.82rem', fontWeight: 600,
        border: active ? 'none' : '1px solid #e8eee0',
        background: active ? 'linear-gradient(135deg,#2d4a1e,#4a7c2f)' : 'white',
        color: active ? 'white' : '#4a5c3a',
        cursor: 'pointer', transition: 'all 0.2s',
      }}
    >
      {label}
    </button>
  )
}

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const filteredProducts = activeCategory === 'Semua' 
    ? ALL_PRODUCTS 
    : ALL_PRODUCTS.filter(p => p.category === activeCategory)

  return (
    <>
      <div style={{ paddingTop: isMobile ? '56px' : '64px', minHeight: '100vh', background: '#f5f2eb' }}>
        {/* Hero Section */}
        <section
          style={{
            background: 'linear-gradient(135deg,#1a2e0f 0%,#2d4a1e 45%,#4a7c2f 100%)',
            padding: isMobile ? '3rem 1rem' : '4rem 2rem',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div
              style={{
                display: 'inline-block',
                background: 'rgba(122,182,72,0.18)',
                border: '1px solid rgba(122,182,72,0.38)',
                borderRadius: '20px', padding: '6px 16px', marginBottom: '1rem',
              }}
            >
              <span style={{ color: '#a8d878', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.06em' }}>
                KOLEKSI LENGKAP
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
              Produk Herbal Premium
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.75 }}>
              Rempah dan herbal Nusantara berkualitas tinggi, diproses dengan teknologi pengeringan 
            </p>
          </div>
        </section>

        {/* Products Section */}
        <section style={{ padding: isMobile ? '3rem 1rem' : '4rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Filter */}
            <div
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: isMobile ? 'flex-start' : 'center',
                marginBottom: '2.5rem',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Filter size={18} color="#4a7c2f" />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#2d4a1e' }}>
                  Filter Kategori:
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {CATEGORIES.map((cat) => (
                  <CategoryBtn
                    key={cat}
                    label={cat}
                    active={activeCategory === cat}
                    onClick={() => setActiveCategory(cat)}
                  />
                ))}
              </div>
            </div>

            {/* Product Count */}
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.9rem', color: '#6a7a5a' }}>
                Menampilkan {filteredProducts.length} produk
              </span>
            </div>

            {/* Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill,minmax(270px,1fr))',
                gap: '1.4rem',
              }}
            >
              {filteredProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
