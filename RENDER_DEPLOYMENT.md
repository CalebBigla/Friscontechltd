# 🚀 Render Deployment Guide - Friscon Tech Website

## Overview

This guide walks you through deploying your Friscon Tech website to Render as a static site with automatic builds from your Git repository.

---

## Prerequisites

- [ ] Render account ([sign up free](https://render.com))
- [ ] GitHub/GitLab account with your repository
- [ ] Supabase project with credentials
- [ ] Web3Forms access key (for contact form)

---

## Deployment Steps

### Step 1: Push Your Code to Git

If you haven't already pushed your code to GitHub:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for Render deployment"

# Add remote (replace with your GitHub repo URL)
git remote add origin https://github.com/yourusername/friscon-tech.git

# Push
git push -u origin main
```

### Step 2: Create New Static Site on Render

1. **Log in to Render Dashboard**
   - Go to [https://dashboard.render.com](https://dashboard.render.com)
   - Sign in or create a new account

2. **Create New Static Site**
   - Click **"New +"** button
   - Select **"Static Site"**

3. **Connect Your Repository**
   - Choose **GitHub** or **GitLab**
   - Authorize Render to access your repositories
   - Select your `friscon-tech` repository

### Step 3: Configure Build Settings

Fill in the following settings:

| Setting | Value |
|---------|-------|
| **Name** | `friscon-tech-website` (or your preferred name) |
| **Branch** | `main` |
| **Root Directory** | Leave blank (or `.` if required) |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

### Step 4: Add Environment Variables

Click **"Advanced"** and add these environment variables:

```env
VITE_SUPABASE_URL=your-supabase-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_WEB3FORMS_ACCESS_KEY=your-web3forms-key
```

**Where to find these:**
- **Supabase URL & Key:** Supabase Dashboard → Project Settings → API
- **Web3Forms Key:** Your Web3Forms account

### Step 5: Deploy

1. Click **"Create Static Site"**
2. Render will automatically:
   - Clone your repository
   - Install dependencies
   - Build your project
   - Deploy to a global CDN

**First deployment takes 2-5 minutes.**

---

## Post-Deployment Configuration

### Custom Domain (Optional)

1. In Render Dashboard, go to your static site
2. Navigate to **"Settings"** → **"Custom Domains"**
3. Click **"Add Custom Domain"**
4. Enter your domain (e.g., `friscontech.com`)
5. Follow DNS configuration instructions:
   - Add CNAME record pointing to your Render URL
   - Wait for DNS propagation (5-60 minutes)

### SSL Certificate

- Render provides **free automatic SSL** for all sites
- SSL certificates are auto-provisioned when you add a custom domain
- No configuration needed!

---

## Automatic Deployments

Render automatically deploys when you push to your repository:

```bash
# Make changes to your code
git add .
git commit -m "Update homepage content"
git push origin main

# Render detects the push and automatically rebuilds
```

**Deployment triggers:**
- Push to connected branch
- Pull request merge
- Manual deploy from dashboard

---

## Testing Your Deployment

After deployment completes, test these:

### Public Pages
- [ ] Homepage: `https://your-site.onrender.com/`
- [ ] About: `https://your-site.onrender.com/about`
- [ ] Services: `https://your-site.onrender.com/services`
- [ ] Contact: `https://your-site.onrender.com/contact`
- [ ] Privacy Policy: `https://your-site.onrender.com/privacy-policy`
- [ ] Terms: `https://your-site.onrender.com/terms-of-use`

### Admin Dashboard
- [ ] Admin Login: `https://your-site.onrender.com/admin`
- [ ] Dashboard: `https://your-site.onrender.com/admin/dashboard`
- [ ] Content Management: `https://your-site.onrender.com/admin/content`
- [ ] Services Management: `https://your-site.onrender.com/admin/services`
- [ ] Team Management: `https://your-site.onrender.com/admin/team`

### Functionality Tests
- [ ] Contact form submission
- [ ] Admin login with Supabase auth
- [ ] Content updates from admin panel
- [ ] Image uploads (team members)
- [ ] All navigation links work
- [ ] Direct URL access (no 404s on refresh)

---

## Render Configuration File

This project includes `render.yaml` for infrastructure-as-code deployment:

```yaml
services:
  - type: web
    name: friscon-tech-website
    runtime: node
    plan: free
    buildCommand: npm install && npm run build
    staticPublishPath: ./dist
    envVars:
      - key: NODE_VERSION
        value: 18
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

**Benefits:**
- Version-controlled configuration
- Easy to replicate environment
- Consistent deployments across teams

---

## Troubleshooting

### Build Fails

**Error: `MODULE_NOT_FOUND`**
```bash
# Solution: Check that all dependencies are in package.json
npm install
npm run build  # Test locally first
```

**Error: `Out of memory`**
```bash
# Solution: Upgrade Render plan or optimize build
# For free tier, ensure build isn't too memory-intensive
```

### Environment Variables Not Working

**Symptoms:** Supabase not connecting, form not submitting

**Solutions:**
1. Check variable names start with `VITE_`
2. Verify values don't have extra spaces
3. Re-deploy after adding variables
4. Check Supabase RLS policies are configured

### Routes Return 404

**Symptom:** Direct URL access gives 404

**Solution:** 
- This is automatically handled by the `routes` section in `render.yaml`
- Ensure `staticPublishPath` is set to `./dist`
- All routes should rewrite to `/index.html`

### Slow Initial Load

**Cause:** Cold start on free tier

**Solutions:**
- Upgrade to paid plan for always-on service
- Accept 10-30s spin-up time on free tier
- Consider using Render's "Auto-Suspend" settings

---

## Render vs Other Platforms

| Feature | Render | Vercel | Netlify |
|---------|--------|--------|---------|
| **Free Tier** | ✅ 100GB bandwidth | ✅ 100GB bandwidth | ✅ 100GB bandwidth |
| **Auto Deploy** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Custom Domain** | ✅ Free SSL | ✅ Free SSL | ✅ Free SSL |
| **Build Minutes** | ✅ 500 min/month | ✅ 6000 min/month | ✅ 300 min/month |
| **SPA Routing** | ✅ Via config | ✅ Auto-detect | ✅ Auto-detect |
| **Cold Starts** | ⚠️ On free tier | ✅ None | ✅ None |

---

## Performance Optimization

### Enable Caching

Render automatically caches:
- Static assets (JS, CSS, images)
- HTML files with appropriate headers

### CDN Distribution

- Render uses global CDN
- Assets served from nearest edge location
- Optimal performance worldwide

### Build Optimization

Already configured in your project:
```json
{
  "build": {
    "outDir": "dist",
    "emptyOutDir": true
  }
}
```

---

## Monitoring & Logs

### View Build Logs

1. Go to Render Dashboard
2. Click on your static site
3. Click **"Logs"** tab
4. View real-time build and deploy logs

### Set Up Notifications

1. Go to **"Settings"** → **"Notifications"**
2. Add email or Slack webhook
3. Get notified on:
   - Successful deploys
   - Failed builds
   - Uptime issues

---

## Pricing (As of 2026)

### Free Tier
- ✅ 100 GB bandwidth/month
- ✅ 500 build minutes/month
- ✅ Automatic SSL
- ✅ Global CDN
- ⚠️ Services spin down after 15 min inactivity

### Paid Plans
- **Starter:** $7/month
  - Always on
  - Faster builds
  - Priority support

---

## Alternative: Deploy via CLI

### Install Render CLI

```bash
npm install -g @render/cli
```

### Deploy

```bash
# Login
render login

# Deploy
render deploy
```

---

## Support Resources

- **Render Docs:** [https://render.com/docs/static-sites](https://render.com/docs/static-sites)
- **Community Forum:** [https://community.render.com](https://community.render.com)
- **Status Page:** [https://status.render.com](https://status.render.com)

---

## Quick Command Reference

```bash
# Local development
npm run dev              # Start dev server

# Build and test
npm run build            # Create production build
npm run preview          # Test production build locally

# Git deployment
git add .
git commit -m "Update"
git push origin main     # Triggers auto-deploy on Render

# Troubleshooting
npm run build            # Test build locally first
```

---

## Security Checklist

- [ ] Environment variables set correctly
- [ ] Supabase RLS policies configured
- [ ] API keys are in environment variables (not hardcoded)
- [ ] HTTPS enabled (automatic on Render)
- [ ] CORS configured in Supabase for your domain
- [ ] Admin routes protected with authentication

---

## Success! 🎉

Once deployed, your site will be live at:

```
https://your-site-name.onrender.com
```

**Features Working:**
✅ React SPA with client-side routing  
✅ Supabase database integration  
✅ Admin dashboard with authentication  
✅ Contact form submissions  
✅ Image uploads and management  
✅ Automatic SSL certificate  
✅ Global CDN delivery  
✅ Auto-deploy on git push  

---

**Need Help?**

- Check Render build logs for errors
- Review environment variables
- Test build locally with `npm run build`
- See troubleshooting section above
- Contact Render support

**Deployment Status:** 🟢 READY TO DEPLOY

---

**Created:** September 15, 2026  
**Platform:** Render Static Sites  
**Stack:** React + Vite + Supabase + TanStack Router
