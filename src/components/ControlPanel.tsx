import React, { useState, useEffect } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

// API URL - Backend Railway
const API_URL = 'https://web-production-32384.up.railway.app/api'

interface DataPoint {
  jam: number
  suhu: number
}

interface SensorData {
  device: string
  suhu: number
  mode: string
  heater: boolean
  fan: boolean
  setpoint: number | null
  createdAt: string
}


function Gauge({ value, max }: { value: number; max: number }) {
  const cx = 100
  const cy = 100
  const r = 70
  const startDeg = -210
  const endDeg = 30
  const totalSweep = endDeg - startDeg

  function polar(angleDeg: number) {
    const rad = ((angleDeg - 90) * Math.PI) / 180
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
  }

  function arc(from: number, to: number) {
    const s = polar(to)
    const e = polar(from)
    const large = to - from > 180 ? 1 : 0
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 0 ${e.x} ${e.y}`
  }

  const fillAngle = startDeg + (value / max) * totalSweep

  return (
    <svg width="200" height="170" viewBox="0 0 200 170" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="gGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4a7c2f" />
          <stop offset="100%" stopColor="#7ab648" />
        </linearGradient>
      </defs>
      {/* Track */}
      <path d={arc(startDeg, endDeg)} fill="none" stroke="#e8eee0" strokeWidth="12" strokeLinecap="round" />
      {/* Fill */}
      <path d={arc(startDeg, fillAngle)} fill="none" stroke="url(#gGrad)" strokeWidth="12" strokeLinecap="round" />
      <text x={cx} y={cy - 22} textAnchor="middle" fill="#7ab648" fontSize="10" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">SUHU</text>
      <text x={cx} y={cy + 3} textAnchor="middle" fill="#8a9a7a" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif">SAAT INI:</text>
      <text x={cx} y={cy + 30} textAnchor="middle" fill="#1a2810" fontSize="28" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif">{value.toFixed(1)}°C</text>
    </svg>
  )
}

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      style={{
        width: '54px', height: '28px',
        borderRadius: '14px',
        background: on ? 'linear-gradient(135deg,#4a7c2f,#7ab648)' : '#ccc',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background 0.3s',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '3px',
          left: on ? '29px' : '3px',
          width: '22px', height: '22px',
          borderRadius: '50%',
          background: 'white',
          boxShadow: '0 2px 5px rgba(0,0,0,0.22)',
          transition: 'left 0.3s',
        }}
      />
      <span
        style={{
          position: 'absolute',
          top: '50%', transform: 'translateY(-50%)',
          left: on ? '6px' : '14px',
          fontSize: '0.6rem', fontWeight: 700,
          color: on ? 'white' : '#888',
          transition: 'all 0.3s',
          userSelect: 'none',
        }}
      >
        {on ? 'ON' : 'OFF'}
      </span>
    </button>
  )
}

export default function ControlPanel() {
  // State
  const [data, setData] = useState<DataPoint[]>([])
  const [currentTemp, setCurrentTemp] = useState(0)
  const [isPowerOn, setIsPowerOn] = useState(false)
  const [isExhaustOn, setIsExhaustOn] = useState(false)
  const [targetTemp, setTargetTemp] = useState(50)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasData, setHasData] = useState(false) // Track apakah ada data masuk
  const [lastDataTime, setLastDataTime] = useState<Date | null>(null) // Track waktu data terakhir

  // Fetch latest sensor data
  const fetchLatestData = async () => {
    try {
      const response = await fetch(`${API_URL}/sensor/latest`)
      const result = await response.json()
      
      if (result.success && result.data) {
        // Cek apakah data benar-benar ada (bukan kosong)
        const dataAge = new Date().getTime() - new Date(result.data.createdAt).getTime()
        const isDataFresh = dataAge < 30000 // Data dianggap segar jika < 30 detik
        
        setCurrentTemp(result.data.suhu)
        
        // Jika data fresh, update dari backend. Jika tidak, set ke false (default OFF)
        if (isDataFresh) {
          const heaterStatus = result.data.heater === true || result.data.heater === 'true'
          setIsPowerOn(heaterStatus)
          
          // Exhaust
          if (result.data.exhaust !== undefined) {
            const exhaustStatus = result.data.exhaust === true || result.data.exhaust === 'true'
            setIsExhaustOn(exhaustStatus)
          }
        } else {
          // Data sudah lama, set toggle ke OFF untuk keamanan
          setIsPowerOn(false)
          setIsExhaustOn(false)
        }
        
        console.log('Data dari backend:', {
          heater: result.data.heater,
          fan: result.data.fan,
          dataAge: `${Math.floor(dataAge / 1000)}s`,
          isDataFresh: isDataFresh,
          toggleStatus: isDataFresh ? result.data.heater : false
        })
        
        if (result.data.setpoint) {
          setTargetTemp(result.data.setpoint)
        }
        
        // Set hasData hanya jika data segar
        setHasData(isDataFresh)
        setLastDataTime(new Date(result.data.createdAt))
        setError(null)
      } else {
        // Tidak ada data - reset semua ke default
        setHasData(false)
        setLastDataTime(null)
        setIsPowerOn(false)
        setIsExhaustOn(false)
      }
    } catch (err) {
      setError('Gagal memuat data sensor')
      setHasData(false)
      setIsPowerOn(false)
      setIsExhaustOn(false)
      console.error('Error fetching latest data:', err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch history data untuk grafik
  const fetchHistoryData = async () => {
    try {
      const response = await fetch(`${API_URL}/sensor/esp32_cabai_01?limit=24`)
      const result = await response.json()
      
      if (result.success && result.data && result.data.length > 0) {
        // Database sudah menyimpan WIB, langsung pakai saja
        const chartData: DataPoint[] = result.data.map((item: SensorData, index: number) => {
          const date = new Date(item.createdAt)
          return {
            jam: date.getUTCHours(),
            suhu: item.suhu
          }
        }).reverse()
        
        setData(chartData)
      } else {
        // Jika tidak ada data, buat data dummy
        setData(Array.from({ length: 24 }, (_, i) => ({
          jam: i,
          suhu: 0
        })))
      }
    } catch (err) {
      console.error('Error fetching history:', err)
      // Buat data dummy jika error
      setData(Array.from({ length: 24 }, (_, i) => ({
        jam: i,
        suhu: 0
      })))
    }
  }

  // Toggle heater + fan in (kontrol manual)
  const handlePowerToggle = async () => {
    const newState = !isPowerOn
    
    try {
      const response = await fetch(`${API_URL}/sensor/control`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mode: 'MANUAL',
          heater: newState
        })
      })
      
      const result = await response.json()
      
      if (result.success) {
        setIsPowerOn(newState)
        console.log('Heater + Fan In berhasil diubah:', newState ? 'ON' : 'OFF')
      } else {
        alert('Gagal mengubah status heater + fan in')
      }
    } catch (err) {
      alert('Gagal mengirim kontrol')
      console.error('Error sending control:', err)
    }
  }

  // Toggle exhaust fan
  const handleExhaustToggle = async () => {
    const newState = !isExhaustOn
    
    try {
      const response = await fetch(`${API_URL}/sensor/control`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mode: 'MANUAL',
          fanExhaust: newState
        })
      })
      
      const result = await response.json()
      
      if (result.success) {
        setIsExhaustOn(newState)
        console.log('Exhaust Fan berhasil diubah:', newState ? 'ON' : 'OFF')
      } else {
        alert('Gagal mengubah status exhaust fan')
      }
    } catch (err) {
      alert('Gagal mengirim kontrol exhaust')
      console.error('Error sending exhaust control:', err)
    }
  }

  // Fetch data on mount dan setiap 5 detik
  useEffect(() => {
    fetchLatestData()
    fetchHistoryData()
    
    const interval = setInterval(() => {
      fetchLatestData()
      fetchHistoryData()
    }, 5000) // Update setiap 5 detik
    
    return () => clearInterval(interval)
  }, [])

  return (
    <section style={{ background: '#f5f2eb', padding: '3rem 1rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div
            style={{
              display: 'inline-block',
              background: 'rgba(74,124,47,0.1)',
              border: '1px solid rgba(74,124,47,0.2)',
              borderRadius: '20px', padding: '5px 16px', marginBottom: '0.8rem',
            }}
          >
            <span style={{ color: '#4a7c2f', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em' }}>
              MONITORING REAL-TIME
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.8rem,3vw,2.5rem)',
              fontWeight: 700, color: '#1a2810', marginBottom: '0.4rem',
            }}
          >
            Panel Kontrol Pengeringan Pintar
          </h2>
          <p style={{ color: '#6a7a5a', fontSize: '0.92rem' }}>
            Monitor suhu
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: 'white',
            borderRadius: '24px', padding: '2rem',
            boxShadow: '0 4px 40px rgba(45,74,30,0.07)',
            border: '1px solid rgba(74,124,47,0.1)',
          }}
        >
          {/* Card header */}
          <div
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: '2rem', paddingBottom: '1rem',
              borderBottom: '1px solid #e8eee0',
            }}
          >
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1a2810' }}>
              Panel Kontrol Pengeringan Pintar
            </h3>
            {hasData && (
              <div
                style={{
                  display: 'flex', alignItems: 'center', gap: '7px',
                  background: 'rgba(122,182,72,0.1)',
                  border: '1px solid rgba(122,182,72,0.3)',
                  borderRadius: '20px', padding: '5px 14px',
                }}
              >
                <div
                  style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: '#7ab648',
                    boxShadow: '0 0 6px #7ab648',
                  }}
                />
                <span
                  style={{
                    fontSize: '0.78rem', fontWeight: 600,
                    color: '#4a7c2f',
                  }}
                >
                  Status: Online
                </span>
              </div>
            )}
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: window.innerWidth > 768 ? '220px 1fr' : '1fr',
            gap: '2.5rem', 
            alignItems: 'start' 
          }}>
            {/* Left controls */}
            <div>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#8a9a7a' }}>
                  Memuat data...
                </div>
              ) : error ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#cc4444' }}>
                  {error}
                </div>
              ) : (
                <>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    marginBottom: '1.2rem',
                    padding: '0.5rem',
                    overflow: 'visible'
                  }}>
                    <Gauge value={currentTemp} max={100} />
                  </div>

                  {/* Power row - Kontrol Heater + Fan In */}
                  <div
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      background: '#f8faf5', borderRadius: '12px', padding: '11px 14px',
                      marginBottom: '0.9rem',
                    }}
                  >
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2d4a1e', letterSpacing: '0.05em' }}>
                      HEATER + FAN IN
                    </span>
                    <Toggle on={isPowerOn} onToggle={handlePowerToggle} />
                  </div>

                  {/* Exhaust Fan row */}
                  <div
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      background: '#f8faf5', borderRadius: '12px', padding: '11px 14px',
                      marginBottom: '0.9rem',
                    }}
                  >
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2d4a1e', letterSpacing: '0.05em' }}>
                      EXHAUST FAN
                    </span>
                    <Toggle on={isExhaustOn} onToggle={handleExhaustToggle} />
                  </div>

                  {/* Setpoint - READ ONLY (Monitoring) */}
                  <div
                    style={{
                      background: '#f8faf5', borderRadius: '12px', padding: '11px 14px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2d4a1e', letterSpacing: '0.05em' }}>
                        TARGET SUHU
                      </span>
                      <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#d48c2a' }}>
                        {targetTemp}°C
                      </span>
                    </div>
                    <div style={{ 
                      marginTop: '8px', 
                      padding: '8px 12px', 
                      background: 'rgba(212,140,42,0.08)',
                      borderRadius: '8px',
                      border: '1px solid rgba(212,140,42,0.15)'
                    }}>
                      <p style={{ 
                        margin: 0, 
                        fontSize: '0.75rem', 
                        color: '#8a7a5a',
                        textAlign: 'center'
                      }}>
                        ℹ️ Target suhu diatur dari aplikasi mobile
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Right chart */}
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1a2810', marginBottom: '1.2rem' }}>
                Riwayat 24 Jam
              </h4>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={data} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7ab648" stopOpacity={0.28} />
                      <stop offset="95%" stopColor="#7ab648" stopOpacity={0.01} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0e8" />
                  <XAxis dataKey="jam" tick={{ fontSize: 11, fill: '#8a9a7a' }} tickLine={false} axisLine={{ stroke: '#e8eee0' }} />
                  <YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tick={{ fontSize: 11, fill: '#8a9a7a' }} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ background: 'white', border: '1px solid #e8eee0', borderRadius: '10px', fontSize: '12px' }}
                    formatter={(val: number) => [`${val.toFixed(1)}°C`, 'Suhu']}
                    labelFormatter={(l: number) => `Jam ${l}:00`}
                  />
                  <Area type="monotone" dataKey="suhu" stroke="#7ab648" strokeWidth={2.5} fill="url(#aGrad)" dot={false} activeDot={{ r: 5, fill: '#4a7c2f' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
