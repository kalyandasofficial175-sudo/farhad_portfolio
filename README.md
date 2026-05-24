# 🏛️ Political Portfolio – Next.js

A full-stack political portfolio website with a built-in CMS admin panel. Built with **Next.js 14**, **Tailwind CSS**, and file-based JSON storage.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# Portfolio: http://localhost:3000
# Admin CMS:  http://localhost:3000/admin
```

---

## 📁 Project Structure

```
political-portfolio/
├── app/
│   ├── page.jsx              # Portfolio (public view)
│   ├── layout.jsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── admin/
│   │   └── page.jsx          # CMS Admin Panel
│   └── api/portfolio/
│       └── route.js          # REST API (GET/POST)
├── components/
│   ├── Navbar.jsx            # Sticky navigation
│   ├── Hero.jsx              # Hero section
│   └── Sections.jsx          # Stats, Achievements, Policies, Timeline, Contact, Footer
├── data/
│   └── portfolio.json        # ← All your content lives here
└── public/                   # Static assets
```

---

## ✏️ How to Edit Content

### Option A – Admin Panel (Recommended)
1. Go to `http://localhost:3000/admin`
2. Edit any section using the forms
3. Click **Save Changes**
4. Visit the portfolio to see updates instantly

### Option B – Edit JSON Directly
Edit `data/portfolio.json` with any text editor. Changes appear on next page load.

---

## 🎨 Customization

| Setting | Where |
|---|---|
| Name, party, bio | Admin → Basic Info |
| Stats numbers | Admin → Statistics |
| Key achievements | Admin → Achievements |
| Policy agenda | Admin → Policies |
| Political journey | Admin → Timeline |
| Phone, email, address | Admin → Contact |
| Colors | Admin → Theme |
| Profile photo | Admin → Basic Info → Photo URL |

---

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```
> ⚠️ Note: File-based storage won't persist on serverless platforms. For production, replace `data/portfolio.json` with a database (MongoDB, Supabase, or Vercel KV).

### Self-hosted (VPS/Server)
```bash
npm run build
npm start
```
File-based storage works perfectly on a persistent server.

---

## 🔒 Securing the Admin Panel

Add authentication to protect `/admin`. Options:
- [NextAuth.js](https://next-auth.js.org/) — Full auth solution
- Simple password via middleware (`middleware.js`)
- Vercel deployment protection

### Quick password middleware example:
```js
// middleware.js (root of project)
import { NextResponse } from 'next/server'

export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const auth = request.headers.get('authorization')
    if (auth !== `Basic ${btoa('admin:yourpassword')}`) {
      return new NextResponse('Unauthorized', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Admin"' },
      })
    }
  }
}
export const config = { matcher: ['/admin/:path*'] }
```

---

## 📦 Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** (utility styling)
- **React 18** (UI)
- **File-based JSON** (data storage)
- **Google Fonts** – Playfair Display + Inter

---

Built for **Farhad Ali** political portfolio · 2026
