# 🛒 Mega Bozor — Eng Yirik Onlayn Bozor

**Loyiha muallifi:** Suhrobbek Qayumov

O'zbekistonning eng mukammal va eng zamonaviy onlayn bozor sayti. Premium dizayn, Google bilan kirish, to'liq admin panel va kuchli funksionallik.

## ✨ Xususiyatlar

- 🎨 **Premium dizayn** — qora-to'q sariq gradient, animatsiyalar, glassmorphism
- 🔐 **Google Sign-In** (GIS) — xavfsiz autentifikatsiya
- 🛍️ **Mahsulot katalogi** — kategoriyalar, filtrlar, qidiruv
- 🛒 **Savat tizimi** — drawer, localStorage, real-time
- 📊 **Admin Panel** — Dashboard, Mahsulotlar, Buyurtmalar, Foydalanuvchilar, Analitika, Sozlamalar
- 📈 **Analitika diagrammalari** — haftalik savdo, top kategoriyalar
- 📱 **To'liq responsiv** — mobile-first
- ⚡ **Tez** — pure HTML/CSS/JS, build-siz

## 📁 Tuzilishi

```
megabozor/
├── index.html              ← Bosh sahifa
├── css/style.css           ← Dizayn tizimi
├── js/
│   ├── data.js             ← Mahsulotlar bazasi
│   ├── auth.js             ← Google Sign-In
│   └── app.js              ← Asosiy mantiq
└── admin/
    ├── index.html          ← Admin panel
    ├── admin.css           ← Admin uslublari
    └── admin.js            ← Admin mantiq
```

## 🚀 Ishga tushirish

1. ZIP faylni oching
2. `index.html` ni brauzerda oching (yoki `python3 -m http.server` orqali server)
3. **Demo rejim** avtomatik ishlaydi — "Google bilan kirish" tugmasi sizni demo admin sifatida kiritadi

## 🔑 Google Sign-In sozlash (real ishlatish uchun)

1. https://console.cloud.google.com/apis/credentials saytiga kiring
2. **OAuth 2.0 Client ID** yarating (Web application)
3. Authorized origins ga sayt domainingizni qo'shing
4. `js/auth.js` faylida `GOOGLE_CLIENT_ID` o'zgaruvchisiga Client ID'ni joylashtiring
5. `ADMIN_EMAILS` ro'yxatiga admin huquqi beriladigan emaillarni qo'shing

```js
const GOOGLE_CLIENT_ID = "1234567890-xxxx.apps.googleusercontent.com";
const ADMIN_EMAILS = ["suhrobbek.qayumov@gmail.com"];
```

## 👤 Admin Panelga kirish

`/admin/index.html` manziliga o'ting va admin huquqiga ega Google akkaunti bilan kiring.

---

© 2026 **Suhrobbek Qayumov** — Mega Bozor
