import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Leaf, Mail, Lock, User, Eye, EyeOff } from 'lucide-react'

// API URL - Backend Railway
const API_URL = 'https://web-production-32384.up.railway.app/api'

export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    // Validasi client-side
    if (password !== confirmPassword) {
      setError('Password tidak cocok')
      return
    }

    if (password.length < 6) {
      setError('Password minimal 6 karakter')
      return
    }

    setLoading(true)

    try {
      // Kirim request ke backend
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      })

      const result = await response.json()

      if (result.success) {
        console.log('✅ Registrasi berhasil:', result.user.email)
        alert('Registrasi berhasil! Silakan login.')
        navigate('/login')
      } else {
        setError(result.message || 'Registrasi gagal')
      }
    } catch (error) {
      console.error('❌ Error register:', error)
      setError('Terjadi kesalahan. Pastikan backend sudah berjalan.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg,#1a2e0f 0%,#2d4a1e 45%,#4a7c2f 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '24px',
          padding: '3rem',
          maxWidth: '440px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
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
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.8rem',
              fontWeight: 700,
              color: '#1a2810',
              marginBottom: '0.5rem',
            }}
          >
            Buat Akun Baru
          </h1>
          <p style={{ color: '#6a7a5a', fontSize: '0.9rem' }}>
            Bergabung dengan JavaHerbal
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {error && (
            <div
              style={{
                background: '#fee',
                border: '1px solid #fcc',
                borderRadius: '8px',
                padding: '10px',
                marginBottom: '1rem',
                color: '#c33',
                fontSize: '0.85rem',
                textAlign: 'center',
              }}
            >
              {error}
            </div>
          )}

          {/* Name */}
          <div style={{ marginBottom: '1.2rem' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#2d4a1e',
                marginBottom: '0.5rem',
              }}
            >
              Nama Lengkap
            </label>
            <div style={{ position: 'relative' }}>
              <User
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#8a9a7a',
                }}
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Nama Anda"
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 44px',
                  border: '1px solid #e8eee0',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#7ab648')}
                onBlur={(e) => (e.target.style.borderColor = '#e8eee0')}
              />
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: '1.2rem' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#2d4a1e',
                marginBottom: '0.5rem',
              }}
            >
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#8a9a7a',
                }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="nama@email.com"
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 44px',
                  border: '1px solid #e8eee0',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#7ab648')}
                onBlur={(e) => (e.target.style.borderColor = '#e8eee0')}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '1.2rem' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#2d4a1e',
                marginBottom: '0.5rem',
              }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#8a9a7a',
                }}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Minimal 6 karakter"
                style={{
                  width: '100%',
                  padding: '12px 44px 12px 44px',
                  border: '1px solid #e8eee0',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#7ab648')}
                onBlur={(e) => (e.target.style.borderColor = '#e8eee0')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                }}
              >
                {showPassword ? <EyeOff size={18} color="#8a9a7a" /> : <Eye size={18} color="#8a9a7a" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#2d4a1e',
                marginBottom: '0.5rem',
              }}
            >
              Konfirmasi Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#8a9a7a',
                }}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Ulangi password"
                style={{
                  width: '100%',
                  padding: '12px 44px 12px 44px',
                  border: '1px solid #e8eee0',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#7ab648')}
                onBlur={(e) => (e.target.style.borderColor = '#e8eee0')}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: loading 
                ? '#ccc' 
                : 'linear-gradient(135deg,#4a7c2f,#7ab648)',
              color: 'white',
              fontSize: '0.95rem',
              fontWeight: 700,
              borderRadius: '10px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '1rem',
            }}
          >
            {loading ? 'Memproses...' : 'Daftar'}
          </button>

          {/* Login link */}
          <div style={{ textAlign: 'center' }}>
            <span style={{ color: '#6a7a5a', fontSize: '0.85rem' }}>
              Sudah punya akun?{' '}
              <Link
                to="/login"
                style={{
                  color: '#4a7c2f',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Masuk di sini
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}
