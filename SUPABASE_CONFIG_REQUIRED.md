# ⚠️ IMPORTANT: Supabase Configuration Required

## 🚨 Action Required Before Testing Password Reset

The password reset flow has been implemented, but **you must configure Supabase** to allow the production reset URL.

---

## 📋 Configuration Steps

### Step 1: Open Supabase Dashboard

1. Go to: [app.supabase.com](https://app.supabase.com)
2. Select your Friscon Tech project

### Step 2: Navigate to Authentication Settings

1. Click **"Authentication"** in the left sidebar
2. Click **"URL Configuration"** tab

### Step 3: Add Redirect URLs

In the **"Redirect URLs"** section, add these URLs (one per line):

```
https://friscontechltd.vercel.app/admin/reset-password
https://friscontechltd.vercel.app/admin/forgot-password
https://friscontechltd.vercel.app/admin/**
http://localhost:5173/admin/reset-password
http://localhost:5173/admin/forgot-password
http://localhost:5173/admin/**
```

### Step 4: Verify Site URL

Make sure **"Site URL"** is set to your production URL:

```
https://friscontechltd.vercel.app
```

(You should have already done this when you fixed the login issue)

### Step 5: Save

Click **"Save"** at the bottom of the page.

---

## ❓ Why Is This Required?

Supabase security prevents password reset emails from redirecting to URLs that aren't explicitly allowed in your project settings.

Without adding these URLs, users will get:
```
error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired
```

After adding these URLs, password reset will work correctly!

---

## ✅ How to Test

After configuring Supabase:

1. Go to: `https://friscontechltd.vercel.app/admin/login`
2. Click: "Forgot your password?"
3. Enter your admin email
4. Check your email
5. Click the reset link
6. Should redirect to: `https://friscontechltd.vercel.app/admin/reset-password`
7. Set new password
8. Log in with new password

**Should work without any errors!**

---

## 🔍 Visual Guide

### Supabase Dashboard Path:
```
Supabase Dashboard
  └─ [Your Project]
      └─ Authentication
          └─ URL Configuration
              ├─ Site URL: https://friscontechltd.vercel.app
              └─ Redirect URLs: (add the URLs listed above)
```

---

## 🆘 Still Getting Errors?

If you still see "access_denied" after configuration:

1. **Double-check URLs** - Make sure they match exactly (no typos)
2. **Check wildcards** - The `/**` at the end is important
3. **Wait a minute** - Supabase changes take effect immediately but cache may need to clear
4. **Test in incognito** - Clears any cached states
5. **Check Supabase logs** - Dashboard → Logs → Filter by Authentication

---

**This configuration is one-time only. Once set, password reset will work permanently!**
