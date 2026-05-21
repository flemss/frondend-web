import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Leaf, LogOut } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Beranda', path: '/' },
  { label: 'Produk', path: '/produk' },
  { label: 'Tentang Kami', path: '/tentang' },
]

const PROTECTED_LINKS = [
  { label: 'Control Panel', path: '/control' },
]

function NavLink({ label, path }: { label: string; path: string }) {
  const [hovered, setHovered] = useState(false)
  const location = useLocation()
  const isActive = location.pathname === path

  return (
    <Link
      to={path}
      style={{
        color: isActive ? '#7ab648' : hovered ? '#7ab648' : 'rgba(255,255,255,0.85)',
        textDecoration: 'none',
        fontSize: '0.9rem',
        fontWeight: isActive ? 600 : 500,
        transition: 'color 0.2s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </Link>
  )
}

export default function Navbar() {
  const navigate = useNavigate()
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  function handleLogout() {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('currentUser')
    navigate('/')
  }

  function handleLogin() {
    navigate('/login')
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        background: 'rgba(27,46,15,0.96)',
        backdropFilter: 'blur(12px)',
        height: isMobile ? '56px' : '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '0 1rem' : '0 2rem',
        boxShadow: '0 2px 24px rgba(0,0,0,0.18)',
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '6px' : '8px', textDecoration: 'none' }}>
        <div
          style={{
            width: isMobile ? '28px' : '32px',
            height: isMobile ? '28px' : '32px',
            background: 'linear-gradient(135deg,#7ab648,#4a7c2f)',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Leaf size={isMobile ? 16 : 18} color="white" />
        </div>
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? '1rem' : '1.3rem',
            fontWeight: 700,
            color: 'white',
          }}
        >
          Java<span style={{ color: '#7ab648' }}>Herbal</span>
        </span>
      </Link>

      {/* Links - Hide on mobile */}
      {!isMobile && (
        <div style={{ display: 'flex', gap: '2rem' }}>
          {NAV_LINKS.map((link) => (
            <NavLink key={link.path} label={link.label} path={link.path} />
          ))}
          {isAuthenticated && PROTECTED_LINKS.map((link) => (
            <NavLink key={link.path} label={link.label} path={link.path} />
          ))}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: isMobile ? '0.5rem' : '0.8rem', alignItems: 'center' }}>
        {isAuthenticated ? (
          <>
            {!isMobile && currentUser.name && (
              <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', fontWeight: 500 }}>
                {currentUser.name}
              </span>
            )}
            <button
              onClick={handleLogout}
              style={{
                background: 'linear-gradient(135deg,#7ab648,#4a7c2f)',
                borderRadius: '8px',
                padding: isMobile ? '6px 12px' : '8px 18px',
                color: 'white',
                fontSize: isMobile ? '0.75rem' : '0.85rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                border: 'none',
              }}
            >
              <LogOut size={isMobile ? 14 : 16} />
              {!isMobile && 'Keluar'}
            </button>
          </>
        ) : (
          <button
            onClick={handleLogin}
            style={{
              background: 'linear-gradient(135deg,#7ab648,#4a7c2f)',
              borderRadius: '8px',
              padding: isMobile ? '6px 12px' : '8px 18px',
              color: 'white',
              fontSize: isMobile ? '0.75rem' : '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: 'none',
            }}
          >
            Masuk
          </button>
        )}
      </div>
    </nav>
  )
}
