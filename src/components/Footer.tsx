import React, { useState } from 'react'
import { Leaf, Mail, Phone, MapPin, Instagram, Facebook, Youtube, LucideProps } from 'lucide-react'

// ── types ────────────────────────────────────────────────────────────────────
type IconComponent = React.FC<LucideProps>

interface LinkColData { title: string; links: string[] }
interface ContactData { Icon: IconComponent; text: string }

// ── data ─────────────────────────────────────────────────────────────────────
const SOCIAL_ICONS: IconComponent[] = [Instagram, Facebook, Youtube]

const LINK_COLS: LinkColData[] = [
  { title: 'Produk', links: ['Rempah Kering','Jamu Tradisional', 'Paket Bundle'] },
]

const CONTACT_ITEMS: ContactData[] = [
  { Icon: Phone, text: '+62 812-3456-7890' },
  { Icon: Mail, text: 'info@javaherbal.id' },
  { Icon: MapPin, text: 'Ambulu, Jawa Timur' },
]

const LEGAL_LINKS = ['Kebijakan Privasi', 'Syarat & Ketentuan', 'Kebijakan Cookie']

// ── sub-components ────────────────────────────────────────────────────────────
function HoverLink({ children, dimColor = 'rgba(255,255,255,0.6)', size = '0.85rem' }: {
  children: React.ReactNode
  dimColor?: string
  size?: string
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href="#"
      style={{
        color: hovered ? '#7ab648' : dimColor,
        textDecoration: 'none',
        fontSize: size,
        transition: 'color 0.2s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  )
}

function SocialBtn({ Icon }: { Icon: IconComponent }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      style={{
        width: '36px', height: '36px',
        borderRadius: '8px',
        background: hovered ? 'rgba(122,182,72,0.28)' : 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: hovered ? '#7ab648' : 'rgba(255,255,255,0.7)',
        cursor: 'pointer', transition: 'all 0.2s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon size={16} />
    </button>
  )
}

function LinkCol({ title, links }: LinkColData) {
  return (
    <div>
      <h4 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '1.2rem', color: '#a8d878' }}>
        {title}
      </h4>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {links.map((link) => (
          <li key={link} style={{ marginBottom: '9px' }}>
            <HoverLink>{link}</HoverLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ContactRow({ Icon, text }: ContactData) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
      <Icon size={15} color="#7ab648" />
      <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.84rem' }}>{text}</span>
    </div>
  )
}

// ── main component ────────────────────────────────────────────────────────────
export default function Footer() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <footer
      style={{
        background: 'linear-gradient(135deg,#1a2e0f,#2d4a1e)',
        color: 'white',
        padding: isMobile ? '3rem 1rem 2rem' : '4rem 2rem 2rem',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Top grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr 1fr',
            gap: isMobile ? '2rem' : '3rem',
            marginBottom: isMobile ? '2rem' : '3rem',
          }}
        >
          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '36px', height: '36px',
                  background: 'linear-gradient(135deg,#7ab648,#4a7c2f)',
                  borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Leaf size={20} color="white" />
              </div>
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.4rem', fontWeight: 700,
                }}
              >
                Java<span style={{ color: '#7ab648' }}>Herbal</span>
              </span>
            </div>
            <p
              style={{
                color: 'rgba(255,255,255,0.6)', fontSize: '0.87rem',
                lineHeight: 1.75, marginBottom: '1.5rem', maxWidth: isMobile ? '100%' : '280px',
              }}
            >
              Teknologi pengeringan untuk menjaga khasiat alami rempah Nusantara.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {SOCIAL_ICONS.map((Icon, i) => (
                <SocialBtn key={i} Icon={Icon} />
              ))}
            </div>
          </div>

          {/* Link columns */}
          {LINK_COLS.map((col) => (
            <LinkCol key={col.title} {...col} />
          ))}

          {/* Contact column */}
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '1.2rem', color: '#a8d878' }}>
              Hubungi Kami
            </h4>
            {CONTACT_ITEMS.map((item, i) => (
              <ContactRow key={i} {...item} />
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '1.5rem',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.8rem' }}>
            © 2025 JavaHerbal. 
          </span>
          <div style={{ display: 'flex', gap: isMobile ? '1rem' : '2rem', flexWrap: 'wrap' }}>
            {LEGAL_LINKS.map((item) => (
              <span key={item}>
                <HoverLink dimColor="rgba(255,255,255,0.38)" size="0.8rem">
                  {item}
                </HoverLink>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
