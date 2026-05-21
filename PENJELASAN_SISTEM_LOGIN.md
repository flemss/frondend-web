# 📚 Penjelasan Sistem Login Web Javaherbal

## 🔐 Sistem Penyimpanan Akun

Web Javaherbal menggunakan **localStorage** browser untuk menyimpan data akun dan status login.

---

## 📦 Apa itu localStorage?

**localStorage** adalah fitur browser yang memungkinkan website menyimpan data di komputer user secara permanen (tidak hilang saat browser ditutup).

### Karakteristik localStorage:
- ✅ Data disimpan di **browser user** (bukan di server)
- ✅ Data **tidak hilang** saat browser ditutup
- ✅ Data **tetap ada** sampai dihapus manual
- ✅ Kapasitas: ~5-10 MB per domain
- ✅ Format: Key-Value (string)
- ❌ **TIDAK AMAN** untuk data sensitif (password terlihat plain text)

---

## 🔄 Alur Sistem Login

### 1️⃣ REGISTRASI (Register)

**File:** `src/pages/Register.tsx`

#### Langkah-langkah:
1. User mengisi form:
   - Nama lengkap
   - Email
   - Password (minimal 6 karakter)
   - Konfirmasi password

2. Validasi:
   ```typescript
   // Cek password cocok
   if (password !== confirmPassword) {
     setError('Password tidak cocok')
     return
   }
   
   // Cek panjang password
   if (password.length < 6) {
     setError('Password minimal 6 karakter')
     return
   }
   
   // Cek email sudah terdaftar
   const users = JSON.parse(localStorage.getItem('users') || '[]')
   if (users.find((u: any) => u.email === email)) {
     setError('Email sudah terdaftar')
     return
   }
   ```

3. Simpan ke localStorage:
   ```typescript
   // Buat user baru
   const newUser = { name, email, password }
   
   // Ambil array users yang sudah ada
   const users = JSON.parse(localStorage.getItem('users') || '[]')
   
   // Tambahkan user baru
   users.push(newUser)
   
   // Simpan kembali ke localStorage
   localStorage.setItem('users', JSON.stringify(users))
   ```

4. Redirect ke halaman login

#### Contoh Data di localStorage:
```json
{
  "users": [
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "123456"
    },
    {
      "name": "Jane Smith",
      "email": "jane@example.com",
      "password": "password123"
    }
  ]
}
```

---

### 2️⃣ LOGIN

**File:** `src/pages/Login.tsx`

#### Langkah-langkah:
1. User mengisi form:
   - Email
   - Password

2. Validasi:
   ```typescript
   // Ambil semua users dari localStorage
   const users = JSON.parse(localStorage.getItem('users') || '[]')
   
   // Cari user dengan email dan password yang cocok
   const user = users.find((u: any) => 
     u.email === email && u.password === password
   )
   
   if (user) {
     // Login berhasil
     localStorage.setItem('isAuthenticated', 'true')
     localStorage.setItem('currentUser', JSON.stringify(user))
     navigate('/')
   } else {
     // Login gagal
     setError('Email atau password salah')
   }
   ```

3. Jika berhasil:
   - Set `isAuthenticated` = `'true'`
   - Simpan data user ke `currentUser`
   - Redirect ke halaman beranda

#### Data di localStorage Setelah Login:
```json
{
  "users": [...],
  "isAuthenticated": "true",
  "currentUser": {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "123456"
  }
}
```

---

### 3️⃣ CEK STATUS LOGIN

**File:** `src/components/ProtectedRoute.tsx`

#### Cara Kerja:
```typescript
const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

if (!isAuthenticated) {
  // Redirect ke login
  return <Navigate to="/login" replace />
}

// Tampilkan halaman yang dilindungi
return <>{children}</>
```

#### Penggunaan:
```tsx
// Halaman yang perlu login
<Route
  path="/control"
  element={
    <ProtectedRoute>
      <Control />
    </ProtectedRoute>
  }
/>
```

---

### 4️⃣ LOGOUT

**File:** `src/components/Navbar.tsx` (kemungkinan)

#### Cara Kerja:
```typescript
function handleLogout() {
  // Hapus status login
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('currentUser')
  
  // Redirect ke login
  navigate('/login')
}
```

---

## 📊 Struktur Data di localStorage

### Key-Value Pairs:

| Key | Value | Deskripsi |
|-----|-------|-----------|
| `users` | `[{name, email, password}, ...]` | Array semua user yang terdaftar |
| `isAuthenticated` | `'true'` atau `'false'` | Status login user saat ini |
| `currentUser` | `{name, email, password}` | Data user yang sedang login |

### Contoh Lengkap:
```json
{
  "users": [
    {
      "name": "Admin",
      "email": "admin@javaherbal.com",
      "password": "admin123"
    },
    {
      "name": "User Test",
      "email": "test@example.com",
      "password": "test123"
    }
  ],
  "isAuthenticated": "true",
  "currentUser": {
    "name": "Admin",
    "email": "admin@javaherbal.com",
    "password": "admin123"
  }
}
```

---

## 🔍 Cara Lihat Data di Browser

### Chrome / Edge:
1. Buka web di browser
2. Tekan **F12** (Developer Tools)
3. Klik tab **Application**
4. Di sidebar kiri, klik **Local Storage**
5. Pilih domain web (contoh: `http://localhost:5173`)
6. Lihat semua key-value yang tersimpan

### Firefox:
1. Buka web di browser
2. Tekan **F12** (Developer Tools)
3. Klik tab **Storage**
4. Di sidebar kiri, klik **Local Storage**
5. Pilih domain web
6. Lihat semua key-value yang tersimpan

---

## ⚠️ KELEMAHAN SISTEM INI

### 1. **Password Tidak Terenkripsi**
```json
{
  "password": "123456"  // ❌ Plain text, bisa dilihat siapa saja!
}
```

**Solusi:**
- Gunakan hashing (bcrypt, SHA-256)
- Simpan password di backend, bukan localStorage

### 2. **Data Bisa Dihapus User**
User bisa hapus localStorage via Developer Tools → semua akun hilang!

**Solusi:**
- Simpan data di backend (database)
- localStorage hanya untuk token/session

### 3. **Tidak Aman untuk Production**
localStorage bisa diakses oleh JavaScript → rentan XSS attack

**Solusi:**
- Gunakan backend API untuk autentikasi
- Simpan token di httpOnly cookie
- Implementasi JWT (JSON Web Token)

### 4. **Data Lokal per Browser**
Akun di Chrome tidak bisa diakses di Firefox (data terpisah)

**Solusi:**
- Gunakan backend database (MongoDB, PostgreSQL)
- Sinkronisasi data via API

---

## 🚀 REKOMENDASI UNTUK PRODUCTION

### Sistem Login yang Aman:

#### 1. **Backend API**
```
Frontend (React) → Backend API (Express) → Database (MongoDB)
```

#### 2. **Registrasi:**
```typescript
// Frontend
const response = await fetch('/api/auth/register', {
  method: 'POST',
  body: JSON.stringify({ name, email, password })
})

// Backend
const hashedPassword = await bcrypt.hash(password, 10)
await User.create({ name, email, password: hashedPassword })
```

#### 3. **Login:**
```typescript
// Frontend
const response = await fetch('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password })
})
const { token } = await response.json()
localStorage.setItem('token', token)

// Backend
const user = await User.findOne({ email })
const isValid = await bcrypt.compare(password, user.password)
if (isValid) {
  const token = jwt.sign({ userId: user._id }, SECRET_KEY)
  return { token }
}
```

#### 4. **Protected Routes:**
```typescript
// Frontend
const token = localStorage.getItem('token')
const response = await fetch('/api/protected', {
  headers: { 'Authorization': `Bearer ${token}` }
})

// Backend
const token = req.headers.authorization?.split(' ')[1]
const decoded = jwt.verify(token, SECRET_KEY)
const user = await User.findById(decoded.userId)
```

---

## 📝 KESIMPULAN

### Sistem Saat Ini (localStorage):
- ✅ **Kelebihan:**
  - Mudah implementasi
  - Tidak perlu backend
  - Cocok untuk prototype/demo
  - Cepat

- ❌ **Kekurangan:**
  - Tidak aman (password plain text)
  - Data lokal (tidak sinkron antar device)
  - Bisa dihapus user
  - Tidak cocok untuk production

### Untuk Production:
- ✅ Gunakan backend API (Express + MongoDB)
- ✅ Hash password (bcrypt)
- ✅ Gunakan JWT untuk token
- ✅ Simpan token di httpOnly cookie
- ✅ Implementasi refresh token
- ✅ Rate limiting untuk prevent brute force
- ✅ HTTPS untuk enkripsi data

---

## 🎯 NEXT STEPS

Jika ingin upgrade ke sistem yang lebih aman:

1. **Buat Backend API untuk Auth**
   - Endpoint: `/api/auth/register`
   - Endpoint: `/api/auth/login`
   - Endpoint: `/api/auth/logout`
   - Endpoint: `/api/auth/me` (get current user)

2. **Gunakan MongoDB untuk Simpan User**
   - Collection: `users`
   - Schema: `{ name, email, password (hashed), createdAt }`

3. **Implementasi JWT**
   - Generate token saat login
   - Verify token di protected routes
   - Refresh token untuk extend session

4. **Update Frontend**
   - Ganti localStorage dengan API calls
   - Simpan hanya token (bukan password)
   - Handle token expiration

---

**Untuk saat ini, sistem localStorage sudah cukup untuk development/testing, tapi TIDAK AMAN untuk production!** 🔒
