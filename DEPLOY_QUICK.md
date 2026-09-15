# 🚀 Quick Deploy to Vercel

**5-minute deployment guide**

---

## Step 1: Push to GitHub

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

---

## Step 2: Connect Vercel

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click **"Add New Project"**
3. Import your repository
4. Click **"Deploy"** (settings are already configured!)

---

## Step 3: Add Environment Variables

In Vercel dashboard → Settings → Environment Variables, add:

```
VITE_SUPABASE_URL = https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGc...
```

Get these from: **Supabase Dashboard → Project Settings → API**

Then **"Redeploy"** from Deployments tab.

---

## Step 4: Add Custom Domain (Optional)

1. Vercel → Settings → Domains
2. Add `friscontech.com`
3. Vercel shows DNS records
4. Add records to your domain provider:

```
Type: A
Name: @
Value: [IP shown by Vercel]

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

Wait 30 minutes to 2 hours for DNS to propagate.

---

## ✅ Done!

Your site is live! 🎉

**Next push to GitHub automatically deploys.**

---

For detailed guide see: **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)**
