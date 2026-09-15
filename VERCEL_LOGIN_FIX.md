# 🔧 Fix Vercel Login Issue - Supabase URL Configuration

**Problem:** Admin login fails on Vercel because Supabase redirect URLs are still pointing to localhost.

---

## ✅ Solution: Update Supabase Settings

### Step 1: Get Your Vercel URL

Your Vercel deployment URL will be something like:
```
https://your-project-name.vercel.app
```

Or if you added a custom domain:
```
https://friscontech.com
```

### Step 2: Configure Supabase Authentication

1. **Go to Supabase Dashboard**
   - Visit: [app.supabase.com](https://app.supabase.com)
   - Select your project

2. **Navigate to Authentication Settings**
   - Click **"Authentication"** in sidebar
   - Click **"URL Configuration"** tab

3. **Add Your Vercel URL to Site URL**
   
   **Site URL:** (Replace with your actual Vercel URL)
   ```
   https://your-project-name.vercel.app
   ```
   
   Or with custom domain:
   ```
   https://friscontech.com
   ```

4. **Add Redirect URLs**
   
   In the **"Redirect URLs"** section, add these URLs (replace with your domain):
   
   ```
   https://your-project-name.vercel.app/**
   https://your-project-name.vercel.app/admin/**
   https://your-project-name.vercel.app/admin/login
   https://your-project-name.vercel.app/admin/dashboard
   ```
   
   **If using custom domain, also add:**
   ```
   https://friscontech.com/**
   https://friscontech.com/admin/**
   https://friscontech.com/admin/login
   https://friscontech.com/admin/dashboard
   ```
   
   **Keep localhost for local development:**
   ```
   http://localhost:5173/**
   http://localhost:5173/admin/**
   ```

5. **Click "Save"**

### Step 3: Verify Environment Variables in Vercel

1. **Go to Vercel Dashboard**
   - Visit: [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your project

2. **Check Environment Variables**
   - Click **"Settings"** tab
   - Click **"Environment Variables"**
   
3. **Verify These Are Set:**
   ```
   VITE_SUPABASE_URL = https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJhbGc...
   ```

4. **If Missing or Wrong:**
   - Click "Add New" or "Edit"
   - Get correct values from: **Supabase Dashboard → Settings → API**
   - **Project URL** = `VITE_SUPABASE_URL`
   - **anon/public key** = `VITE_SUPABASE_ANON_KEY`

### Step 4: Redeploy on Vercel

After changing environment variables, you need to redeploy:

1. **In Vercel Dashboard:**
   - Go to **"Deployments"** tab
   - Click the **"..."** menu on the latest deployment
   - Click **"Redeploy"**
   - Confirm redeploy

2. **Wait 1-2 minutes** for build to complete

### Step 5: Test Login

1. **Visit your site:** `https://your-project-name.vercel.app`
2. **Go to admin:** `/admin/login`
3. **Try logging in** with your Supabase credentials
4. **Should work now!** ✅

---

## 🔍 How to Check What's Wrong

### Open Browser Console

1. Visit your Vercel site
2. Press **F12** to open DevTools
3. Go to **Console** tab
4. Try logging in
5. Look for errors

### Common Errors and Fixes

#### Error: "Failed to fetch" or "Network error"
**Cause:** Wrong Supabase URL in environment variables

**Fix:**
- Verify `VITE_SUPABASE_URL` in Vercel settings
- Should be: `https://xxxxx.supabase.co` (NOT localhost)
- Redeploy after fixing

#### Error: "Invalid API key" or "Unauthorized"
**Cause:** Wrong or missing anon key

**Fix:**
- Verify `VITE_SUPABASE_ANON_KEY` in Vercel settings
- Get correct key from Supabase Dashboard → Settings → API
- Copy the **anon** key (NOT the service_role key)
- Redeploy after fixing

#### Error: "redirect_uri is not allowed"
**Cause:** Vercel URL not added to Supabase redirect URLs

**Fix:**
- Follow Step 2 above to add Vercel URL to Supabase
- Add both the main URL and wildcard patterns
- No need to redeploy, changes are instant

#### Error: "Invalid login credentials"
**Cause:** Wrong email/password

**Fix:**
- Verify credentials in Supabase Dashboard → Authentication → Users
- Reset password if needed
- Try with correct credentials

---

## 📋 Quick Checklist

After following all steps, verify:

- [ ] Supabase Site URL = Your Vercel URL (not localhost)
- [ ] Supabase Redirect URLs include your Vercel URL with wildcards
- [ ] Vercel environment variables are set correctly
- [ ] `VITE_SUPABASE_URL` points to your Supabase project (not localhost)
- [ ] `VITE_SUPABASE_ANON_KEY` is the correct anon key
- [ ] Redeployed Vercel after changing environment variables
- [ ] No console errors when visiting the site
- [ ] Login form loads correctly
- [ ] Login succeeds and redirects to dashboard

---

## 🎯 Expected URLs Configuration

### In Supabase (Authentication → URL Configuration)

**Site URL:**
```
https://your-project-name.vercel.app
```

**Redirect URLs (one per line):**
```
http://localhost:5173/**
http://localhost:4173/**
https://your-project-name.vercel.app/**
https://friscontech.com/**
```

### In Vercel (Settings → Environment Variables)

```
Name: VITE_SUPABASE_URL
Value: https://xxxxx.supabase.co

Name: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Apply to:** All (Production, Preview, Development)

---

## 🔐 Security Note

The `VITE_SUPABASE_ANON_KEY` is **safe to expose** in your frontend code because:
- It's designed to be public
- Row Level Security (RLS) policies protect your data
- It can only do what RLS policies allow

**Never expose:**
- `service_role` key (has full access, bypasses RLS)
- Database passwords
- Private API keys

---

## 🆘 Still Not Working?

### Check These:

1. **Clear Browser Cache**
   - Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
   - Or clear site data in DevTools

2. **Check Supabase Project Status**
   - Supabase Dashboard → Project isn't paused
   - Database is running

3. **Verify User Exists**
   - Supabase Dashboard → Authentication → Users
   - Create a user if none exists

4. **Check Rate Limiting**
   - If you tried logging in 5+ times, clear localStorage
   - Open DevTools → Application → Local Storage → Clear
   - Or wait 2 hours for lockout to expire

5. **Test with Direct Supabase Auth**
   ```javascript
   // Open browser console on your Vercel site
   console.log(import.meta.env.VITE_SUPABASE_URL);
   console.log(import.meta.env.VITE_SUPABASE_ANON_KEY);
   
   // Should show your actual Supabase URL, not localhost
   ```

---

## 📞 Need More Help?

If still having issues:

1. **Check Vercel Deployment Logs**
   - Vercel Dashboard → Deployments → Click latest → View Function Logs
   - Look for build errors

2. **Check Supabase Logs**
   - Supabase Dashboard → Logs
   - Filter by "Authentication"
   - Look for failed auth attempts

3. **Test Locally First**
   ```bash
   npm run build
   npm run preview
   # Visit http://localhost:4173
   # Try logging in
   ```
   
   If works locally but not on Vercel = environment variable issue

---

**Most common fix:** Add your Vercel URL to Supabase redirect URLs and verify environment variables! 🎯
