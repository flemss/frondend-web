# 🚀 Deploy Web Javaherbal ke Vercel

## ✅ Persiapan Selesai!

File-file yang sudah disiapkan:
- ✅ `.gitignore` - Exclude node_modules, dist, .env
- ✅ `vercel.json` - Konfigurasi Vercel
- ✅ `package.json` - Script build sudah ada

---

## 📋 LANGKAH-LANGKAH DEPLOY

### 1️⃣ Push ke GitHub

#### A. Buat Repository Baru di GitHub
1. Buka https://github.com
2. Klik tombol **"New"** (repository baru)
3. Isi:
   - Repository name: `frondend-web`
   - Description: `Web dashboard untuk sistem pengeringan cabai jawa`
   - Visibility: **Public** atau **Private**
4. **JANGAN** centang "Add a README file"
5. Klik **"Create repository"**

#### B. Push Code ke GitHub
```bash
cd javaherbal-v2/javaherbal2

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Web Javaherbal"

# Add remote
git remote add origin https://github.com/flemss/frondend-web.git

# Push
git branch -M main
git push -u origin main
```

---

### 2️⃣ Deploy ke Vercel

#### A. Buka Vercel
1. Buka https://vercel.com
2. Klik **"Sign Up"** atau **"Login"**
3. Login dengan **GitHub**

#### B. Import Project
1. Klik **"Add New..."** → **"Project"**
2. Pilih **"Import Git Repository"**
3. Cari repository **"frondend-web"**
4. Klik **"Import"**

#### C. Configure Project
1. **Project Name:** `frondend-web` (atau nama lain)
2. **Framework Preset:** Vercel akan auto-detect **Vite**
3. **Root Directory:** `./` (default)
4. **Build Command:** `npm run build` (auto-filled)
5. **Output Directory:** `dist` (auto-filled)
6. **Install Command:** `npm install` (auto-filled)

#### D. Environment Variables (Opsional)
Jika ada environment variables, tambahkan di sini.
Untuk saat ini, tidak perlu karena API_URL sudah hardcoded.

#### E. Deploy!
1. Klik **"Deploy"**
2. Tunggu 1-2 menit
3. **Selesai!** 🎉

---

## 🌐 URL VERCEL

Setelah deploy selesai, Vercel akan memberikan URL seperti:
```
https://frondend-web.vercel.app
```

atau

```
https://frondend-web-flemss.vercel.app
```

---

## 🧪 TESTING

### 1. Buka URL Vercel
```
https://frondend-web.vercel.app
```

### 2. Test Register
1. Klik "Daftar di sini"
2. Isi form registrasi
3. Klik "Daftar"
4. **Expected:** Alert "Registrasi berhasil!" → Redirect ke login

### 3. Test Login
1. Isi form login
2. Klik "Masuk"
3. **Expected:** Redirect ke beranda
4. **Expected:** Floating stat suhu muncul

### 4. Test Control Panel
1. Klik menu "Control"
2. **Expected:** Panel kontrol muncul
3. **Expected:** Data suhu real-time
4. **Expected:** Toggle heater berfungsi

---

## 🔄 UPDATE WEB

Setiap kali ada perubahan code:

```bash
cd javaherbal-v2/javaherbal2

# Add changes
git add .

# Commit
git commit -m "Update: deskripsi perubahan"

# Push
git push origin main
```

**Vercel akan otomatis:**
- Detect perubahan di GitHub
- Build ulang
- Deploy versi baru
- Zero downtime!

---

## ⚙️ CUSTOM DOMAIN (Opsional)

Jika ingin pakai domain sendiri (contoh: `javaherbal.com`):

### 1. Beli Domain
- Namecheap, GoDaddy, Niagahoster, dll

### 2. Tambah Domain di Vercel
1. Buka project di Vercel dashboard
2. Klik tab **"Settings"**
3. Klik **"Domains"**
4. Klik **"Add"**
5. Masukkan domain Anda
6. Follow instruksi untuk update DNS

### 3. Update DNS
Di provider domain Anda, tambahkan record:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

Tunggu 5-60 menit untuk propagasi DNS.

---

## 🔐 ENVIRONMENT VARIABLES (Jika Diperlukan)

Jika ingin API_URL bisa diubah tanpa rebuild:

### 1. Buat file `.env.production`
```bash
VITE_API_URL=https://web-production-32384.up.railway.app/api
```

### 2. Update code untuk pakai env variable
```typescript
// Sebelum
const API_URL = 'https://web-production-32384.up.railway.app/api'

// Sesudah
const API_URL = import.meta.env.VITE_API_URL || 'https://web-production-32384.up.railway.app/api'
```

### 3. Set di Vercel Dashboard
1. Buka project di Vercel
2. Klik tab **"Settings"**
3. Klik **"Environment Variables"**
4. Tambah:
   - Key: `VITE_API_URL`
   - Value: `https://web-production-32384.up.railway.app/api`
5. Save

### 4. Redeploy
Vercel akan auto redeploy dengan env variable baru.

---

## 📊 MONITORING

### Vercel Dashboard
https://vercel.com/dashboard

**Fitur:**
- ✅ Deployment history
- ✅ Build logs
- ✅ Analytics (traffic, performance)
- ✅ Error tracking
- ✅ Custom domains
- ✅ Environment variables

---

## 🔍 TROUBLESHOOTING

### Problem: Build Failed

**Solusi:**
1. Cek build logs di Vercel dashboard
2. Test build lokal:
   ```bash
   npm run build
   ```
3. Fix error yang muncul
4. Push lagi ke GitHub

### Problem: 404 Not Found

**Solusi:**
1. Pastikan `vercel.json` ada dan benar
2. Pastikan rewrites sudah diset untuk SPA routing
3. Redeploy

### Problem: API Not Working

**Solusi:**
1. Cek backend Railway masih online
2. Cek CORS di backend
3. Cek API_URL di code
4. Cek browser console untuk error

---

## ✅ CHECKLIST

### Sebelum Deploy:
- [x] `.gitignore` sudah dibuat
- [x] `vercel.json` sudah dibuat
- [x] `package.json` script build ada
- [x] API_URL sudah diset ke Railway
- [ ] Test build lokal (`npm run build`)
- [ ] Push ke GitHub

### Setelah Deploy:
- [ ] URL Vercel bisa diakses
- [ ] Register berfungsi
- [ ] Login berfungsi
- [ ] Control panel berfungsi
- [ ] Data real-time muncul

---

## 🎉 SELESAI!

Web Javaherbal sekarang online di Vercel!

**Keuntungan:**
- ✅ Gratis unlimited
- ✅ Auto deploy dari GitHub
- ✅ HTTPS otomatis
- ✅ CDN global (cepat)
- ✅ Zero downtime deployment
- ✅ Custom domain support

**Selamat! Web Anda sekarang production-ready!** 🚀

---

## 📞 SUPPORT

### Vercel Documentation
https://vercel.com/docs

### Vite Documentation
https://vitejs.dev/guide/

### React Router Documentation
https://reactrouter.com/

---

**Created:** May 21, 2026  
**Status:** ✅ Ready to Deploy
