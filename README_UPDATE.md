# ✅ Update Web Javaherbal - Connected to Railway Backend

## 🎉 Yang Sudah Diupdate:

### 1. API Connection
- **Backend URL:** `https://web-production-32384.up.railway.app/api`
- **File:** `src/components/ControlPanel.tsx`

### 2. Fitur Baru:

#### ✅ Real-time Data
- Suhu update otomatis setiap 5 detik
- Data dari ESP32 via backend Railway
- Grafik menampilkan history 24 jam terakhir

#### ✅ Kontrol Manual Heater
- Toggle HEATER: ON/OFF
- Kirim kontrol ke backend → MQTT → ESP32
- Status heater real-time

#### ✅ Target Suhu (Setpoint)
- Slider untuk set target suhu (30-80°C)
- Kirim setpoint ke backend
- Update otomatis

### 3. Tampilan
- **TIDAK DIUBAH** - Tampilan tetap sama seperti sebelumnya
- Hanya fungsi backend yang ditambahkan

---

## 🚀 Cara Menjalankan

### 1. Install Dependencies (jika belum)
```bash
cd javaherbal-v2/javaherbal2
npm install
```

### 2. Jalankan Development Server
```bash
npm run dev
```

### 3. Buka Browser
```
http://localhost:5173
```

### 4. Login & Akses Control Panel
- Login dengan akun yang sudah terdaftar
- Klik menu "Control" atau akses `/control`

---

## 🎯 Fitur Control Panel

### Gauge Suhu
- Menampilkan suhu real-time dari ESP32
- Update setiap 5 detik
- Range: 0-100°C

### Toggle HEATER
- **ON:** Heater aktif (hijau)
- **OFF:** Heater nonaktif (abu-abu)
- Klik untuk toggle ON/OFF
- Kirim kontrol ke ESP32 via backend

### Slider Target Suhu
- Set target suhu: 30-80°C
- Drag slider untuk ubah setpoint
- Otomatis kirim ke backend

### Grafik Riwayat
- Menampilkan data 24 jam terakhir
- Update setiap 5 detik
- Hover untuk lihat detail

---

## 🔄 Data Flow

```
ESP32 (Publish MQTT)
  ↓
MQTT Broker (broker.hivemq.com)
  ↓
Backend Railway (Subscribe & Save)
  ↓
MongoDB Atlas (Store data)
  ↓
API Endpoint (/api/sensor/latest)
  ↓
Web Javaherbal (Fetch & Display)
```

### Kontrol Flow

```
Web Javaherbal (Toggle Heater)
  ↓
POST /api/sensor/control
  ↓
Backend Railway (Publish MQTT)
  ↓
MQTT Broker
  ↓
ESP32 (Receive & Execute)
```

---

## 🧪 Testing

### Test 1: Data Real-time
1. Buka web di browser
2. Login dan akses Control Panel
3. Lihat gauge suhu
4. **Expected:** Suhu muncul dan update setiap 5 detik

### Test 2: Kontrol Heater
1. Klik toggle HEATER
2. Lihat perubahan warna (hijau = ON, abu = OFF)
3. Cek di aplikasi mobile atau ESP32
4. **Expected:** Heater ON/OFF sesuai toggle

### Test 3: Set Target Suhu
1. Drag slider target suhu
2. Lihat angka berubah
3. **Expected:** Setpoint terkirim ke backend

### Test 4: Grafik History
1. Lihat grafik di panel kanan
2. Hover untuk lihat detail
3. **Expected:** Grafik menampilkan data 24 jam

---

## 🔍 Troubleshooting

### Problem: "Memuat data..." terus menerus

**Solusi:**
1. Cek backend Railway masih online:
   ```bash
   curl https://web-production-32384.up.railway.app/api/sensor/latest
   ```
2. Cek browser console (F12) untuk error
3. Pastikan CORS enabled di backend

### Problem: Toggle heater tidak berfungsi

**Solusi:**
1. Cek network tab di browser (F12)
2. Lihat response dari POST /api/sensor/control
3. Cek backend logs di Railway

### Problem: Grafik kosong

**Solusi:**
1. Tunggu beberapa menit untuk data terkumpul
2. Cek ESP32 masih publish data
3. Cek MongoDB ada data

---

## 📊 API Endpoints yang Digunakan

### GET /api/sensor/latest
Fetch data sensor terbaru
```typescript
Response: {
  success: true,
  data: {
    device: "esp32_cabai_01",
    suhu: 27.8,
    heater: true,
    setpoint: 60
  }
}
```

### GET /api/sensor/esp32_cabai_01?limit=24
Fetch history 24 data terakhir
```typescript
Response: {
  success: true,
  data: [
    {
      suhu: 27.8,
      createdAt: "2026-05-19T14:45:58.139Z"
    }
  ]
}
```

### POST /api/sensor/control
Kirim kontrol heater
```typescript
Body: {
  mode: "MANUAL",
  heater: true
}

Response: {
  success: true,
  message: "Kontrol relay berhasil dikirim"
}
```

### POST /api/sensor/setpoint
Set target suhu
```typescript
Body: {
  setpoint: 60
}

Response: {
  success: true,
  message: "Setpoint berhasil diatur"
}
```

---

## ✅ Checklist

- [x] Connect ke backend Railway
- [x] Fetch data real-time
- [x] Display suhu di gauge
- [x] Toggle heater ON/OFF
- [x] Set target suhu
- [x] Display grafik history
- [x] Auto refresh setiap 5 detik
- [x] Error handling
- [x] Loading state
- [x] Tampilan tidak berubah

---

## 🎉 Selesai!

Web Javaherbal sekarang sudah terhubung dengan backend Railway dan bisa kontrol heater secara manual!

**Selamat menggunakan!** 🌶️
