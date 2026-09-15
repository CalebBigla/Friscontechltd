# ⚡ QUICK FIX - Login Not Working on Vercel

## 🎯 The Problem
Supabase authentication is still configured for `localhost` instead of your Vercel URL.

---

## ✅ Solution (3 Steps - 5 Minutes)

### Step 1: Update Supabase (Most Important!)

Go to: **[Supabase Dashboard](https://app.supabase.com)** → Your Project → **Authentication** → **URL Configuration**

**Change "Site URL" from:**
```
http://localhost:5173
```

**To your Vercel URL:**
```
https://your-project-name.vercel.app
```

**Add to "Redirect URLs":**
```
https://your-project-name.vercel.app/**
http://localhost:5173/**
```

Click **"Save"**

---

### Step 2: Check Vercel Environment Variables

Go to: **[Vercel Dashboard](https://vercel.com/dashboard)** → Your Project → **Settings** → **Environment Variables**

**Verify these exist:**
```
VITE_SUPABASE_URL = https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGc...
```

**If missing or wrong:**
- Get correct values from **Supabase → Settings → API**
- Add/update them in Vercel
- Must have `VITE_` prefix!

---

### Step 3: Redeploy

In **Vercel Dashboard** → **Deployments** tab:
1. Click **"..."** on latest deployment
2. Click **"Redeploy"**
3. Wait 1-2 minutes

---

## 🧪 Test It

1. Visit: `https://your-project-name.vercel.app/admin/login`
2. Enter your credentials
3. Should work now! ✅

---

## 🔍 Quick Debug

**Open browser console (F12)** and run:
```javascript
console.log(import.meta.env.VITE_SUPABASE_URL);
```

**Should show:**
```
https://xxxxx.supabase.co  ✅ Correct
```

**NOT:**
```
http://localhost:5173  ❌ Wrong
undefined  ❌ Missing
```

---

## 🆘 Still Not Working?

1. **Clear browser cache:** Hard refresh (`Ctrl + Shift + R`)
2. **Clear localStorage:** DevTools → Application → Local Storage → Clear
3. **Wait 5 minutes** after redeploying
4. **Check full guide:** See `VERCEL_LOGIN_FIX.md`

---

**Most common cause:** Forgot to update Supabase Site URL! 🎯
