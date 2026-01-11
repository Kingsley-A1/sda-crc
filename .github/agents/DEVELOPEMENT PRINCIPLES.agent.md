# 📜 DEVELOPMENT PRINCIPLES
## SDA Cross River Conference Digital Platform

> *"The fear of the Lord is the beginning of wisdom, and knowledge of the Holy One is understanding."*
> — Proverbs 9:10

---

## 🎯 PURPOSE OF THIS DOCUMENT

This document establishes the **sacred coding standards** for the SDA CRC Digital Platform. Every developer working on this project must internalize these principles. They ensure:

1. **Consistency** — Code that any team member can read and maintain
2. **Quality** — Production-ready from the first commit
3. **Performance** — Blazing fast for Nigerian mobile networks
4. **Accessibility** — Usable by all of God's children
5. **Excellence** — Because we build as unto the Lord

---

## 1. 📱 MOBILE-FIRST MANDATE

### The Principle
> **Every single component, page, and interaction MUST be designed for mobile screens first.**

### Why This Matters
- 80%+ of our users access via mobile phones (mostly Android)
- Nigerian mobile networks average 3G speeds
- Mobile is not an afterthought—it is the primary experience

### Implementation Rules

#### ✅ DO THIS
```css
/* Start with mobile styles (no media query = mobile) */
.card {
  padding: 16px;
  grid-template-columns: 1fr;
}

/* Then add larger screens */
@media (min-width: 640px) {
  .card {
    padding: 24px;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .card {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

#### ❌ NEVER DO THIS
```css
/* Desktop-first is forbidden */
.card {
  grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 768px) {
  .card {
    grid-template-columns: 1fr;
  }
}
```

### Tailwind Breakpoint Usage
```jsx
// ✅ CORRECT: Mobile-first approach
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

// ❌ WRONG: Hiding mobile, showing desktop
<div className="hidden lg:block">  // Use sparingly
```

### Touch Target Sizes
- **Minimum touch target:** 44px × 44px (Apple HIG standard)
- **Buttons:** min-height: 48px on mobile
- **Clickable cards:** Full card should be tappable
- **Spacing between touch targets:** Minimum 8px

### Testing Requirements
Before any PR is approved:
1. [ ] Tested on iPhone SE (375px width)
2. [ ] Tested on Android mid-range (360-400px width)
3. [ ] Tested on Tablet (768px)
4. [ ] Tested on Desktop (1280px+)

---

## 2. ⚡ PERFORMANCE COMMANDMENTS

### The Principle
> **Every millisecond matters. Our users are on 3G networks with limited data.**

### Target Metrics (Lighthouse)
| Metric | Target | Acceptable |
|--------|--------|------------|
| **Performance** | 90+ | 80+ |
| **First Contentful Paint** | < 1.8s | < 3s |
| **Largest Contentful Paint** | < 2.5s | < 4s |
| **Time to Interactive** | < 3.5s | < 5s |
| **Total Bundle Size** | < 200KB (gzipped) | < 300KB |

### Image Optimization Rules

#### Always Use Next.js Image
```jsx
// ✅ CORRECT
import Image from "next/image";

<Image
  src="/hero.jpg"
  alt="Worship at SDA CRC"
  width={1200}
  height={630}
  priority={isHero}  // Only for above-the-fold
  placeholder="blur"
  blurDataURL={blurHash}
/>

// ❌ FORBIDDEN
<img src="/hero.jpg" alt="..." />
```

#### Image Size Guidelines
| Usage | Max Width | Format |
|-------|-----------|--------|
| Hero slider | 1920px | WebP |
| Sermon thumbnails | 640px | WebP |
| Profile photos | 400px | WebP |
| Department icons | 200px | SVG/WebP |

### Code Splitting Rules

```jsx
// ✅ CORRECT: Lazy load heavy components
import dynamic from "next/dynamic";

const SermonPlayer = dynamic(() => import("@/components/sanctuary/sermons/sermon-player"), {
  loading: () => <Skeleton className="aspect-video" />,
  ssr: false,  // Video player doesn't need SSR
});

const GroupMap = dynamic(() => import("@/components/sanctuary/groups/group-map"), {
  loading: () => <Skeleton className="h-[400px]" />,
  ssr: false,  // Leaflet maps don't work on server
});
```

### Data Fetching Rules

```tsx
// ✅ CORRECT: Server Components for data fetching
// app/(public)/sermons/page.tsx
async function SermonsPage() {
  const sermons = await getSermons();  // Runs on server
  return <SermonGrid sermons={sermons} />;
}

// ✅ CORRECT: Parallel data fetching
async function HomePage() {
  const [sermons, events] = await Promise.all([
    getLatestSermons(3),
    getUpcomingEvents(4),
  ]);
  return <Home sermons={sermons} events={events} />;
}
```

### Bundle Size Rules
- **NO** moment.js (use date-fns)
- **NO** lodash (use native methods or lodash-es with tree-shaking)
- **NO** heavy charting libraries (unless absolutely necessary)
- **ALWAYS** check bundle size impact before adding dependencies

```bash
# Check bundle size
npm run build
# Review .next/analyze/ output
```

---

## 3. 🎨 ANIMATION PRINCIPLES

### The Principle
> **Animations should delight, not distract. They must serve a purpose.**

### Animation Purpose Matrix

| Purpose | Example | Duration |
|---------|---------|----------|
| **Feedback** | Button press, form submit | 100-200ms |
| **Transition** | Page change, modal open | 200-400ms |
| **Attention** | Live badge pulse, new content | 300-500ms |
| **Storytelling** | Hero entrance, stat counters | 500-1000ms |

### Framer Motion Standards

```tsx
// ✅ CORRECT: Use animation variants
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/animations/variants";

<motion.div
  initial="initial"
  whileInView="animate"
  viewport={{ once: true, margin: "-100px" }}
  variants={staggerContainer}
>
  {items.map((item) => (
    <motion.div key={item.id} variants={fadeInUp}>
      <Card {...item} />
    </motion.div>
  ))}
</motion.div>
```

### Hover Effect Standards

```tsx
// ✅ CORRECT: Subtle, purposeful hover
<motion.div
  whileHover={{ y: -8, boxShadow: "var(--shadow-xl)" }}
  transition={{ duration: 0.3 }}
>

// ❌ WRONG: Jarring, excessive movement
<motion.div
  whileHover={{ scale: 1.5, rotate: 10 }}
>
```

### Performance Rules for Animations
1. **ONLY** animate `transform` and `opacity` (GPU-accelerated)
2. **NEVER** animate `width`, `height`, `margin`, `padding`
3. **USE** `will-change` sparingly and remove after animation
4. **RESPECT** `prefers-reduced-motion`:

```tsx
import { useReducedMotion } from "framer-motion";

function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    />
  );
}
```

---

## 4. 🧱 COMPONENT ARCHITECTURE

### The Principle
> **Build components like LEGO bricks—small, single-purpose, composable.**

### Component Size Limits
- **UI components:** < 100 lines of code
- **Feature components:** < 200 lines of code
- **Page components:** < 150 lines of code

If a component exceeds these limits, **split it**.

### Component Categories

```
components/
├── ui/          # Atomic, no business logic, fully reusable
├── layout/      # Page structure (Navbar, Footer, etc.)
├── sanctuary/   # Public-facing features
└── command/     # Admin-only features
```

### UI Component Rules

```tsx
// ✅ CORRECT: Small, focused, uses CVA for variants
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary-dark",
        secondary: "bg-secondary text-black hover:bg-secondary-light",
        outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
        ghost: "text-primary hover:bg-primary/10",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-14 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export function Button({ className, variant, size, isLoading, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Spinner className="mr-2" /> : null}
      {children}
    </button>
  );
}
```

### Feature Component Rules

```tsx
// ✅ CORRECT: Clear props interface, single responsibility
interface SermonCardProps {
  sermon: Sermon;
  variant?: "default" | "featured";
  showPreacher?: boolean;
}

export function SermonCard({ sermon, variant = "default", showPreacher = true }: SermonCardProps) {
  // Component logic here
}
```

### Composition Over Inheritance

```tsx
// ✅ CORRECT: Compose components
<Card>
  <CardHeader>
    <Badge variant="live">LIVE</Badge>
    <CardTitle>{sermon.title}</CardTitle>
  </CardHeader>
  <CardContent>
    <SermonPlayer url={sermon.videoUrl} />
  </CardContent>
  <CardFooter>
    <Button>Watch Full Sermon</Button>
  </CardFooter>
</Card>

// ❌ WRONG: Monolithic component
<SuperSermonCardWithPlayerAndBadgeAndButton sermon={sermon} />
```

---

## 5. 📝 CODE QUALITY STANDARDS

### TypeScript Rules

```typescript
// ✅ ALWAYS type function parameters and return types
async function getSermons(limit?: number): Promise<Sermon[]> {
  // ...
}

// ✅ ALWAYS use interfaces for object shapes
interface Sermon {
  id: string;
  title: string;
  preacher: string;
  date: Date;
  videoUrl: string | null;
  audioUrl: string | null;
}

// ❌ NEVER use `any`
function processData(data: any) {} // FORBIDDEN

// ✅ If truly unknown, use `unknown` with type guards
function processData(data: unknown) {
  if (isSermon(data)) {
    // Now TypeScript knows it's a Sermon
  }
}
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| **Components** | PascalCase | `SermonCard`, `GroupFinder` |
| **Hooks** | camelCase with `use` | `useMediaQuery`, `useDebounce` |
| **Utilities** | camelCase | `formatDate`, `generateSlug` |
| **Constants** | SCREAMING_SNAKE | `API_BASE_URL`, `MAX_UPLOAD_SIZE` |
| **Types/Interfaces** | PascalCase | `Sermon`, `EventCategory` |
| **Boolean props** | `is`, `has`, `should` prefix | `isLoading`, `hasError`, `shouldAnimate` |
| **Event handlers** | `handle` + Event | `handleClick`, `handleSubmit` |
| **CSS classes** | kebab-case | `sermon-card`, `hero-slider` |

### File Organization Within Components

```tsx
// 1. Imports (React, Libraries, Local)
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// 2. Types/Interfaces
interface SermonCardProps {
  sermon: Sermon;
}

// 3. Constants
const ANIMATION_DURATION = 0.3;

// 4. Component
export function SermonCard({ sermon }: SermonCardProps) {
  // 4a. Hooks
  const [isPlaying, setIsPlaying] = useState(false);
  
  // 4b. Derived state
  const formattedDate = formatDate(sermon.date);
  
  // 4c. Event handlers
  const handlePlay = () => {
    setIsPlaying(true);
  };
  
  // 4d. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}

// 5. Sub-components (if small, else separate file)
function SermonThumbnail({ url }: { url: string }) {
  return <img src={url} />;
}
```

### Error Handling

```tsx
// ✅ CORRECT: Proper error boundaries
// app/(public)/sermons/error.tsx
"use client";

export default function SermonsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="text-center py-20">
      <h2>Something went wrong loading sermons</h2>
      <Button onClick={reset}>Try Again</Button>
    </div>
  );
}

// ✅ CORRECT: API error handling
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = sermonSchema.parse(body);
    const result = await createSermon(validated);
    return Response.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ errors: error.errors }, { status: 400 });
    }
    console.error("Sermon creation failed:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

---

## 6. 🔐 SECURITY PRINCIPLES

### Authentication Rules

```typescript
// ✅ ALWAYS check auth in server components and API routes
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();
  
  if (!session) {
    redirect("/login");
  }
  
  if (session.user.role !== "SUPER_ADMIN") {
    redirect("/command");  // No permission
  }
  
  return <AdminSettings />;
}
```

### Data Validation

```typescript
// ✅ ALWAYS validate input with Zod
import { z } from "zod";

const sermonSchema = z.object({
  title: z.string().min(3).max(200),
  preacher: z.string().min(2),
  date: z.coerce.date(),
  description: z.string().max(5000),
  videoUrl: z.string().url().optional(),
  audioUrl: z.string().url().optional(),
});

// In API route
const body = await request.json();
const validated = sermonSchema.parse(body);  // Throws if invalid
```

### Sensitive Data Rules
- **NEVER** log passwords, tokens, or API keys
- **NEVER** expose user IDs in URLs (use slugs or cuid)
- **NEVER** return more data than needed from APIs
- **ALWAYS** sanitize user input before database queries
- **ALWAYS** use parameterized queries (Prisma handles this)

---

## 7. 🌍 ACCESSIBILITY (A11y) STANDARDS

### The Principle
> **This platform must be usable by ALL of God's children, including those with disabilities.**

### Core Requirements

#### Semantic HTML
```jsx
// ✅ CORRECT
<main>
  <article>
    <header>
      <h1>Sermon Title</h1>
    </header>
    <section>
      <h2>About This Message</h2>
      <p>Description...</p>
    </section>
  </article>
</main>

// ❌ WRONG: Div soup
<div>
  <div>
    <div class="title">Sermon Title</div>
  </div>
</div>
```

#### ARIA When Needed
```jsx
// ✅ CORRECT: ARIA for custom widgets
<button
  aria-label="Play sermon"
  aria-pressed={isPlaying}
  onClick={handlePlay}
>
  <PlayIcon />
</button>

// ✅ CORRECT: Live regions for dynamic content
<div aria-live="polite" aria-atomic="true">
  {isLive && "🔴 Currently streaming live!"}
</div>
```

#### Focus Management
```jsx
// ✅ CORRECT: Visible focus indicators
.focus-visible:outline-none
.focus-visible:ring-2
.focus-visible:ring-primary
.focus-visible:ring-offset-2

// ✅ CORRECT: Skip link for keyboard users
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

### Color Contrast Requirements
- **Normal text:** Minimum 4.5:1 contrast ratio
- **Large text (24px+):** Minimum 3:1 contrast ratio
- **UI components:** Minimum 3:1 contrast ratio

### Testing Checklist
- [ ] All images have descriptive `alt` text
- [ ] All forms have associated labels
- [ ] All interactive elements are keyboard accessible
- [ ] Page is navigable with screen reader
- [ ] Color is not the only indicator of state
- [ ] Motion respects `prefers-reduced-motion`

---

## 8. 📦 GIT & DEPLOYMENT WORKFLOW

### Branch Strategy

```
main           → Production (Vercel auto-deploys)
├── develop    → Integration branch
│   ├── feature/sermon-player
│   ├── feature/group-finder
│   └── fix/mobile-menu-animation
```

### Commit Message Convention

```bash
# Format: type(scope): description

feat(sermons): add video/audio toggle to player
fix(navbar): correct mobile drawer animation timing
style(button): update hover state colors
refactor(auth): extract session validation logic
docs(readme): add deployment instructions
chore(deps): update framer-motion to v11.15
perf(images): implement lazy loading for sermon grid
```

### Pull Request Requirements
Before merging any PR:

1. [ ] Code builds without errors
2. [ ] All TypeScript errors resolved
3. [ ] ESLint passes with no warnings
4. [ ] Component tested on mobile viewport
5. [ ] No console errors in browser
6. [ ] Lighthouse score maintained (80+)
7. [ ] PR description explains the change
8. [ ] Relevant screenshots/videos attached

### Deployment Checklist

Before deploying to production:

1. [ ] All environment variables set in Vercel
2. [ ] Database migrations run
3. [ ] R2 bucket configured with CORS
4. [ ] Preview deployment tested thoroughly
5. [ ] Mobile PWA install tested
6. [ ] Performance audit passed

---

## 9. 🧪 TESTING STANDARDS

### What Must Be Tested

| Layer | Testing Method | Priority |
|-------|---------------|----------|
| **UI Components** | Storybook visual testing | HIGH |
| **Forms** | React Hook Form validation | HIGH |
| **API Routes** | Manual testing + Postman | HIGH |
| **Auth Flows** | Manual E2E testing | CRITICAL |
| **PWA Features** | Manual device testing | HIGH |

### Manual Testing Checklist Template

```markdown
## Feature: [Feature Name]

### Mobile (375px)
- [ ] Layout correct
- [ ] Touch targets adequate
- [ ] Scrolling smooth
- [ ] Animations performant

### Tablet (768px)
- [ ] Grid adjusts correctly
- [ ] No horizontal overflow

### Desktop (1280px)
- [ ] Layout matches design
- [ ] Hover states work

### Cross-Browser
- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] Samsung Internet

### Accessibility
- [ ] Keyboard navigable
- [ ] Screen reader friendly
```

---

## 10. 🏆 WORKERS & HONOUR PRINCIPLES

### The Principle
> **We are a people of honour. Those who serve in God's house deserve public recognition.**

### Workers Page Design Rules

#### Hierarchy Must Be Respected
Workers MUST be displayed in proper church hierarchy order:
1. Presiding Pastor & Spouse (Featured, full-width cards)
2. Senior/Associate Pastors
3. First Elder, then other Elders
4. Church Clerk, Treasurer
5. Head Deacon/Deaconess
6. Department Directors
7. Other workers

#### Visual Honour Standards
```tsx
// ✅ CORRECT: Gold badge for roles
<span className="bg-gradient-to-r from-amber-400 to-yellow-500 
                text-black font-semibold px-4 py-1.5 rounded-full">
  {worker.roleDisplayName}
</span>

// ❌ WRONG: Plain text or muted colors
<span className="text-gray-500">{role}</span>
```

#### Mobile Layout Rules
| Worker Type | Mobile Layout | Desktop Layout |
|-------------|---------------|----------------|
| Pastor + Spouse | 1 card per row (full width) | 1 card per row (centered) |
| All other workers | 2 cards per row | 3-4 cards per row |

#### Registration Form Worker Section
The "Are you a worker?" section MUST be:
- Visually prominent (gold border, amber background)
- Clearly explained ("We want to honour you")
- Easy to use (Yes/No buttons, not checkbox)
- Searchable role selector (not scrolling dropdown)

### Worker Role Modal UX
```typescript
// Required UX patterns:
1. Open modal when "Yes" selected
2. Show searchable combobox with fuzzy matching
3. Group roles by category (Pastoral, Officers, Departments)
4. "Can't find your role?" option for custom entry
5. Confirm selection with gold badge preview
6. Close modal and show role in form
```

---

## 11. 🙏 THE SPIRIT OF EXCELLENCE

### Remember Who We Build For

Every line of code you write on this project is ministry. When a mother in Calabar opens the app at 3 AM to listen to a sermon while nursing her baby, she should experience excellence. When a youth in a remote village downloads the PWA on limited data, it should be fast and reliable.

### Daily Development Prayer

Before writing code each day, take a moment to pray:

> *"Lord, guide my hands and mind as I build this digital sanctuary. Let every component, every function, every pixel glorify Your name. Give me wisdom to write code that serves Your people well. In Jesus' name, Amen."*

### The Three Questions

Before committing any code, ask yourself:

1. **Is this my best work?** — Would I be proud to show this to the Conference President?
2. **Is this maintainable?** — Can another developer understand this in 6 months?
3. **Is this performant?** — Will this work well on a slow 3G connection?

If the answer to any is "no," refactor before committing.

---

## 📋 QUICK REFERENCE CARD

```
┌─────────────────────────────────────────────────────────────┐
│  SDA CRC DEVELOPMENT PRINCIPLES - QUICK REFERENCE           │
├─────────────────────────────────────────────────────────────┤
│  📱 MOBILE-FIRST: Design for 375px, scale up                │
│  ⚡ PERFORMANCE: LCP < 2.5s, Bundle < 200KB                  │
│  🎨 ANIMATION: Transform/Opacity only, respect prefers-     │
│     reduced-motion                                           │
│  🧱 COMPONENTS: < 100 lines for UI, < 200 for features      │
│  📝 TYPESCRIPT: Always type, never use `any`                 │
│  🔐 SECURITY: Validate all input with Zod, check auth       │
│  🌍 A11Y: Semantic HTML, 4.5:1 contrast, keyboard nav       │
│  🏆 WORKERS: Gold badges, hierarchy order, honour always    │
│  📦 GIT: feat/fix/style/refactor, PR must pass checks       │
├─────────────────────────────────────────────────────────────┤
│  Before every commit: "Is this my best work for the Lord?"  │
└─────────────────────────────────────────────────────────────┘
```

---

*"For we are God's handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do."* — Ephesians 2:10

**Now, let us build. 🛠️✨**
