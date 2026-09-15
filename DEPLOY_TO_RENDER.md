# 🚀 Deploy to Render - Quick Start

## What You Need (5 minutes)

1. **Render Account** - [Sign up free](https://render.com)
2. **GitHub/GitLab** - Your code repository
3. **Supabase Credentials** - From your Supabase project
4. **Web3Forms Key** - For contact form

---

## Step-by-Step Deployment

### 1️⃣ Push Your Code (if not already)

```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### 2️⃣ Go to Render Dashboard

- Visit: https://dashboard.render.com
- Sign in or create account
- Click **"New +"** button
- Select **"Static Site"**

### 3️⃣ Connect Your Repository

- Choose GitHub or GitLab
- Authorize Render
- Select your repository: `pixel-perfect-clone-main`

### 4️⃣ Configure Build Settings

Copy these exact values:

| Field | Value |
|-------|-------|
| **Name** | `friscon-tech-website` |
| **Branch** | `main` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

### 5️⃣ Add Environment Variables

Click **"Advanced"** → Add these variables:

```
VITE_SUPABASE_URL=your-supabase-url-here
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_WEB3FORMS_ACCESS_KEY=your-web3forms-key-here
```

**Where to get these:**
- **Supabase:** Dashboard → Settings → API
- **Web3Forms:** Your Web3Forms account

### 6️⃣ Deploy!

- Click **"Create Static Site"**
- Wait 3-5 minutes for first build
- Your site will be live at: `https://your-site.onrender.com`

---

## That's It! 🎉

### What Happens Next?

✅ **Automatic Deployments** - Every `git push` triggers a new deploy  
✅ **Free SSL Certificate** - HTTPS enabled automatically  
✅ **Global CDN** - Fast loading worldwide  
✅ **Zero Configuration** - Everything just works  

---

## Quick Tests After Deployment

Visit these URLs (replace with your Render URL):

```
https://your-site.onrender.com/          # Homepage
https://your-site.onrender.com/about     # About page
https://your-site.onrender.com/services  # Services
https://your-site.onrender.com/contact   # Contact
https://your-site.onrender.com/admin     # Admin login
```

**Test:**
- Pages load correctly ✅
- Images display ✅
- Contact form works ✅
- Admin login works ✅

---

## Files Created for Render

This repository now includes:

- ✅ `render.yaml` - Render configuration
- ✅ `_redirects` - SPA routing rules
- ✅ `RENDER_DEPLOYMENT.md` - Full guide
- ✅ `RENDER_CHECKLIST.md` - Testing checklist

---

## Need Help?

1. **Build fails?** Check Render build logs
2. **404 errors?** Verify `dist` folder is published
3. **Env vars not working?** Redeploy after adding them
4. **More details?** See `RENDER_DEPLOYMENT.md`

---

## Updating Your Site

Just push to GitHub:

```bash
git add .
git commit -m "Update content"
git push origin main
```

Render automatically rebuilds and deploys! 🚀

---

## Cost

**Free Tier Includes:**
- 100 GB bandwidth/month
- 500 build minutes/month
- Automatic SSL
- Global CDN
- Perfect for small-medium sites

**Need more?** Upgrade to $7/month for always-on service.

---

**Ready?** Follow steps above or see `RENDER_DEPLOYMENT.md` for full details.

**Your site will be live in 5 minutes!** ⚡
