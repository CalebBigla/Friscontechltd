# Team Member Image Modal/Lightbox Feature

## Summary
Added a lightbox/modal popup when clicking team member photos on the About page. Users can now click any team member photo to view it larger with a clean, elegant modal overlay.

## What Changed

### Files Modified (2)

1. **`src/routes/about.tsx`**
   - Added `useState` import for modal state
   - Added `ImageModal` component import
   - Added `modalImage` state to track which image is open
   - Made team photos clickable with `onClick` handler
   - Added keyboard accessibility (Enter/Space to open)
   - Renders `ImageModal` component when image is clicked

2. **`src/styles.css`**
   - Added `.image-modal-overlay` - Dark backdrop with blur
   - Added `.image-modal-content` - Modal container
   - Added `.image-modal-close` - Close button with hover effect
   - Added `.image-modal-img` - Image display with shadow
   - Added `.image-modal-caption` - Caption area for name/title
   - Added hover effects for team photos (cursor pointer, scale)

### Files Created (1)

1. **`src/components/ImageModal.tsx`**
   - Reusable modal/lightbox component
   - Features:
     - Dark backdrop with blur effect
     - Close button (top right)
     - Close on Escape key
     - Close on backdrop click
     - Prevents body scroll when open
     - Smooth fade-in animation
     - Image zoom-in animation
     - Caption with name and title
     - Fully accessible (ARIA attributes)

## Features

### User Experience
- ✅ Click any team member photo to view larger
- ✅ Dark backdrop (92% opacity) with blur effect
- ✅ Close by clicking X button
- ✅ Close by clicking backdrop (outside image)
- ✅ Close by pressing Escape key
- ✅ Smooth fade-in and zoom animations
- ✅ Prevents page scrolling when modal is open
- ✅ Shows team member name and title as caption

### Accessibility
- ✅ Keyboard navigation (Enter/Space to open, Escape to close)
- ✅ ARIA attributes for screen readers
- ✅ Focus management
- ✅ Role and aria-modal attributes
- ✅ Descriptive aria-labels

### Visual Design
- ✅ Matches site design system (Navy/Amber/Green colors)
- ✅ Smooth cubic-bezier animations
- ✅ Hover effects on team photos (scale + border color change)
- ✅ Close button changes to amber on hover
- ✅ Image has shadow for depth
- ✅ Responsive (max 90vw/90vh)

## How It Works

### User Flow
```
1. User visits About page
2. Scrolls to Leadership section
3. Hovers over team photo (sees scale + border effect)
4. Clicks photo
5. Modal opens with fade-in animation
6. Image zooms in smoothly
7. User sees larger photo with name/title caption
8. User can:
   - Click X button to close
   - Click backdrop to close
   - Press Escape to close
9. Modal closes with fade-out
10. Page scroll restored
```

### Technical Flow
```
User clicks photo
    ↓
onClick handler fires
    ↓
setModalImage({ url, name, title })
    ↓
ImageModal receives props
    ↓
useEffect adds event listeners
    ↓
Body scroll disabled
    ↓
Modal renders with animation
    ↓
User closes modal
    ↓
setModalImage(null)
    ↓
useEffect cleanup runs
    ↓
Body scroll restored
    ↓
Modal unmounts
```

## CSS Classes Added

```css
.image-modal-overlay       /* Backdrop (dark + blur) */
.image-modal-content       /* Modal container */
.image-modal-close         /* Close button */
.image-modal-img           /* Image element */
.image-modal-caption       /* Caption container */
.image-modal-title         /* Name text */
.image-modal-subtitle      /* Title text */
```

## Animations

### Modal Fade-In (0.25s)
```css
from { opacity: 0; }
to { opacity: 1; }
```

### Image Zoom-In (0.35s)
```css
from {
  opacity: 0;
  transform: scale(0.9);
}
to {
  opacity: 1;
  transform: scale(1);
}
```

### Team Photo Hover
```css
transform: scale(1.05);
border-color: var(--green);
```

## Component API

### ImageModal Props

```tsx
interface ImageModalProps {
  isOpen: boolean;              // Modal visibility
  onClose: () => void;          // Close callback
  imageUrl: string;             // Image source URL
  altText: string;              // Alt text for accessibility
  title?: string;               // Optional title (name)
  subtitle?: string;            // Optional subtitle (role)
}
```

### Usage Example

```tsx
const [modalImage, setModalImage] = useState<{
  url: string;
  name: string;
  title: string;
} | null>(null);

// In JSX
<div onClick={() => setModalImage({
  url: member.image_url,
  name: member.name,
  title: member.title,
})}>
  <img src={member.image_url} alt={member.name} />
</div>

{modalImage && (
  <ImageModal
    isOpen={true}
    onClose={() => setModalImage(null)}
    imageUrl={modalImage.url}
    altText={modalImage.name}
    title={modalImage.name}
    subtitle={modalImage.title}
  />
)}
```

## Browser Compatibility

### Modern Features Used
- ✅ `backdrop-filter: blur()` - All modern browsers
- ✅ CSS animations - All browsers
- ✅ oklch colors - All modern browsers
- ✅ `inset` shorthand - All modern browsers

### Fallbacks
- No fallback needed - gracefully degrades in older browsers
- Modal still functional without blur effect
- Image still displays without animations

## Performance

### Optimizations
- ✅ Modal only renders when `isOpen={true}`
- ✅ Event listeners added/removed on mount/unmount
- ✅ No unnecessary re-renders
- ✅ CSS animations use GPU acceleration
- ✅ Images already loaded (from team cards)

### Bundle Size Impact
- Component: ~2KB
- CSS: ~1KB
- Total: ~3KB added

## Testing Checklist

- [x] Click team photo opens modal
- [x] Click X button closes modal
- [x] Click backdrop closes modal
- [x] Press Escape closes modal
- [x] Keyboard navigation works (Enter/Space)
- [x] Body scroll disabled when open
- [x] Body scroll restored when closed
- [x] Caption shows name and title
- [x] Animations are smooth
- [x] Hover effects work on team photos
- [x] Works with uploaded images
- [x] Works with default avatar fallback
- [x] Mobile responsive
- [x] No console errors
- [x] Accessible to screen readers

## Mobile Experience

### Responsive Design
- Modal adapts to screen size (max 90vw/90vh)
- Touch-friendly close button (44px)
- Backdrop tap to close works
- Image scales down on small screens
- Caption text remains readable

### Mobile-Specific
- No hover effects (click to open directly)
- Close button positioned for thumb reach
- Image pinch-zoom disabled (single tap to close instead)

## Future Enhancements (Optional)

1. **Image Gallery Navigation**
   - Add left/right arrows
   - Navigate between team members without closing

2. **Swipe Gestures**
   - Swipe left/right to navigate
   - Swipe down to close

3. **Image Zoom**
   - Pinch to zoom on mobile
   - Scroll to zoom on desktop

4. **Image Loading States**
   - Show loading spinner for large images
   - Blur-up effect

5. **Share Button**
   - Share team member profile
   - Download image option

## Accessibility Features

### Screen Reader Support
- `role="dialog"` on overlay
- `aria-modal="true"` indicates modal context
- `aria-labelledby` connects title to modal
- `aria-label` on close button
- `alt` text on image

### Keyboard Navigation
- Tab to close button
- Enter/Space to open modal
- Escape to close modal
- Focus trapped within modal

### Color Contrast
- Close button: High contrast white/amber on dark
- Caption text: White on dark (WCAG AAA)

## Known Limitations

1. **No Image Preloading**
   - Images loaded on demand (same as page)
   - Not an issue since images already loaded in team cards

2. **Single Image Only**
   - No gallery navigation between team members
   - Must close and open next image

3. **No Animation Preferences**
   - No `prefers-reduced-motion` support yet
   - Could be added as enhancement

These limitations are acceptable for v1 and can be addressed later if needed.

---

**Implementation Date:** September 14, 2026  
**Status:** ✅ Complete  
**Breaking Changes:** None  
**Dependencies:** None (pure CSS + React)  
**Bundle Size:** +3KB
