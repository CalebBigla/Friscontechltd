# Friscon Tech Limited

Modern business website built with React, Vite, and Supabase.

## Tech Stack

- **Frontend:** React 19 + Vite 8
- **Router:** TanStack Router
- **Styling:** Tailwind CSS 4
- **Backend:** Supabase (Database, Auth, Storage)
- **Forms:** Web3Forms

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### Environment Variables

Add these to your `.env` file:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_WEB3FORMS_ACCESS_KEY=your-web3forms-key
```

### Development

```bash
# Start dev server
npm run dev
```

Visit http://localhost:5173

### Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Deployment

### Deploy to Render

1. Push code to GitHub
2. Create a new Static Site on Render
3. Configure:
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
4. Add environment variables
5. Add redirect rule in Render dashboard:
   - Source: `/:path*`
   - Destination: `/`
   - Action: Rewrite

## Features

- ✅ Dynamic content management via Supabase
- ✅ Admin dashboard with authentication
- ✅ Contact form with Web3Forms
- ✅ Image upload and management
- ✅ Responsive design
- ✅ SEO optimized

## Project Structure

```
src/
├── components/     # Reusable components
├── lib/           # Utilities and config
├── routes/        # Page components
└── styles.css     # Global styles
```

## License

Private project - All rights reserved
