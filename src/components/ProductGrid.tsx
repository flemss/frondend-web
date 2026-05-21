import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingCart, Star } from 'lucide-react'

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
}

const PRODUCTS: Product[] = [
  { id: 1, name: 'Cabai Jawa Kering Premium', description: 'Dikeringkan pada suhu presisi untuk mempertahankan warna dan aroma.', price: 'Rp 85.000', unit: '100g', emoji: '🌶️', badge: 'TERLARIS', rating: 4.9, reviews: 128, bgColor: 'linear-gradient(135deg,#8B1A0A,#C0392B)' },
  { id: 2, name: 'Cabai Jawa', description: 'Proses higienis, warna dan rasa alami terjaga sepanjang proses pengeringan.', price: 'Rp 30.000', unit: '100g', emoji: '🌿', rating: 4.7, reviews: 84, bgColor: 'linear-gradient(135deg,#5c3a1e,#8b5e3c)' },
  { id: 3, name: 'Teh Rempah Hangat', description: 'Campuran herbal pilihan untuk kesehatan yang menyegarkan jiwa dan raga.', price: 'Rp 55.000', unit: 'pack', emoji: '🍵', badge: 'BARU', rating: 4.8, reviews: 56, bgColor: 'linear-gradient(135deg,#4a3220,#7a5c3a)' },
  { id: 4, name: 'Jahe Merah Kering', description: 'Jahe merah pilihan kaya antioksidan, diproses tanpa bahan pengawet.', price: 'Rp 45.000', unit: '100g', emoji: '🫚', rating: 4.6, reviews: 72, bgColor: 'linear-gradient(135deg,#7a2010,#b84030)' },
]

const CATEGORIES = []

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [added, setAdded] = useState(false)
  const [hovered, setHovered] = useState(false)

  function handleAdd() {
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

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
        animation: `fadeUp 0.5s ease ${index * 0.08}s both`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
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
        {product.badge && (
          <div
            style={{
              position: 'absolute', top: '12px', right: '12px',
              background: product.badge === 'TERLARIS' ? '#d48c2a' : '#4a7c2f',
              color: 'white', fontSize: '0.62rem', fontWeight: 700,
              padding: '3px 9px', borderRadius: '6px', letterSpacing: '0.04em',
            }}
          >
            {product.badge}
          </div>
        )}
        <span style={{ fontSize: '3.8rem', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}>
          {product.emoji}
        </span>
      </div>

      {/* Info */}
      <div style={{ padding: '1.1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
          <Star size={12} fill="#d48c2a" color="#d48c2a" />
          <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#d48c2a' }}>{product.rating}</span>
          <span style={{ fontSize: '0.74rem', color: '#a0a898' }}>({product.reviews})</span>
        </div>
        <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1a2810', marginBottom: '5px', lineHeight: 1.3 }}>
          {product.name}
        </h3>
        <p style={{ fontSize: '0.78rem', color: '#7a8a6a', lineHeight: 1.5, marginBottom: '1rem' }}>
          {product.description}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '1rem', fontWeight: 800, color: '#1a2810' }}>{product.price}</span>
            <span style={{ fontSize: '0.74rem', color: '#a0a898' }}> / {product.unit}</span>
          </div>
          <button
            onClick={handleAdd}
            style={{
              background: added
                ? 'linear-gradient(135deg,#4a7c2f,#7ab648)'
                : 'linear-gradient(135deg,#d48c2a,#f0b855)',
              color: 'white',
              padding: '7px 12px',
              borderRadius: '10px',
              fontSize: '0.74rem',
              fontWeight: 700,
              display: 'flex', alignItems: 'center', gap: '5px',
              transition: 'all 0.3s',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
          </button>
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

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState('Semua')

  return (
    <section style={{ background: 'white', padding: '5rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header row */}
        <div
          style={{
            display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end',
            marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {CATEGORIES.map((cat) => (
              <CategoryBtn
                key={cat} label={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(270px,1fr))',
            gap: '1.4rem',
          }}
        >
          {PRODUCTS.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>

        {/* Load more */}
        <LoadMoreBtn />
      </div>
    </section>
  )
}

function LoadMoreBtn() {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  function handleClick() {
    navigate('/produk')
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <button
        onClick={handleClick}
        style={{
          background: hovered ? '#2d4a1e' : 'transparent',
          border: '2px solid #2d4a1e',
          color: hovered ? 'white' : '#2d4a1e',
          padding: '12px 36px', borderRadius: '12px',
          fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        Lihat Semua Produk
      </button>
    </div>
  )
}
