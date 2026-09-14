# Image Placement Strategy

## 📸 Images Used and Their Placements

### **Home Page (index.tsx)**

1. **Hero Header**: `Third Party Logistics Canada.jpg`
   - Placement: Main hero background with Ken Burns zoom effect
   - Style: Full-width, grayscale filter, overlay gradient
   - Purpose: Professional logistics/infrastructure vibe

2. **Agriculture Spotlight**: `Smart farming means safe farming (biopesticides).jpg`
   - Placement: Agriculture feature section (floating spotlight card area)
   - Style: Large feature image, grayscale filter with zoom on hover
   - Purpose: Showcases agricultural expertise and safe farming practices

### **About Page (about.tsx)**

3. **Why Nigeria Section**: `Before you Eat the Produce of 2026.jpg`
   - Placement: Editorial two-column layout (left side)
   - Style: 4:3 aspect ratio, grayscale filter, zoom on hover
   - Purpose: Represents Nigerian agriculture and food systems

4. **Leadership Photo**: `Outfit (professional photo).jpg`
   - Placement: Founder/CEO card in team section
   - Style: Circular crop (140px), orange border, full color
   - Purpose: Real professional headshot for Ayodele Adeyemi

### **Services Page (services.tsx)**

5. **Text Wrap Image**: `Service Clarity Improves Enquiries.jpg`
   - Placement: Floated left with text wrapping around
   - Style: 380px width, grayscale filter, rectangular
   - Purpose: Illustrates client engagement and service delivery

6. **Aside Layout**: `China's logistics sector grows.jpg`
   - Placement: Image-aside section (right column)
   - Style: 4:3 aspect ratio, grayscale, zoom on hover
   - Purpose: Shows regional supply chain networks and infrastructure

### **Contact Page (contact.tsx)**

7. **Contact Image 1**: `Buy Pure Organic and Healthy Foods Online.jpg`
   - Placement: Two-column grid (left)
   - Style: 3:2 aspect ratio, grayscale filter
   - Purpose: Quality produce and sustainable farming

8. **Contact Image 2**: `Boost Your Leads (Marketing).jpg`
   - Placement: Two-column grid (right)
   - Style: 3:2 aspect ratio, grayscale filter
   - Purpose: Strategic communication and market development

### **Unused Images (Available for Future Use)**

9. `download (30).jpg` - Available
10. `download (31).jpg` - Available
11. `download (32).jpg` - Available

## 🎨 Image Styling Patterns

### Hero Images
- Full-width background
- Grayscale filter (75% opacity)
- Ken Burns animation (slow zoom)
- Dark overlay gradient

### Feature Images
- Grayscale filter (60-70%)
- Hover: Reduced grayscale + scale transform
- Smooth cubic-bezier transitions
- Rounded corners (2px)

### Team Photos
- Circular crop
- Orange border (3px)
- Full color (no filter)
- 140px diameter

### Editorial/Aside Images
- 4:3 or 3:2 aspect ratio
- Grayscale baseline
- Zoom on hover (scale 1.05-1.06)
- Object-fit: cover

## 🔄 Image Effects

All images feature:
- ✅ Lazy loading (except hero)
- ✅ Hover interactions (zoom/filter changes)
- ✅ Responsive sizing
- ✅ Proper alt text
- ✅ Consistent cubic-bezier easing (0.16,1,0.3,1)
- ✅ Grayscale filter for consistency with white/black/orange theme

## 📱 Responsive Behavior

- **Text wrap images**: Float removed on mobile, full width
- **Two-column grids**: Stack vertically on mobile
- **Aside layouts**: Reverse stack (content first, then image)
- **Contact images**: Single column on mobile
