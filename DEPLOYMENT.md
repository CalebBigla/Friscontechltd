# Deployment Guide

## Quick Deploy to Render

### 1. Environment Variables

Add these in Render Dashboard → Environment:

```
VITE_SUPABASE_URL=https://raodhtzusukrybquvhdy.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhb2RodHp1c3VrcnlicXV2aGR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzMzU4MjksImV4cCI6MjEwNDkxMTgyOX0.fgdY1xEXa1ougWYbD0cBhhf0ofuqz06JiaXSCQH1pSc
VITE_WEB3FORMS_ACCESS_KEY=your-web3forms-key
```

### 2. Redirect Rule

In Render Dashboard → Redirects/Rewrites:

```
Source:      /:path*
Destination: /
Action:      Rewrite
```

### 3. Supabase Configuration

In Supabase Dashboard → Authentication → URL Configuration:

Add to Redirect URLs:
```
https://friscontechltd.onrender.com/**
```

## That's It!

Your site will auto-deploy on every push to GitHub.

**Live URL:** https://friscontechltd.onrender.com
