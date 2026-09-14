# Admin Routes Overview

## 🔐 Public Routes (No Auth Required)

| Route | Description | Status |
|-------|-------------|--------|
| `/` | Home page | ✅ Live |
| `/about` | About page | ✅ Live |
| `/services` | Services page | ✅ Live |
| `/contact` | Contact page with form | ✅ Enhanced (dual submission) |
| `/privacy-policy` | Privacy policy | ✅ Live |
| `/terms-of-use` | Terms of use | ✅ Live |

---

## 🔒 Admin Routes (Authentication Required)

### Authentication
| Route | Description | Access | Status |
|-------|-------------|--------|--------|
| `/admin/login` | Admin login page | Public | ✅ Complete |

### Protected Dashboard
All routes below require authentication. Non-authenticated users are redirected to `/admin/login`.

| Route | Description | Icon | Status |
|-------|-------------|------|--------|
| `/admin/dashboard` | Main dashboard with stats | 📊 | ✅ Complete |
| `/admin/enquiries` | View form submissions | 📬 | ⏳ Phase 2 |
| `/admin/services` | Manage services | 💼 | ⏳ Phase 2 |
| `/admin/team` | Manage team members | 👥 | ⏳ Phase 2 |
| `/admin/content` | Edit page content | 📝 | ⏳ Phase 2 |
| `/admin/settings` | Global site settings | ⚙️ | ⏳ Phase 2 |

---

## 🎨 Admin Dashboard Features

### Current (Phase 1)
✅ Secure login with Supabase Auth  
✅ Protected routes with auth guard  
✅ Responsive sidebar navigation  
✅ Mobile hamburger menu  
✅ Logout functionality  
✅ Dashboard overview with stats  
✅ Quick action cards  

### Coming (Phase 2)
⏳ View/manage enquiries  
⏳ Edit global settings  
⏳ CRUD operations for services  
⏳ CRUD operations for team  
⏳ Content management  
⏳ Image upload to Supabase Storage  

---

## 🔐 Security

### Authentication
- ✅ Supabase Auth (industry-standard)
- ✅ Session-based authentication
- ✅ Automatic session refresh
- ✅ Secure logout

### Route Protection
- ✅ AdminAuthGuard component
- ✅ Auto-redirect to login if not authenticated
- ✅ Session persistence across page reloads
- ✅ Loading state during auth check

### Database Security
- ✅ Row Level Security (RLS) policies
- ✅ Authenticated users can read all content
- ✅ Only authenticated users can insert/update
- ✅ Public users can only read published content

---

## 📱 Responsive Design

### Desktop (1024px+)
- Persistent sidebar navigation
- Full-width content area
- Hover effects on nav items

### Tablet (768px - 1023px)
- Persistent sidebar (narrower)
- Adjusted content padding
- Touch-friendly buttons

### Mobile (<768px)
- Hidden sidebar by default
- Hamburger menu button
- Slide-out sidebar on tap
- Overlay backdrop
- Touch-optimized interface

---

## 🎯 User Flow

### First Time Admin Setup
1. Create Supabase project
2. Run `schema.sql`
3. Create admin user in Supabase Auth
4. Add credentials to `.env`
5. Visit `/admin/login`
6. Enter credentials
7. Explore dashboard

### Daily Admin Workflow
1. Visit `/admin/login`
2. Enter credentials
3. Redirected to `/admin/dashboard`
4. Click "View Enquiries" → Check form submissions
5. Click "Manage Services" → Edit service offerings
6. Click "Update Team" → Add/edit team members
7. Click "Edit Content" → Update page text
8. Click "Settings" → Change contact info
9. Logout when done

---

## 🛠️ Technical Details

### File Structure
```
src/routes/
├── admin.login.tsx          → /admin/login
├── admin.dashboard.tsx      → /admin/dashboard
├── admin.enquiries.tsx      → /admin/enquiries
├── admin.services.tsx       → /admin/services
├── admin.team.tsx           → /admin/team
├── admin.content.tsx        → /admin/content
└── admin.settings.tsx       → /admin/settings
```

### Route Naming Convention
TanStack Router uses dot notation:
- `admin.login.tsx` → `/admin/login`
- `admin.dashboard.tsx` → `/admin/dashboard`

### Layout Wrapper
All admin routes (except login) use:
1. `<AdminAuthGuard>` - Checks authentication
2. `<AdminLayout>` - Provides sidebar navigation

### Data Flow
```
User visits /admin/dashboard
    ↓
AdminAuthGuard checks authentication
    ↓
If authenticated: Render page
If not: Redirect to /admin/login
    ↓
AdminLayout wraps page content
    ↓
Page fetches data via React Query hooks
    ↓
Data displayed with loading/error states
```

---

## 🔄 State Management

### Authentication State
- Managed by `AuthContext` provider
- Available via `useAuth()` hook
- Persisted in Supabase session

### Data State
- Managed by React Query
- 5-minute cache
- Automatic refetching
- Fallback to hardcoded content

---

## 📊 Admin Dashboard Stats

Current stats shown on dashboard:

| Stat | Description | Source |
|------|-------------|--------|
| Enquiries | New form submissions | `form_submissions` table |
| Services | Active services | `services` table |
| Team Members | Published profiles | `team_members` table |
| Content | Site coverage | Static (100%) |

---

## 🎨 Design System

### Colors
- **Primary:** Green (`#10b981`) - Main actions
- **Secondary:** Orange (`#f97316`) - Secondary actions
- **Dark:** Charcoal (`#1a1a1a`) - Sidebar/text
- **Background:** Gray (`#f9fafb`) - Main area

### Typography
- **Headings:** Space Grotesk
- **Body:** DM Sans

### Components
- Buttons: Rounded with hover states
- Cards: White with shadow
- Inputs: Border with focus ring
- Nav: Active state highlighting

---

## 🚀 Deployment

### Environment Variables Required
All hosting platforms need these three variables:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_WEB3FORMS_ACCESS_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

### Build Process
1. Vite reads `.env` variables
2. Replaces `import.meta.env.VITE_*` with actual values
3. Builds static files to `dist/`
4. Deploy `dist/` folder

### Hosting Platforms
- ✅ HostBeak (planned)
- ✅ Netlify (compatible)
- ✅ Vercel (compatible)
- ✅ Any static hosting

---

## 📈 Performance

### Initial Load
- Admin routes lazy-loaded
- Not included in public bundle
- Zero impact on public pages

### Admin Area
- React Query caches data
- Reduced API calls
- Smooth navigation
- Instant page transitions

---

## 🔜 Phase 2 Preview

Next implementation will add full CRUD to all placeholder pages:

### Enquiries Page
- Table view of submissions
- Search and filter
- Mark as read/unread
- View full messages
- Delete enquiries

### Settings Page
- Edit company details
- Update hero text
- Manage social links
- SEO configuration

### Services Page
- Add new service
- Edit existing
- Delete service
- Reorder display
- Publish/unpublish

### Team Page
- Add team member
- Edit profiles
- Upload photos
- Delete members
- Reorder display

### Content Page
- Edit About sections
- Manage testimonials
- Update milestones
- Edit statistics

---

## 💡 Tips

1. **Bookmark `/admin/login`** for quick access
2. **Save credentials** in password manager
3. **Test on mobile** to verify responsive design
4. **Check Supabase dashboard** to view data directly
5. **Use browser console** for debugging

---

## ✅ Ready to Use

All routes are configured and ready. Just add your credentials and start testing!

Visit: `/admin/login` to get started! 🚀
