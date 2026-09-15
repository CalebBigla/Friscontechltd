# 🔧 Troubleshooting Guide

Quick fixes for common issues after deployment.

---

## 🚨 Issue: "404 Not Found" when refreshing pages

### Symptom
- Homepage loads fine
- Navigation works
- But refreshing `/about` or `/services` shows 404 error

### Cause
Your web server doesn't know to serve `index.html` for all routes.

### Fix for Apache (Hostbeak)
Ensure `.htaccess` is in your `public_html/` root:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Note:** This file is automatically included in your `dist/` folder during build.

---

## 🚨 Issue: Blank page after deployment

### Possible Causes & Fixes

#### 1. Environment Variables Missing
**Check:** Are your Supabase credentials set?

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Fix:**
- Add these to Hostbeak environment variables
- OR ensure `.env` file is in your repository root (not recommended for security)

#### 2. Base URL Incorrect
**Check:** Is your site in a subdirectory?

**Fix:** If deploying to `yourdomain.com/subdirectory/`, update `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/subdirectory/',
  // ... rest of config
});
```

Then rebuild: `npm run build`

#### 3. Console Errors
**Check:** Open browser DevTools (F12) → Console tab

**Common Errors:**
- `Failed to fetch` → Supabase URL incorrect
- `CORS error` → Supabase URL mismatch
- `Module not found` → Missing files (try rebuilding)

---

## 🚨 Issue: Admin login not working

### Symptom
- Login page loads
- Enter credentials
- Nothing happens or error appears

### Fixes

#### 1. Check Supabase Project Status
- Visit your Supabase dashboard
- Ensure project is active (not paused)

#### 2. Verify Supabase URL
```bash
# In .env or Hostbeak environment
VITE_SUPABASE_URL=https://xxxxx.supabase.co  # Must match your project
```

#### 3. Check Browser Console
Look for authentication errors:
```
Failed to fetch
→ Supabase URL is wrong or unreachable

Invalid API key
→ VITE_SUPABASE_ANON_KEY is wrong

No 'Access-Control-Allow-Origin' header
→ CORS issue - check Supabase project settings
```

#### 4. Test Supabase Connection
Open DevTools Console and run:
```javascript
console.log(import.meta.env.VITE_SUPABASE_URL);
console.log(import.meta.env.VITE_SUPABASE_ANON_KEY);
```

Should show your actual values, not `undefined`.

---

## 🚨 Issue: Images not loading

### Symptom
- Content appears
- But images show broken or don't load

### Fixes

#### 1. Check Supabase Storage
- Visit Supabase dashboard → Storage
- Verify bucket exists: `website-assets`
- Check bucket is public or has proper RLS policies

#### 2. Check Image URLs in Database
Run in Supabase SQL editor:
```sql
SELECT name, image_url FROM team_members;
SELECT title, image_url FROM services;
```

URLs should look like:
```
https://xxxxx.supabase.co/storage/v1/object/public/website-assets/team/image.jpg
```

#### 3. Upload Missing Images
1. Go to `/admin/team` or `/admin/services`
2. Re-upload images
3. Refresh public pages

---

## 🚨 Issue: Contact form not submitting

### Symptom
- Fill out form
- Click submit
- Nothing happens or error appears

### Fixes

#### 1. Check Supabase Table
Verify `enquiries` table exists:
```sql
SELECT * FROM enquiries LIMIT 1;
```

#### 2. Check RLS Policies
Ensure insert policy exists:
```sql
-- Check policies
SELECT * FROM pg_policies WHERE tablename = 'enquiries';
```

Should have policy allowing anonymous inserts.

#### 3. Check Browser Console
Look for errors like:
```
new row violates row-level security policy
→ RLS policy too strict

permission denied for table enquiries
→ Need to enable RLS and add insert policy
```

#### 4. Test Supabase Connection
Try inserting directly from Supabase dashboard → Table Editor.

---

## 🚨 Issue: Google Maps not showing

### Symptom
- Contact page loads
- But map area is blank or shows error

### Fixes

#### 1. Check API Key (if using API)
Currently using iframe embed (no API key needed).

#### 2. Check iframe Source
In `src/routes/contact.tsx`, verify:
```tsx
src="https://www.google.com/maps/embed?pb=..."
```

#### 3. Test Directly
Copy the iframe `src` URL and paste in browser. Should show map.

#### 4. Alternative: Regenerate Embed
1. Visit [Google Maps](https://www.google.com/maps)
2. Search: "Jakande, Lagos, Nigeria"
3. Click "Share" → "Embed a map"
4. Copy new iframe code
5. Replace in `contact.tsx`

---

## 🚨 Issue: CSS not loading / looks broken

### Symptom
- Page loads
- But styling is missing or broken

### Fixes

#### 1. Hard Refresh
```
Windows/Linux: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

#### 2. Check Build Output
```bash
npm run build
```

Look for `dist/assets/index-[hash].css` in output.

#### 3. Check .htaccess
Ensure CSS files aren't being blocked:
```apache
# In .htaccess - should have:
<FilesMatch "\.(css|js|jpg|png|svg|woff|woff2)$">
  Header set Cache-Control "max-age=31536000, public"
</FilesMatch>
```

#### 4. Check Browser Console
Look for 404 errors on CSS files.

---

## 🚨 Issue: Build fails locally

### Common Build Errors

#### Error: "Module not found"
```bash
# Fix: Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Error: "TypeScript errors"
```bash
# Check for type errors
npm run build
# If errors shown, fix them first
```

#### Error: "Out of memory"
```bash
# Increase Node memory
export NODE_OPTIONS="--max_old_space_size=4096"
npm run build
```

#### Error: "vite-tsconfig-paths" warning
This is just a warning. Your build still works. To remove:

1. Open `vite.config.ts`
2. Remove `tsconfigPaths()` from plugins
3. Add `resolve: { tsconfigPaths: true }`

---

## 🚨 Issue: Admin dashboard looks broken after redesign

### Symptom
- Admin pages load
- But styling doesn't match the redesigned look

### Fix
Ensure these files have the latest redesign:
- `src/routes/admin.dashboard.tsx` ✅
- `src/routes/admin.content.tsx` ✅
- `src/routes/admin.services.tsx` ✅
- `src/routes/admin.team.tsx` ✅
- `src/routes/admin.testimonials.tsx` ✅

If not, check `ADMIN_REDESIGN_COMPLETE.md` for details.

---

## 🚨 Issue: Those 404 errors in console

### Symptom
```
/a/stack_contact/me - 404
/a/favourites - 404
/a/userContact/me - 404
/a/masterftp/me - 404
```

### Fix
**These are harmless!** They come from browser extensions, not your code.

See `404_ERRORS_EXPLAINED.md` for full explanation.

**TL;DR:** Ignore them. They don't affect your site.

---

## 🚨 Issue: Slow page loads

### Optimization Tips

#### 1. Enable Gzip Compression
Your `.htaccess` already has:
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
</IfModule>
```

#### 2. Enable Browser Caching
Your `.htaccess` already has:
```apache
<FilesMatch "\.(css|js|jpg|png|svg|woff|woff2)$">
  Header set Cache-Control "max-age=31536000, public"
</FilesMatch>
```

#### 3. Optimize Images
Large images slow down your site. Compress before uploading:
- Use [TinyPNG](https://tinypng.com) or similar
- Aim for < 200 KB per image
- Use WebP format if possible

#### 4. Use CDN (Optional)
Consider Cloudflare (free tier) for:
- Global CDN
- Automatic compression
- HTTPS
- DDoS protection

---

## 🆘 Still Having Issues?

### Diagnostic Checklist

1. **Build locally works?**
   ```bash
   npm run build
   npm run preview
   # Visit http://localhost:4173
   ```
   ✅ Works → Issue is with hosting
   ❌ Fails → Issue is with code

2. **Environment variables set?**
   - Check Hostbeak control panel
   - Verify variable names: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

3. **Supabase project active?**
   - Visit Supabase dashboard
   - Check project status
   - Test database connection

4. **Files uploaded correctly?**
   - Check `public_html/` contains:
     - `index.html`
     - `.htaccess`
     - `assets/` folder
     - All other files from `dist/`

5. **Browser console errors?**
   - Open DevTools (F12)
   - Look at Console tab
   - Read the actual error messages

---

## 📞 Support Resources

- **Hostbeak Support:** Check your hosting control panel
- **Supabase Docs:** https://supabase.com/docs
- **Vite Docs:** https://vite.dev
- **TanStack Router Docs:** https://tanstack.com/router

---

## ✅ Quick Health Check

Run these to verify everything works:

```bash
# 1. Dependencies installed?
npm install

# 2. Build succeeds?
npm run build

# 3. Preview works?
npm run preview
# Then visit http://localhost:4173

# 4. All pages load?
# Visit in preview:
# http://localhost:4173/
# http://localhost:4173/about
# http://localhost:4173/services
# http://localhost:4173/contact
# http://localhost:4173/admin
```

All working? **You're good to deploy!**

---

**Last Updated:** September 15, 2026
