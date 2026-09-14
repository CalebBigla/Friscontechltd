# Hostbeak Deployment Guide - Git Version Control

## Prerequisites

Before deploying to Hostbeak, ensure you have:
- ✅ GitHub repository (already done: https://github.com/CalebBigla/pixel-perfect-clone)
- ✅ Hostbeak hosting account
- ✅ Domain pointed to Hostbeak nameservers (if using custom domain)
- ✅ Supabase project with environment variables

---

## Step 1: Prepare Your Environment Variables

### 1.1 Create `.env.production` file locally (DON'T COMMIT THIS)

Create a file named `.env.production` with your production values:

```bash
# Supabase
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_supabase_key

# Web3Forms (Contact Form)
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_key

# App URL
VITE_APP_URL=https://yourdomain.com
```

**Important:** This file should already be gitignored. Never commit it to GitHub.

---

## Step 2: Build Your Application Locally (Test)

Before deploying, test the production build:

```bash
# Install dependencies
npm install

# Create production build
npm run build

# Preview the production build locally
npm run preview
```

This creates a `dist` folder with all compiled assets.

---

## Step 3: Hostbeak Deployment Setup

### Option A: Automatic Deployment (Recommended)

**If Hostbeak supports Git integration:**

1. **Login to Hostbeak Dashboard**
   - Go to your Hostbeak control panel
   - Navigate to "Git Deployment" or "Version Control" section

2. **Connect GitHub Repository**
   - Click "Connect to GitHub"
   - Authorize Hostbeak to access your repositories
   - Select: `CalebBigla/pixel-perfect-clone`
   - Choose branch: `main`

3. **Configure Build Settings**
   ```
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   Node Version: 18 or higher
   ```

4. **Add Environment Variables**
   In Hostbeak dashboard, add all variables from `.env.production`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_WEB3FORMS_ACCESS_KEY`
   - `VITE_APP_URL`

5. **Deploy**
   - Click "Deploy" or "Trigger Deployment"
   - Hostbeak will automatically:
     - Clone your repository
     - Install dependencies
     - Build the application
     - Deploy to production

6. **Automatic Updates**
   - Every push to `main` branch will trigger auto-deployment
   - Monitor deployment logs in Hostbeak dashboard

---

### Option B: Manual Deployment via FTP/cPanel

**If Hostbeak doesn't have Git integration:**

#### Step 1: Build Locally
```bash
npm run build
```

This creates a `dist` folder with all your compiled files.

#### Step 2: Upload via FTP/File Manager

**Using FTP Client (FileZilla recommended):**
1. Get FTP credentials from Hostbeak cPanel
2. Connect to your hosting:
   - Host: ftp.yourdomain.com
   - Username: Your Hostbeak username
   - Password: Your Hostbeak password
   - Port: 21 (or 22 for SFTP)

3. Navigate to public_html folder (or your domain's root)
4. Upload ALL contents of `dist` folder (not the folder itself)

**Using cPanel File Manager:**
1. Login to Hostbeak cPanel
2. Go to File Manager
3. Navigate to public_html
4. Click "Upload"
5. Zip your `dist` folder first, then upload and extract

---

## Step 4: Configure Environment Variables on Hostbeak

### Using cPanel:

1. **Login to cPanel**

2. **Navigate to Environment Variables or .env Configuration**
   - Look for "Environment Variables" or "PHP Configuration"
   - Or manually create `.env` file in your root

3. **Add Variables**
   Create a `.env` file in your website root with:
   ```
   VITE_SUPABASE_URL=your_production_url
   VITE_SUPABASE_ANON_KEY=your_production_key
   VITE_WEB3FORMS_ACCESS_KEY=your_key
   VITE_APP_URL=https://yourdomain.com
   ```

**Important:** Since this is a static Vite build, the environment variables are compiled during build time, not runtime. You need to rebuild after changing env vars.

---

## Step 5: Configure Web Server

### Create `.htaccess` file (for Apache)

In your website root (where index.html is), create `.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Don't rewrite files or directories
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  
  # Rewrite everything else to index.html for SPA routing
  RewriteRule ^ index.html [L]
</IfModule>

# Security Headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Cache Control
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 month"
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>

# Gzip Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE text/javascript
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
  AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>
```

---

## Step 6: Database Setup (Supabase)

Your Supabase database needs to be configured:

### 6.1 Run SQL Scripts

Login to your Supabase dashboard and run these SQL files in order:

1. **schema.sql** - Creates all tables
2. **storage-setup.sql** - Sets up storage buckets
3. Optionally **cleanup.sql** - If you need to reset

### 6.2 Configure Supabase Storage

1. Go to Supabase Dashboard → Storage
2. Verify `team-images` bucket exists
3. Check RLS policies are enabled
4. Test file upload permissions

### 6.3 Update Environment Variables

Make sure your production `.env` has the correct Supabase URL and keys.

---

## Step 7: Domain Configuration

### Point Your Domain to Hostbeak

1. **Get Hostbeak Nameservers**
   - Check your Hostbeak welcome email
   - Or find in cPanel under "Server Information"
   - Usually: `ns1.hostbeak.com` and `ns2.hostbeak.com`

2. **Update Domain DNS**
   - Go to your domain registrar (e.g., Namecheap, GoDaddy)
   - Navigate to DNS Management
   - Change nameservers to Hostbeak's nameservers
   - Wait 24-48 hours for propagation (usually faster)

3. **Add Domain in Hostbeak**
   - In cPanel, go to "Addon Domains" or "Domains"
   - Add your domain: `friscontech.com`
   - Point to your website folder

---

## Step 8: SSL Certificate (HTTPS)

### Enable SSL in cPanel:

1. **Navigate to SSL/TLS**
   - In cPanel, find "SSL/TLS Status" or "Let's Encrypt"

2. **Install Free SSL**
   - Hostbeak likely offers free Let's Encrypt SSL
   - Select your domain
   - Click "Install SSL"
   - Wait 5-10 minutes for activation

3. **Force HTTPS**
   Add to your `.htaccess`:
   ```apache
   # Force HTTPS
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

---

## Step 9: Verify Deployment

### Post-Deployment Checklist:

- [ ] Website loads at your domain
- [ ] All pages navigate correctly (/, /about, /services, /contact)
- [ ] Images load properly
- [ ] Google Map displays on contact page
- [ ] Contact form works (test submission)
- [ ] Admin login works at /admin/login
- [ ] Admin dashboard accessible after login
- [ ] Team images upload successfully
- [ ] Database operations work (CRUD)
- [ ] SSL certificate is active (https://)
- [ ] Mobile responsive design works
- [ ] Animations play correctly
- [ ] SEO meta tags are present (view page source)

---

## Step 10: Continuous Deployment Setup

### For Future Updates:

#### If Using Git Integration:
1. Make changes locally
2. Commit: `git commit -m "your changes"`
3. Push: `git push origin main`
4. Hostbeak auto-deploys

#### If Using Manual FTP:
1. Make changes locally
2. Build: `npm run build`
3. Upload `dist` folder contents via FTP
4. Clear browser cache to see changes

---

## Troubleshooting Common Issues

### Issue 1: "Page Not Found" on Refresh
**Solution:** Check `.htaccess` file exists with SPA routing rules

### Issue 2: Environment Variables Not Working
**Solution:** 
- Vite requires `VITE_` prefix
- Rebuild after changing env vars: `npm run build`
- Variables are compiled at build time, not runtime

### Issue 3: Images Not Loading
**Solution:**
- Check file paths are correct
- Verify images uploaded to correct directory
- Check file permissions (755 for folders, 644 for files)

### Issue 4: Admin Routes Return 404
**Solution:**
- Ensure `.htaccess` has SPA routing rules
- Check Apache mod_rewrite is enabled

### Issue 5: Contact Form Not Sending
**Solution:**
- Verify `VITE_WEB3FORMS_ACCESS_KEY` is set
- Check Supabase connection for form submissions table
- Test Web3Forms API key at web3forms.com

### Issue 6: Supabase Connection Failed
**Solution:**
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Check Supabase project is not paused
- Verify RLS policies allow public access where needed

---

## Performance Optimization

### After Deployment:

1. **Enable Caching**
   - Already configured in `.htaccess`
   - Verify in browser DevTools

2. **Optimize Images**
   - Already lazy-loaded
   - Consider using WebP format for better compression

3. **CDN (Optional)**
   - Cloudflare free tier
   - Point DNS to Cloudflare
   - Enable caching and optimization

4. **Monitoring**
   - Set up Google Analytics
   - Monitor with Google Search Console
   - Track Core Web Vitals

---

## Backup Strategy

### Regular Backups:

1. **Automated Git Backups**
   - Code is backed up on GitHub
   - Push regularly: `git push origin main`

2. **Database Backups**
   - Supabase has automatic backups
   - Export manually for extra safety

3. **File Backups**
   - Use Hostbeak's cPanel backup feature
   - Download weekly backups to local storage

---

## Quick Deploy Checklist

### Before First Deployment:
- [ ] All code committed to GitHub
- [ ] `.env.production` configured (not committed)
- [ ] Production build tested locally
- [ ] Supabase database configured
- [ ] Domain DNS pointed to Hostbeak
- [ ] Hostbeak account ready

### Deployment Steps:
- [ ] Connect GitHub to Hostbeak (if supported)
- [ ] Configure build settings
- [ ] Add environment variables
- [ ] Deploy/Upload files
- [ ] Add `.htaccess` file
- [ ] Install SSL certificate
- [ ] Run database migrations
- [ ] Test all functionality

### Post-Deployment:
- [ ] Verify all pages work
- [ ] Test forms and admin
- [ ] Check mobile responsiveness
- [ ] Submit sitemap to Google
- [ ] Monitor error logs

---

## Support & Resources

**Hostbeak Support:**
- Check Hostbeak documentation
- Contact their support team
- Look for deployment tutorials

**Your Project:**
- GitHub: https://github.com/CalebBigla/pixel-perfect-clone
- Documentation: All `.md` files in repository

**Technologies:**
- Vite: https://vitejs.dev/guide/static-deploy.html
- React: https://react.dev/
- Supabase: https://supabase.com/docs
- TanStack Router: https://tanstack.com/router

---

## Need Help?

If you encounter issues:
1. Check Hostbeak error logs in cPanel
2. Review browser console for errors
3. Test build locally first
4. Verify environment variables
5. Check Supabase connection
6. Contact Hostbeak support if server-related

---

**Deployment Date:** _Your deployment date_  
**Production URL:** _https://yourdomain.com_  
**Status:** Ready to deploy 🚀
