# 🚀 Vercel Deployment Guide

Complete guide to deploying Friscon Tech website to Vercel with custom domain DNS configuration.

---

## ✅ Why Vercel?

Vercel is **perfect** for your Vite + React SPA:
- ✅ **Zero configuration** - Detects Vite automatically
- ✅ **Free tier** - More than enough for your needs
- ✅ **Automatic SSL** - HTTPS for free
- ✅ **Global CDN** - Fast worldwide
- ✅ **SPA routing** - Handles client-side routes automatically
- ✅ **Environment variables** - Secure secret management
- ✅ **Git integration** - Auto-deploy on push
- ✅ **Preview deployments** - Test before production

---

## 📋 Prerequisites

Before deploying, ensure:
- [x] GitHub account (your code is already there)
- [ ] Vercel account (free - sign up at vercel.com)
- [ ] Access to your domain DNS settings (where you bought your domain)
- [x] Supabase credentials ready

---

## 🚀 Part 1: Deploy to Vercel

### Step 1: Sign Up for Vercel

1. Visit [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** (recommended)
4. Authorize Vercel to access your GitHub account

### Step 2: Import Your Project

1. On Vercel dashboard, click **"Add New..."** → **"Project"**
2. Find your repository: `pixel-perfect-clone-main` (or whatever you named it)
3. Click **"Import"**

### Step 3: Configure Build Settings

Vercel will auto-detect your settings. Verify these:

```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

**✅ These should already be correct!** Our `vercel.json` handles everything.

### Step 4: Add Environment Variables

Click **"Environment Variables"** and add:

| Name | Value | Where to find |
|------|-------|---------------|
| `VITE_SUPABASE_URL` | `https://xxxxx.supabase.co` | Supabase Dashboard → Project Settings → API |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGc...` | Supabase Dashboard → Project Settings → API |

**Important:** 
- Use `VITE_` prefix (already correct)
- These are safe to expose (they're public keys)
- Apply to **All environments** (Production, Preview, Development)

### Step 5: Deploy!

1. Click **"Deploy"**
2. Wait 1-2 minutes for build
3. 🎉 Your site is live at `https://your-project.vercel.app`

---

## 🌐 Part 2: Custom Domain Setup

### Option A: Domain Bought Through Another Provider (Namecheap, GoDaddy, etc.)

#### Step 1: Add Domain in Vercel

1. Go to your Vercel project dashboard
2. Click **"Settings"** → **"Domains"**
3. Enter your domain: `friscontech.com`
4. Click **"Add"**

#### Step 2: Vercel Shows DNS Records

Vercel will show you DNS records to add. You'll see something like:

**For root domain (friscontech.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### Step 3: Configure DNS Provider

Go to where you bought your domain (Namecheap, GoDaddy, etc.):

1. Log in to your domain registrar
2. Find **DNS Settings** or **DNS Management**
3. Add/update these records:

**A Record (for root domain):**
```
Type: A
Host: @ (or leave blank)
Value: 76.76.21.21 (use the IP Vercel shows you)
TTL: 3600 (or automatic)
```

**CNAME Record (for www):**
```
Type: CNAME
Host: www
Value: cname.vercel-dns.com (use what Vercel shows you)
TTL: 3600 (or automatic)
```

**⚠️ Important:** 
- Delete any conflicting A or CNAME records for @ and www
- Some providers use `@` for root, others use blank/empty
- Copy the EXACT values Vercel shows you (might be different)

#### Step 4: Wait for DNS Propagation

- DNS changes take **10 minutes to 48 hours** to propagate
- Usually works within **30 minutes to 2 hours**
- Check status at [whatsmydns.net](https://www.whatsmydns.net)

#### Step 5: Verify in Vercel

1. Back in Vercel, wait for the domain status to show **"Valid Configuration"**
2. Vercel will automatically provision SSL certificate
3. Your site will be live at `https://friscontech.com` ✅

---

### Option B: Use Vercel Nameservers (Recommended for Best Performance)

This gives you better performance and easier management.

#### Step 1: Add Domain in Vercel
Same as Option A above.

#### Step 2: Get Vercel Nameservers
Vercel will show nameservers like:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

#### Step 3: Update at Domain Registrar
1. Log in to where you bought the domain
2. Find **Nameserver Settings** (different from DNS settings)
3. Change from current nameservers to Vercel's nameservers
4. Save changes

#### Step 4: Wait & Verify
- Nameserver changes take **24-48 hours** to fully propagate
- Once propagated, all DNS is managed by Vercel
- SSL automatically provisioned

---

## 🔧 Part 3: Verify Deployment

### Check These After Deployment

#### 1. Homepage Loads
Visit: `https://friscontech.com` (or your Vercel URL)
- [ ] Page loads
- [ ] Content displays (not blank)
- [ ] Images load

#### 2. All Routes Work
Test direct navigation:
- [ ] `https://friscontech.com/about`
- [ ] `https://friscontech.com/services`
- [ ] `https://friscontech.com/contact`
- [ ] `https://friscontech.com/admin`

**Expected:** All pages load correctly (no 404)

#### 3. Admin Login Works
- [ ] Visit `/admin`
- [ ] Redirects to `/admin/login`
- [ ] Enter credentials
- [ ] Login succeeds
- [ ] Dashboard loads

**If login fails:** Check environment variables in Vercel

#### 4. CMS Content Displays
- [ ] Homepage shows statistics
- [ ] Services page shows services from Supabase
- [ ] About page shows team members
- [ ] Testimonials appear

**If content missing:** Check Supabase connection

#### 5. Contact Form Works
- [ ] Fill out form
- [ ] Submit
- [ ] Success message appears
- [ ] Check Supabase `enquiries` table for new entry

#### 6. Image Uploads Work
- [ ] Go to `/admin/team`
- [ ] Try uploading an image
- [ ] Image saves and displays

**If fails:** Check Supabase storage permissions

---

## 🔄 Part 4: Continuous Deployment

Once connected to GitHub, every push triggers a new deployment:

```bash
# Make changes locally
git add .
git commit -m "Update homepage content"
git push origin main

# Vercel automatically:
# 1. Detects the push
# 2. Runs npm run build
# 3. Deploys new version
# 4. Updates your live site
```

### Preview Deployments

Every branch and PR gets a preview URL:

```bash
# Create feature branch
git checkout -b feature/new-service
# Make changes, commit, push
git push origin feature/new-service

# Vercel creates preview URL:
# https://your-project-git-feature-new-service.vercel.app
```

Test changes before merging to production!

---

## 🛠️ Troubleshooting

### Issue: "Domain is not configured correctly"

**Solution:**
1. Verify DNS records match EXACTLY what Vercel shows
2. Wait at least 30 minutes for DNS propagation
3. Check [whatsmydns.net](https://www.whatsmydns.net) to see if DNS has propagated worldwide

### Issue: Blank page after deployment

**Check:**
1. Vercel dashboard → Deployment logs for errors
2. Browser console (F12) for JavaScript errors
3. Environment variables are set correctly
4. Build succeeded (green checkmark in Vercel)

**Fix:**
- Add missing environment variables
- Redeploy: Deployments tab → Click "..." → "Redeploy"

### Issue: 404 on routes like /about

**Check:**
- `vercel.json` exists in your repository root
- `vercel.json` has the `rewrites` configuration

**Fix:**
- Ensure `vercel.json` is committed to Git
- Push changes
- Redeploy

### Issue: Admin login fails

**Check:**
1. Vercel Dashboard → Settings → Environment Variables
2. Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
3. Values match your Supabase project

**Fix:**
- Add/correct environment variables
- Redeploy for changes to take effect

### Issue: Images not loading

**Check:**
1. Supabase Dashboard → Storage → `website-assets` bucket
2. Bucket is public or has correct RLS policies
3. Image URLs in database are correct

**Fix:**
- Make bucket public: Storage → website-assets → Settings → Public bucket
- Or add RLS policy for public read access

### Issue: Build fails on Vercel

**Check:**
1. Vercel deployment logs (shows exact error)
2. Build works locally: `npm run build`

**Common causes:**
- TypeScript errors
- Missing dependencies
- Environment variables needed at build time

**Fix:**
- Fix errors shown in logs
- Test build locally first
- Push fixes to GitHub

---

## 📊 Vercel Dashboard Overview

### Key Sections

**Deployments**
- See all deployments (history)
- View build logs
- Redeploy previous versions
- Promote preview to production

**Settings → Environment Variables**
- Add/edit environment variables
- Separate values for Production/Preview/Development
- Changes require redeploy

**Settings → Domains**
- Add/remove custom domains
- View DNS configuration
- Check SSL certificate status

**Analytics** (if enabled)
- Page views
- Top pages
- Visitor locations
- Performance metrics

---

## 🎯 Quick Command Reference

```bash
# Test build locally before pushing
npm run build
npm run preview

# Deploy to Vercel
git add .
git commit -m "Ready for production"
git push origin main

# Create preview deployment
git checkout -b feature/new-feature
git push origin feature/new-feature

# Check if site is live
curl -I https://friscontech.com
```

---

## 📱 DNS Provider Specific Guides

### Namecheap
1. Dashboard → Domain List → Manage
2. Advanced DNS tab
3. Add/modify A and CNAME records
4. Delete any conflicting records

### GoDaddy
1. My Products → Domains → DNS
2. Add/modify DNS records
3. Save changes

### Cloudflare
1. Select domain
2. DNS tab
3. Add/modify records
4. Ensure proxy status (orange cloud) is OFF for A record

### Google Domains
1. My domains → Manage → DNS
2. Custom resource records
3. Add A and CNAME records

---

## ✅ Success Checklist

After deployment, confirm:

- [ ] Site loads at Vercel URL
- [ ] Site loads at custom domain (if configured)
- [ ] HTTPS works (green padlock)
- [ ] All routes work (no 404s)
- [ ] Admin login works
- [ ] Content loads from Supabase
- [ ] Images display correctly
- [ ] Contact form submits
- [ ] Admin dashboard fully functional
- [ ] Rate limiting works on login
- [ ] Password toggle works

---

## 🎉 You're Live!

Your Friscon Tech website is now:
- ✅ Deployed on Vercel's global CDN
- ✅ Auto-deploying on every Git push
- ✅ Secured with HTTPS
- ✅ Connected to your custom domain
- ✅ Backed by Supabase database
- ✅ Protected with rate limiting

---

## 📚 Helpful Links

- **Vercel Docs:** https://vercel.com/docs
- **Custom Domains:** https://vercel.com/docs/concepts/projects/custom-domains
- **Environment Variables:** https://vercel.com/docs/concepts/projects/environment-variables
- **DNS Configuration:** https://vercel.com/docs/concepts/projects/custom-domains#dns-configuration

---

**Last Updated:** September 15, 2026  
**Deployment Platform:** Vercel  
**Framework:** Vite + React SPA
