import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Leaf, LogOut, Menu, X } from 'lucide-react'

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
  const location = useLocation()
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [menuOpen, setMenuOpen] = useState(false)

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
      if (window.innerWidth > 768) {
        setMenuOpen(false) // Close menu when resizing to desktop
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Close menu when route changes
  React.useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  function handleLogout() {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
    setMenuOpen(false)
    navigate('/')
  }

  function handleLogin() {
    setMenuOpen(false)
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

      {/* Links - Desktop only */}
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
        {/* Desktop: Show user name and logout */}
        {!isMobile && isAuthenticated && currentUser.name && (
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', fontWeight: 500 }}>
            {currentUser.name}
          </span>
        )}
        
        {!isMobile && (
          isAuthenticated ? (
            <button
              onClick={handleLogout}
              style={{
                background: 'linear-gradient(135deg,#7ab648,#4a7c2f)',
                borderRadius: '8px',
                padding: '8px 18px',
                color: 'white',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                border: 'none',
              }}
            >
              <LogOut size={16} />
              Keluar
            </button>
          ) : (
            <button
              onClick={handleLogin}
              style={{
                background: 'linear-gradient(135deg,#7ab648,#4a7c2f)',
                borderRadius: '8px',
                padding: '8px 18px',
                color: 'white',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none',
              }}
            >
              Masuk
            </button>
          )
        )}

        {/* Mobile: Hamburger menu */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobile && menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '56px',
            left: 0,
            right: 0,
            background: 'rgba(27,46,15,0.98)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
            zIndex: 99,
            padding: '1rem',
            maxHeight: 'calc(100vh - 56px)',
            overflowY: 'auto',
          }}
        >
          {/* User info if logged in */}
          {isAuthenticated && currentUser.name && (
            <div
              style={{
                padding: '1rem',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                marginBottom: '1rem',
              }}
            >
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', display: 'block', marginBottom: '0.25rem' }}>
                Masuk sebagai
              </span>
              <span style={{ color: 'white', fontSize: '0.9rem', fontWeight: 600 }}>
                {currentUser.name}
              </span>
            </div>
          )}

          {/* Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  color: location.pathname === link.path ? '#7ab648' : 'rgba(255,255,255,0.85)',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: location.pathname === link.path ? 600 : 500,
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  background: location.pathname === link.path ? 'rgba(122,182,72,0.15)' : 'transparent',
                  transition: 'all 0.2s',
                }}
              >
                {link.label}
              </Link>
            ))}
            
            {isAuthenticated && PROTECTED_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  color: location.pathname === link.path ? '#7ab648' : 'rgba(255,255,255,0.85)',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: location.pathname === link.path ? 600 : 500,
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  background: location.pathname === link.path ? 'rgba(122,182,72,0.15)' : 'transparent',
                  transition: 'all 0.2s',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Login/Logout Button */}
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg,#7ab648,#4a7c2f)',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  border: 'none',
                }}
              >
                <LogOut size={18} />
                Keluar
              </button>
            ) : (
              <button
                onClick={handleLogin}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg,#7ab648,#4a7c2f)',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                }}
              >
                Masuk
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
