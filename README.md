# Friscon Tech Limited

Professional Nigeria market entry services website with full-stack CMS.

## 🚀 Live Site

Deployed on Vercel: [Coming Soon]

## 🏗️ Tech Stack

- **Frontend:** React 18 + Vite 8 + TypeScript
- **Routing:** TanStack Router (client-side)
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Storage:** Supabase Storage
- **Deployment:** Vercel
- **UI Components:** shadcn/ui + Radix UI

## ✨ Features

- **Public Website**
  - Home, About, Services, Contact pages
  - Google Maps integration
  - Contact form with Supabase backend
  - SEO optimized (sitemap, meta tags, Lagos localization)
  - Responsive design
  - Smooth animations

- **Admin Dashboard**
  - Secure authentication with rate limiting (5 attempts, 2-hour cooldown)
  - Content management (hero, stats, testimonials)
  - Service management (CRUD operations)
  - Team member management with image uploads
  - Enquiry management
  - Real-time updates via Supabase

## 🚀 Quick Deploy to Vercel

See **[DEPLOY_QUICK.md](./DEPLOY_QUICK.md)** for 5-minute deployment guide.

For detailed instructions, see **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)**.

## 💻 Local Development

### Prerequisites
- Node.js 18+ ([install with nvm](https://github.com/nvm-sh/nvm))
- npm or yarn
- Supabase account

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd pixel-perfect-clone-main
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

4. **Set up Supabase database**
- Run SQL from `schema.sql` in Supabase SQL Editor
- Run SQL from `storage-setup.sql` for storage buckets
- Optionally run `cleanup.sql` to clear test data

5. **Start development server**
```bash
npm run dev
```

Visit: `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

Output: `dist/` directory

## 📁 Project Structure

```
pixel-perfect-clone-main/
├── src/
│   ├── routes/              # Page routes (TanStack Router)
│   │   ├── index.tsx        # Home page
│   │   ├── about.tsx        # About page
│   │   ├── services.tsx     # Services page
│   │   ├── contact.tsx      # Contact page
│   │   ├── admin.*.tsx      # Admin dashboard routes
│   │   └── __root.tsx       # Root layout
│   ├── components/          # React components
│   │   ├── site.tsx         # Header, Footer, etc.
│   │   ├── AdminLayout.tsx  # Admin dashboard layout
│   │   └── ui/              # shadcn/ui components
│   ├── lib/                 # Utilities
│   │   ├── supabase.ts      # Supabase client
│   │   ├── auth-context.tsx # Auth provider
│   │   └── utils.ts         # Helper functions
│   └── styles.css           # Global styles
├── public/                  # Static assets
├── vercel.json              # Vercel configuration
├── schema.sql               # Database schema
├── storage-setup.sql        # Storage bucket setup
└── README.md
```

## 🔐 Admin Access

**Login:** `/admin/login`

**Features:**
- Rate limiting: Max 5 failed attempts, 2-hour cooldown
- Password reveal/hide toggle
- Session management
- Protected routes

**Admin Routes:**
- `/admin/dashboard` - Overview
- `/admin/content` - Homepage content
- `/admin/services` - Service management
- `/admin/team` - Team member management
- `/admin/testimonials` - Testimonial management
- `/admin/enquiries` - Contact form submissions

## 📚 Documentation

- **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)** - Complete Vercel deployment guide
- **[DEPLOY_QUICK.md](./DEPLOY_QUICK.md)** - Quick deployment reference
- **[MIGRATION_COMPLETE.md](./MIGRATION_COMPLETE.md)** - TanStack Start → Vite migration details
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Common issues and fixes
- **[404_ERRORS_EXPLAINED.md](./404_ERRORS_EXPLAINED.md)** - About harmless 404 errors
- **[ADMIN_REDESIGN_COMPLETE.md](./ADMIN_REDESIGN_COMPLETE.md)** - Admin dashboard design system
- **[SEO_IMPLEMENTATION.md](./SEO_IMPLEMENTATION.md)** - SEO features
- **[DOCS_INDEX.md](./DOCS_INDEX.md)** - Complete documentation index

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🌐 Environment Variables

Required for deployment:

| Variable | Description | Where to find |
|----------|-------------|---------------|
| `VITE_SUPABASE_URL` | Supabase project URL | Supabase Dashboard → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Supabase Dashboard → Settings → API |

## 📦 Key Dependencies

- React 18.3.1
- Vite 8.1.5
- TanStack Router 1.95.0
- TanStack Query 5.66.1
- Supabase JS 2.48.1
- Tailwind CSS 3.4.17
- Lucide React 0.474.0
- Framer Motion 11.18.0

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Push to GitHub
4. Vercel creates preview deployment automatically
5. Review and merge

## 📄 License

[Your License Here]

## 🆘 Support

For issues or questions:
- Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- Review [documentation index](./DOCS_INDEX.md)
- Check Vercel deployment logs
- Review Supabase dashboard

---

**Built with ❤️ for Friscon Tech Limited**
