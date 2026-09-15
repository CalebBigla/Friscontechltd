# 🚀 Render Deployment Checklist

## Pre-Deployment

- [ ] Code is pushed to GitHub/GitLab
- [ ] `.env` file is NOT committed (it's in .gitignore)
- [ ] All dependencies in `package.json` are correct
- [ ] Local build works: `npm run build`
- [ ] Local preview works: `npm run preview`
- [ ] Have Supabase credentials ready
- [ ] Have Web3Forms access key ready

## Render Setup

- [ ] Render account created
- [ ] Repository connected to Render
- [ ] Static site created
- [ ] Build command: `npm install && npm run build`
- [ ] Publish directory: `dist`
- [ ] Branch: `main`

## Environment Variables

Add these in Render dashboard:

- [ ] `VITE_SUPABASE_URL` = `your-project.supabase.co`
- [ ] `VITE_SUPABASE_ANON_KEY` = `your-anon-key`
- [ ] `VITE_WEB3FORMS_ACCESS_KEY` = `your-web3forms-key`

## First Deployment

- [ ] Click "Create Static Site"
- [ ] Wait for build to complete (2-5 minutes)
- [ ] Check build logs for errors
- [ ] Note your Render URL: `https://your-site.onrender.com`

## Post-Deployment Tests

### Public Pages
- [ ] Homepage loads correctly
- [ ] About page displays team members
- [ ] Services page shows all services
- [ ] Contact page displays Google Maps
- [ ] Contact form submits successfully
- [ ] Privacy policy page accessible
- [ ] Terms of use page accessible

### Admin Dashboard
- [ ] Can access `/admin` route
- [ ] Admin login works with Supabase credentials
- [ ] Dashboard displays after login
- [ ] Content editor loads and saves
- [ ] Services management CRUD works
- [ ] Team management works
- [ ] Image uploads function correctly
- [ ] Testimonials management works
- [ ] Logout functionality works

### Technical Tests
- [ ] Direct URL navigation works (no 404s)
- [ ] Browser refresh on any page works
- [ ] All images load correctly
- [ ] No console errors in browser DevTools
- [ ] Mobile responsive design works
- [ ] SSL/HTTPS is active
- [ ] Page load time is acceptable

## Supabase Configuration

- [ ] Supabase RLS policies are enabled
- [ ] Allowed URLs include Render domain
- [ ] Storage bucket is public
- [ ] Storage policies allow uploads
- [ ] Database tables have correct structure

## Optional: Custom Domain

- [ ] Add custom domain in Render settings
- [ ] Update DNS CNAME record
- [ ] Wait for DNS propagation
- [ ] Verify SSL certificate provisioned
- [ ] Update Supabase allowed URLs

## Ongoing Maintenance

- [ ] Set up deploy notifications (email/Slack)
- [ ] Monitor build logs regularly
- [ ] Test after each git push
- [ ] Keep dependencies updated
- [ ] Monitor Render status page

---

## Quick Test Commands

```bash
# Test locally before deploying
npm run build
npm run preview

# Open in browser
# Visit http://localhost:4173
```

---

## Troubleshooting

If something doesn't work:

1. **Check Render build logs** - Look for error messages
2. **Verify environment variables** - Ensure no typos
3. **Test locally** - Run `npm run build` to catch build errors
4. **Check Supabase** - Verify RLS policies and allowed URLs
5. **Clear cache** - Try hard refresh (Ctrl+Shift+R)
6. **Check browser console** - Look for JavaScript errors

---

## Success Criteria

Your deployment is successful when:

✅ All public pages load without errors  
✅ Admin login and dashboard work  
✅ Content management functions correctly  
✅ Contact form submits successfully  
✅ Images display and upload  
✅ Direct URL access works  
✅ HTTPS is active  
✅ No console errors  

---

**Ready to deploy?** Follow the steps in `RENDER_DEPLOYMENT.md`

**Deployment Date:** __________  
**Render URL:** __________  
**Custom Domain:** __________  
**Deployed By:** __________  

✅ = Completed  
⚠️ = Issues found  
❌ = Not working
