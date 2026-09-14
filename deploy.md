# Quick Deployment Commands

## Local Build & Test

```bash
# Install dependencies (first time only)
npm install

# Create production build
npm run build

# Test the build locally
npm run preview
```

## Git Deployment (Recommended)

```bash
# 1. Make your changes
# 2. Test locally
npm run build
npm run preview

# 3. Commit changes
git add .
git commit -m "Your commit message"

# 4. Push to GitHub
git push origin main

# 5. Hostbeak will auto-deploy (if Git integration is set up)
```

## Manual FTP Deployment

```bash
# 1. Build locally
npm run build

# 2. The 'dist' folder now contains your production files
# 3. Upload CONTENTS of 'dist' folder (not the folder itself) to:
#    - Hostbeak public_html folder (or your domain root)
#    - Using FTP client or cPanel File Manager

# Files to upload from dist/:
# - index.html
# - assets/ (folder)
# - favicon.svg
# - robots.txt
# - sitemap.xml
# - .htaccess
# - All other files and folders
```

## Environment Variables

Create `.env.production` locally (DON'T commit):

```env
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_anon_key
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_key
VITE_APP_URL=https://yourdomain.com
```

## Post-Deployment Checklist

- [ ] Website loads
- [ ] All routes work (/, /about, /services, /contact, /admin)
- [ ] Images display
- [ ] Contact form submits
- [ ] Admin login works
- [ ] SSL is active (https://)
- [ ] Mobile responsive
- [ ] Google Map shows on contact page

## Troubleshooting

**Routes return 404:**
- Check `.htaccess` file is uploaded
- Verify Apache mod_rewrite is enabled

**Environment variables not working:**
- Rebuild after changing env vars
- Variables are compiled at build time

**Images not loading:**
- Check file paths
- Verify upload completed
- Check file permissions (644)

## Quick Commands Reference

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Create production build
npm run preview      # Preview production build locally

# Git
git status          # Check changes
git add .           # Stage all changes
git commit -m "msg" # Commit changes
git push origin main # Push to GitHub
```

## Support

See `HOSTBEAK_DEPLOYMENT.md` for complete deployment guide.
