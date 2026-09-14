# Decap CMS Setup Instructions (Render + GitHub)

## ✅ What's Been Done

I've set up Decap CMS for your Friscon Tech website. The admin dashboard will be ready at `/admin` after deployment.

### Files Created:
- `/public/admin/index.html` - Admin dashboard page
- `/public/admin/config.yml` - CMS configuration
- `/src/content/` - Content files (JSON format)

## 🚀 Setup Steps for Render Deployment

### Step 1: Update Config with Your GitHub Details

Edit `/public/admin/config.yml` and update these lines:

```yaml
backend:
  name: github
  repo: YOUR_GITHUB_USERNAME/YOUR_REPO_NAME  # ⚠️ Change this!
  branch: main
```

Example: If your repo is `https://github.com/friscontech/website`, use:
```yaml
  repo: friscontech/website
```

### Step 2: Create GitHub OAuth App

1. Go to GitHub Settings: https://github.com/settings/developers
2. Click **OAuth Apps** → **New OAuth App**
3. Fill in:
   - **Application name:** Friscon Tech CMS
   - **Homepage URL:** `https://yourdomain.com` (your actual domain)
   - **Authorization callback URL:** `https://yourdomain.com/admin/`
4. Click **Register application**
5. **Copy** your **Client ID**
6. Click **Generate a new client secret** and **copy it** (you'll need both)

### Step 3: Set Environment Variables on Render

When deploying to Render, add these environment variables:

```
GITHUB_CLIENT_ID=your_client_id_here
GITHUB_CLIENT_SECRET=your_client_secret_here
```

### Step 4: Deploy to Render

1. Push your code to GitHub:
```bash
git add .
git commit -m "Add Decap CMS"
git push origin main
```

2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click **New** → **Web Service**
4. Connect your GitHub repository
5. Configure:
   - **Name:** friscon-tech
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run preview` (or use Render's static site if no server needed)
6. Add the environment variables (Step 3)
7. Click **Create Web Service**

### Step 5: Configure Your Custom Domain

1. In Render dashboard, go to your service
2. Click **Settings** → **Custom Domains**
3. Add your domain
4. Update your DNS records as instructed by Render

### Step 6: Update Config with Your Domain

After deployment, edit `/public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: YOUR_GITHUB_USERNAME/YOUR_REPO_NAME
  branch: main
  # No need for base_url or auth_endpoint with GitHub backend
```

Commit and push this change.

## 🎉 Access Your Admin Dashboard

1. Visit: `https://yourdomain.com/admin`
2. Click **Login with GitHub**
3. Authorize the application
4. Start editing content!

## 📝 What You Can Edit

### Site Settings
- Company Information
- Statistics
- Testimonial
- About Page Content

### Collections
- Services (add/edit/delete)
- Team Members (add/edit/delete)
- Company Milestones (add/edit/delete)

## 🔄 How It Works

1. Edit content at `/admin`
2. Changes commit directly to your GitHub repo
3. Render auto-deploys when it detects changes
4. Your live site updates (usually 1-2 minutes)

## 🛠️ Local Development

To test locally:

1. Enable local backend in `/public/admin/config.yml`:
```yaml
local_backend: true
```

2. Run the proxy server:
```bash
npx decap-server
```

3. In another terminal, run your dev server:
```bash
npm run dev
```

4. Visit: `http://localhost:8081/admin`

## ✅ Alternative: Simple GitHub Authentication

If you don't want to deal with OAuth setup, you can use **GitHub token** authentication:

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate new token (classic) with `repo` scope
3. Add to your config:

```yaml
backend:
  name: github
  repo: YOUR_USERNAME/YOUR_REPO
  branch: main
  auth_type: token
```

Then when you visit `/admin`, you'll paste your GitHub token to authenticate.

## ⚠️ Important Notes

- **All content is in Git** - Every edit creates a commit
- **You control access** - Only GitHub users with repo access can edit
- **No server needed** - CMS runs entirely in the browser
- **Works with your custom domain** - No Netlify required!

## 🆘 Troubleshooting

**Can't access /admin?**
- Make sure `/public/admin/` files are included in your build
- Check browser console for errors

**GitHub authentication not working?**
- Double-check OAuth app callback URL includes `/admin/`
- Verify Client ID and Secret in environment variables

**Changes not deploying?**
- Check Render deploy logs
- Make sure auto-deploy is enabled

---

**Summary:** Push to GitHub → Deploy to Render → Setup GitHub OAuth → Edit at yourdomain.com/admin 🚀

