# 🖼️ HERO SLIDER IMAGE CONFIGURATION
## Homepage Carousel Images

> These are the official images for the SDA CRC homepage hero slider.
> All images provided by the conference should be placed in `public/images/hero/`

---

## 📸 IMAGES TO USE

Based on the images provided, here is the exact configuration for the hero slider:

### Slide 1: "The Preacher" (Primary Hero)
- **File:** `worship-preacher.jpg`
- **Source Image:** Pastor in yellow clergy shirt at pulpit with Bible
- **Alt Text:** "Pastor preaching at SDA Cross River Conference"
- **Overlay Text:**
  - Headline: "Proclaiming the Everlasting Gospel"
  - Subtext: "Welcome to the Seventh-day Adventist Church, Cross River Conference"
- **CTA Buttons:** "Watch Live" | "Join Us"
- **Background Position:** `center top` (to keep the preacher's face visible)

### Slide 2: "Worship Together" (Community)
- **File:** `worship-congregation.jpg`
- **Source Image:** Three people leading worship at the front
- **Alt Text:** "Congregation members leading worship at SDA CRC"
- **Overlay Text:**
  - Headline: "Enter to Worship, Depart to Serve"
  - Subtext: "Join our vibrant community of believers in Calabar"
- **CTA Buttons:** "Small Care Groups" | "Events"
- **Background Position:** `center center`

### Slide 3: "The Youth" (Pathfinders/AYM)
- **File:** `pathfinders-youth.jpg`
- **Source Image:** Three young men in Pathfinder uniforms with orange scarves
- **Alt Text:** "Master Guides and Pathfinders of SDA Cross River Conference"
- **Overlay Text:**
  - Headline: "Training Champions for Christ"
  - Subtext: "Adventist Youth Ministries preparing a generation for mission"
- **CTA Buttons:** "Youth Ministry" | "Join Pathfinders"
- **Background Position:** `center center`

---

## 🔧 COMPONENT IMPLEMENTATION

```tsx
// components/sanctuary/home/hero-slider.tsx

const heroSlides = [
  {
    id: 1,
    image: "/images/hero/worship-preacher.jpg",
    alt: "Pastor preaching at SDA Cross River Conference",
    headline: "Proclaiming the Everlasting Gospel",
    subtext: "Welcome to the Seventh-day Adventist Church, Cross River Conference",
    primaryCta: { text: "Watch Live", href: "/live" },
    secondaryCta: { text: "Join Us", href: "/join" },
    position: "center top",
  },
  {
    id: 2,
    image: "/images/hero/worship-congregation.jpg",
    alt: "Congregation members leading worship at SDA CRC",
    headline: "Enter to Worship, Depart to Serve",
    subtext: "Join our vibrant community of believers in Calabar",
    primaryCta: { text: "Small Care Groups", href: "/small-groups" },
    secondaryCta: { text: "Events", href: "/events" },
    position: "center center",
  },
  {
    id: 3,
    image: "/images/hero/pathfinders-youth.jpg",
    alt: "Master Guides and Pathfinders of SDA Cross River Conference",
    headline: "Training Champions for Christ",
    subtext: "Adventist Youth Ministries preparing a generation for mission",
    primaryCta: { text: "Youth Ministry", href: "/departments/aym" },
    secondaryCta: { text: "Join Pathfinders", href: "/join" },
    position: "center center",
  },
];
```

---

## 📋 IMAGE PROCESSING CHECKLIST

Before placing images in `public/images/hero/`:

- [ ] **Resize** to max 1920px width
- [ ] **Compress** using Squoosh or TinyPNG (target: < 200KB each)
- [ ] **Convert** to WebP format with JPEG fallback
- [ ] **Optimize** aspect ratio for 16:9 or 4:3
- [ ] **Create** blur placeholder for each image

### Recommended Processing Steps:

```bash
# Using Sharp (Node.js)
# This will be handled by Next.js Image component automatically

# For manual preprocessing, use:
# - Squoosh.app (Google's web-based tool)
# - ImageOptim (Mac)
# - TinyPNG (Web)
```

---

## 📱 RESPONSIVE CONSIDERATIONS

| Viewport | Image Display | Text Size |
|----------|---------------|-----------|
| Mobile (< 640px) | Cover, center focus | Headline: 2rem |
| Tablet (640-1024px) | Cover, full width | Headline: 2.5rem |
| Desktop (> 1024px) | Cover with parallax | Headline: 3.5rem |

### Mobile Cropping Notes:
- **Slide 1:** Crop focuses on preacher's upper body
- **Slide 2:** Crop focuses on central figures
- **Slide 3:** Crop focuses on all three youth (works well at any ratio)

---

## ⏱️ SLIDER TIMING

| Setting | Value |
|---------|-------|
| **Auto-advance interval** | 5000ms (5 seconds) |
| **Transition duration** | 800ms |
| **Pause on hover** | Yes |
| **Swipe on mobile** | Yes |
| **Keyboard navigation** | Yes (arrows) |
| **Indicator dots** | Yes (bottom center) |

---

## 🎨 OVERLAY STYLING

```css
/* Dark gradient overlay for text legibility */
.hero-overlay {
  background: linear-gradient(
    to bottom,
    rgba(0, 48, 135, 0.7) 0%,   /* SDA Blue at top */
    rgba(0, 48, 135, 0.5) 100%  /* Lighter at bottom */
  );
}

/* Ensure text pops */
.hero-headline {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
```

---

*These images represent the heart of SDA Cross River Conference—the preachers, the worshippers, and the youth. Let them shine on the homepage!*
