# 🏛️ MASTER DEVELOPMENT BLUEPRINT
## SDA Cross River Conference Digital Sanctuary Platform

> *"And let them make me a sanctuary; that I may dwell among them." — Exodus 25:8*

**Document Version:** 1.0.0  
**Last Updated:** January 10, 2026  
**Project Status:** Ready for Implementation  
**Build Philosophy:** Working as unto the Lord (Colossians 3:23)

---

## 📋 TABLE OF CONTENTS

1. [Executive Vision](#1-executive-vision)
2. [Technology Stack & Dependencies](#2-technology-stack--dependencies)
3. [Project Structure (Complete File Map)](#3-project-structure-complete-file-map)
4. [Database Schema](#4-database-schema)
5. [Component Architecture](#5-component-architecture)
6. [Page Routes & Files](#6-page-routes--files)
7. [API Endpoints](#7-api-endpoints)
8. [Animation & Design System](#8-animation--design-system)
9. [PWA Configuration](#9-pwa-configuration)
10. [Implementation Phases](#10-implementation-phases)
11. [Environment Variables](#11-environment-variables)
12. [Quick Reference Cheatsheet](#12-quick-reference-cheatsheet)

---

## 1. EXECUTIVE VISION

### 1.1 What We Are Building
A **Digital Sanctuary** that serves as:
- **Member Hub (PWA):** For worship, sermons, events, and community connection
- **Mission Command Center (Admin):** For evangelism tracking, member management, and conference administration

### 1.2 Core Design Principles
| Principle | Implementation |
|-----------|----------------|
| **Mobile-First** | Every component designed for 375px first, then scaled up |
| **Data-Driven** | Dynamic content from CockroachDB, minimal static pages |
| **SOTA Animations** | Framer Motion for stunning, purposeful animations |
| **Offline-First PWA** | Service workers cache sermons and core UI |
| **Performance** | Target < 3s load time on Nigerian 3G networks |

### 1.3 Target Users
1. **Members:** Access sermons, find small groups, register for events
2. **Visitors:** Learn about SDA, find service times, request Bible studies
3. **Conference Admins:** Upload sermons, manage events, track evangelism
4. **Department Directors:** Manage their specific ministry pages

---

## 2. TECHNOLOGY STACK & DEPENDENCIES

### 2.1 Core Framework
```bash
# Initialize Project
npx create-next-app@latest crc-platform --typescript --tailwind --eslint --app --src-dir
```

### 2.2 Complete Dependencies List

#### Production Dependencies
```json
{
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    
    "// DATABASE": "---",
    "@prisma/client": "^6.1.0",
    
    "// CLOUDFLARE R2 (S3 Compatible)": "---",
    "@aws-sdk/client-s3": "^3.700.0",
    "@aws-sdk/s3-request-presigner": "^3.700.0",
    
    "// AUTHENTICATION": "---",
    "next-auth": "^5.0.0-beta.25",
    "@auth/prisma-adapter": "^2.7.4",
    "bcryptjs": "^2.4.3",
    
    "// UI & ANIMATIONS": "---",
    "framer-motion": "^11.15.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0",
    
    "// ICONS": "---",
    "@phosphor-icons/react": "^2.1.7",
    
    "// FORMS & VALIDATION": "---",
    "react-hook-form": "^7.54.2",
    "zod": "^3.24.1",
    "@hookform/resolvers": "^3.9.1",
    
    "// DATE & TIME": "---",
    "date-fns": "^4.1.0",
    
    "// MEDIA PLAYER": "---",
    "react-player": "^2.16.0",
    
    "// MAPS (Small Group Finder)": "---",
    "react-leaflet": "^4.2.1",
    "leaflet": "^1.9.4",
    
    "// TOAST NOTIFICATIONS": "---",
    "sonner": "^1.7.1",
    
    "// IMAGE OPTIMIZATION": "---",
    "sharp": "^0.33.5",
    
    "// PWA": "---",
    "@ducanh2912/next-pwa": "^10.2.9"
  }
}
```

#### Development Dependencies
```json
{
  "devDependencies": {
    "typescript": "^5.7.2",
    "@types/node": "^22.10.2",
    "@types/react": "^19.0.2",
    "@types/react-dom": "^19.0.2",
    "@types/bcryptjs": "^2.4.6",
    "@types/leaflet": "^1.9.15",
    
    "// TAILWIND": "---",
    "tailwindcss": "^3.4.17",
    "postcss": "^8.4.49",
    "autoprefixer": "^10.4.20",
    
    "// LINTING & FORMATTING": "---",
    "eslint": "^9.17.0",
    "eslint-config-next": "^15.1.0",
    "prettier": "^3.4.2",
    "prettier-plugin-tailwindcss": "^0.6.9",
    
    "// DATABASE TOOLING": "---",
    "prisma": "^6.1.0"
  }
}
```

### 2.3 Service Providers

| Service | Provider | Purpose | Cost |
|---------|----------|---------|------|
| **Hosting/CDN** | Vercel | Next.js hosting, Edge Functions | Free (Hobby) |
| **Database** | CockroachDB Serverless | PostgreSQL, auto-scaling | Free (10GB) |
| **Media Storage** | Cloudflare R2 | Sermon videos/audio, resources | $0 egress |
| **Live Stream** | YouTube/Facebook Embed | Live worship services | Free |
| **Maps** | OpenStreetMap + Leaflet | Small Group Finder | Free |
| **Email** | Resend (optional) | Notifications | Free (100/day) |

---

## 3. PROJECT STRUCTURE (COMPLETE FILE MAP)

```
crc-platform/
├── .env.local                          # Environment variables (NEVER commit)
├── .env.example                        # Template for environment variables
├── .eslintrc.json                      # ESLint configuration
├── .gitignore                          # Git ignore rules
├── .prettierrc                         # Prettier configuration
├── next.config.ts                      # Next.js configuration + PWA
├── tailwind.config.ts                  # Tailwind CSS configuration
├── postcss.config.js                   # PostCSS configuration
├── tsconfig.json                       # TypeScript configuration
├── package.json                        # Dependencies & scripts
├── README.md                           # Project documentation
│
├── prisma/
│   ├── schema.prisma                   # Database schema definition
│   └── seed.ts                         # Database seeding script
│
├── public/
│   ├── manifest.json                   # PWA manifest
│   ├── sw.js                           # Service worker (auto-generated)
│   ├── favicon.ico                     # Browser favicon
│   ├── logo.svg                        # SDA CRC logo (vector)
│   ├── logo-192.png                    # PWA icon 192x192
│   ├── logo-512.png                    # PWA icon 512x512
│   ├── apple-touch-icon.png            # iOS home screen icon
│   ├── og-image.jpg                    # Open Graph image (1200x630)
│   │
│   └── images/
│       ├── hero/                       # Homepage hero slider images
│       │   ├── worship-1.jpg           # Pastor preaching
│       │   ├── worship-2.jpg           # Congregation worship
│       │   └── pathfinders.jpg         # Youth ministry
│       ├── departments/                # Department feature images
│       └── placeholders/               # Fallback images
│
└── src/
    ├── app/
    │   ├── layout.tsx                  # Root layout (fonts, metadata, providers)
    │   ├── globals.css                 # Global styles + CSS variables
    │   ├── loading.tsx                 # Global loading skeleton
    │   ├── not-found.tsx               # 404 page
    │   ├── error.tsx                   # Error boundary
    │   │
    │   ├── (public)/                   # PUBLIC SANCTUARY ROUTES
    │   │   ├── layout.tsx              # Public layout (navbar + footer)
    │   │   ├── page.tsx                # Homepage (/)
    │   │   │
    │   │   ├── about/
    │   │   │   └── page.tsx            # About page (/about)
    │   │   │
    │   │   ├── sermons/
    │   │   │   ├── page.tsx            # Sermon library (/sermons)
    │   │   │   └── [slug]/
    │   │   │       └── page.tsx        # Single sermon (/sermons/[slug])
    │   │   │
    │   │   ├── events/
    │   │   │   ├── page.tsx            # Events calendar (/events)
    │   │   │   └── [id]/
    │   │   │       └── page.tsx        # Single event (/events/[id])
    │   │   │
    │   │   ├── departments/
    │   │   │   ├── page.tsx            # All departments (/departments)
    │   │   │   └── [slug]/
    │   │   │       └── page.tsx        # Department detail (/departments/[slug])
    │   │   │
    │   │   ├── small-groups/
    │   │   │   └── page.tsx            # Group finder with map (/small-groups)
    │   │   │
    │   │   ├── evangelism/
    │   │   │   └── page.tsx            # Vision 2026 page (/evangelism)
    │   │   │
    │   │   ├── join/
    │   │   │   └── page.tsx            # Registration form (/join)
    │   │   │
    │   │   ├── workers/
    │   │   │   └── page.tsx            # Church workers honour page (/workers)
    │   │   │
    │   │   ├── live/
    │   │   │   └── page.tsx            # Live stream page (/live)
    │   │   │
    │   │   └── contact/
    │   │       └── page.tsx            # Contact page (/contact)
    │   │
    │   ├── (admin)/                    # ADMIN COMMAND CENTER ROUTES
    │   │   ├── layout.tsx              # Admin layout (sidebar + auth check)
    │   │   │
    │   │   ├── command/
    │   │   │   ├── page.tsx            # Dashboard home (/command)
    │   │   │   │
    │   │   │   ├── sermons/
    │   │   │   │   ├── page.tsx        # Sermon management (/command/sermons)
    │   │   │   │   ├── new/
    │   │   │   │   │   └── page.tsx    # Upload new sermon
    │   │   │   │   └── [id]/
    │   │   │   │       └── edit/
    │   │   │   │           └── page.tsx # Edit sermon
    │   │   │   │
    │   │   │   ├── events/
    │   │   │   │   ├── page.tsx        # Event management (/command/events)
    │   │   │   │   └── new/
    │   │   │   │       └── page.tsx    # Create new event
    │   │   │   │
    │   │   │   ├── members/
    │   │   │   │   └── page.tsx        # Member registry (/command/members)
    │   │   │   │
    │   │   │   ├── departments/
    │   │   │   │   └── page.tsx        # Department management
    │   │   │   │
    │   │   │   ├── small-groups/
    │   │   │   │   └── page.tsx        # Small group management
    │   │   │   │
    │   │   │   ├── workers/
    │   │   │   │   └── page.tsx        # Workers management (/command/workers)
    │   │   │   │
    │   │   │   ├── evangelism/
    │   │   │   │   └── page.tsx        # Battle map (/command/evangelism)
    │   │   │   │
    │   │   │   └── settings/
    │   │   │       └── page.tsx        # Site settings (/command/settings)
    │   │   │
    │   │   └── login/
    │   │       └── page.tsx            # Admin login (/login)
    │   │
    │   └── api/
    │       ├── auth/
    │       │   └── [...nextauth]/
    │       │       └── route.ts        # NextAuth.js handler
    │       │
    │       ├── sermons/
    │       │   ├── route.ts            # GET all, POST new
    │       │   └── [id]/
    │       │       └── route.ts        # GET, PATCH, DELETE single
    │       │
    │       ├── events/
    │       │   ├── route.ts            # GET all, POST new
    │       │   └── [id]/
    │       │       └── route.ts        # GET, PATCH, DELETE single
    │       │
    │       ├── departments/
    │       │   └── route.ts            # GET all departments
    │       │
    │       ├── small-groups/
    │       │   └── route.ts            # GET groups by location
    │       │
    │       ├── members/
    │       │   └── route.ts            # POST registration
    │       │
    │       ├── pledges/
    │       │   └── route.ts            # POST "I Will Go" pledge
    │       │
    │       ├── contact/
    │       │   └── route.ts            # POST contact form
    │       │
    │       ├── workers/
    │       │   ├── route.ts            # GET all (ordered), POST new
    │       │   ├── roles/
    │       │   │   └── route.ts        # GET available roles for dropdown
    │       │   └── [id]/
    │       │       └── route.ts        # GET, PATCH, DELETE single
    │       │
    │       └── upload/
    │           └── route.ts            # POST presigned URL for R2
    │
    ├── components/
    │   │
    │   ├── ui/                         # 🧱 CORE REUSABLE UI COMPONENTS
    │   │   ├── button.tsx              # Primary, Secondary, Outline, Ghost
    │   │   ├── card.tsx                # Base card with variants
    │   │   ├── input.tsx               # Text input with validation states
    │   │   ├── select.tsx              # Dropdown select
    │   │   ├── combobox.tsx            # Searchable dropdown (for role selector)
    │   │   ├── textarea.tsx            # Multi-line input
    │   │   ├── badge.tsx               # Status badges (Live, New, etc.)
    │   │   ├── gold-badge.tsx          # Gold honour badge (for worker roles)
    │   │   ├── skeleton.tsx            # Loading placeholder
    │   │   ├── modal.tsx               # Dialog/modal wrapper
    │   │   ├── tabs.tsx                # Tab navigation
    │   │   ├── avatar.tsx              # User/preacher avatar
    │   │   ├── progress.tsx            # Progress bar
    │   │   ├── spinner.tsx             # Loading spinner
    │   │   └── tooltip.tsx             # Hover tooltip
    │   │
    │   ├── layout/                     # 📐 LAYOUT COMPONENTS
    │   │   ├── navbar.tsx              # Main navigation bar
    │   │   ├── mobile-drawer.tsx       # Mobile slide-out menu
    │   │   ├── footer.tsx              # Site footer
    │   │   ├── page-header.tsx         # Hero banner for inner pages
    │   │   ├── section-header.tsx      # Section title + description
    │   │   ├── container.tsx           # Max-width content wrapper
    │   │   └── admin-sidebar.tsx       # Admin navigation sidebar
    │   │
    │   ├── sanctuary/                  # ⛪ PUBLIC-FACING COMPONENTS
    │   │   │
    │   │   ├── home/
    │   │   │   ├── hero-slider.tsx     # Homepage image carousel
    │   │   │   ├── hero-slide.tsx      # Individual slide
    │   │   │   ├── quick-links.tsx     # Quick action buttons
    │   │   │   ├── upcoming-events.tsx # Featured events section
    │   │   │   ├── latest-sermons.tsx  # Recent sermons grid
    │   │   │   ├── departments-preview.tsx # Department highlights
    │   │   │   ├── stats-counter.tsx   # Animated statistics
    │   │   │   └── cta-banner.tsx      # Call-to-action section
    │   │   │
    │   │   ├── sermons/
    │   │   │   ├── sermon-card.tsx     # Sermon thumbnail card
    │   │   │   ├── sermon-grid.tsx     # Grid layout for sermons
    │   │   │   ├── sermon-filter.tsx   # Search + filter bar
    │   │   │   ├── sermon-player.tsx   # Video/audio player
    │   │   │   ├── sermon-details.tsx  # Full sermon info
    │   │   │   └── featured-sermon.tsx # Highlighted sermon
    │   │   │
    │   │   ├── events/
    │   │   │   ├── event-card.tsx      # Event preview card
    │   │   │   ├── event-grid.tsx      # Events listing grid
    │   │   │   ├── event-filter.tsx    # Category filter bar
    │   │   │   ├── event-details.tsx   # Full event info
    │   │   │   └── event-calendar.tsx  # Calendar view
    │   │   │
    │   │   ├── departments/
    │   │   │   ├── department-card.tsx # Department preview
    │   │   │   ├── department-grid.tsx # All departments grid
    │   │   │   └── department-hero.tsx # Department page hero
    │   │   │
    │   │   ├── groups/
    │   │   │   ├── group-finder.tsx    # Search + map component
    │   │   │   ├── group-map.tsx       # Leaflet map integration
    │   │   │   ├── group-card.tsx      # Small group info card
    │   │   │   └── group-list.tsx      # List of groups
    │   │   │
    │   │   ├── evangelism/
    │   │   │   ├── phase-card.tsx      # Evangelism phase display
    │   │   │   ├── phase-grid.tsx      # 4-phase strategy layout
    │   │   │   ├── method-card.tsx     # Evangelism method
    │   │   │   ├── pledge-form.tsx     # "I Will Go" form
    │   │   │   └── impact-stats.tsx    # WAD Impact counters
    │   │   │
    │   │   ├── join/
    │   │   │   ├── registration-form.tsx # Multi-step member form
    │   │   │   ├── worker-check-section.tsx # "Are you a worker?" prominent section
    │   │   │   └── worker-role-modal.tsx # Searchable role selector modal
    │   │   │
    │   │   ├── workers/
    │   │   │   ├── workers-hero.tsx     # Workers page hero section
    │   │   │   ├── workers-grid.tsx     # Hierarchical workers grid layout
    │   │   │   ├── worker-card.tsx      # Individual worker card (2 per row mobile)
    │   │   │   ├── pastor-card.tsx      # Special full-width pastor/spouse card
    │   │   │   └── worker-category.tsx  # Category section (Elders, Deacons, etc.)
    │   │   │
    │   │   ├── live/
    │   │   │   ├── stream-player.tsx   # YouTube/FB embed wrapper
    │   │   │   ├── live-badge.tsx      # Animated "LIVE" indicator
    │   │   │   ├── chat-panel.tsx      # Live chat sidebar
    │   │   │   └── stream-info.tsx     # Current service info
    │   │   │
    │   │   ├── about/
    │   │   │   ├── history-section.tsx # Church history
    │   │   │   ├── mission-vision.tsx  # Mission/vision cards
    │   │   │   ├── leadership-grid.tsx # Conference leaders
    │   │   │   ├── leader-card.tsx     # Individual leader
    │   │   │   └── beliefs-section.tsx # Core beliefs
    │   │   │
    │   │   └── contact/
    │   │       ├── contact-form.tsx    # Contact form
    │   │       └── office-info.tsx     # Address, phone, hours
    │   │
    │   └── command/                    # 🎖️ ADMIN COMPONENTS
    │       │
    │       ├── dashboard/
    │       │   ├── stats-grid.tsx      # Overview statistics
    │       │   ├── stat-card.tsx       # Individual stat card
    │       │   ├── recent-activity.tsx # Activity feed
    │       │   └── quick-actions.tsx   # Common action buttons
    │       │
    │       ├── sermons/
    │       │   ├── sermon-table.tsx    # Sermon list table
    │       │   ├── sermon-row.tsx      # Table row
    │       │   ├── sermon-form.tsx     # Add/edit sermon form
    │       │   └── upload-zone.tsx     # Drag-drop file upload
    │       │
    │       ├── events/
    │       │   ├── event-table.tsx     # Events management table
    │       │   └── event-form.tsx      # Add/edit event form
    │       │
    │       ├── members/
    │       │   ├── member-table.tsx    # Member registry table
    │       │   └── member-modal.tsx    # View/edit member details
    │       │
    │       ├── workers/
    │       │   ├── workers-table.tsx   # Workers management table
    │       │   ├── worker-form.tsx     # Add/edit worker details
    │       │   └── role-manager.tsx    # Role hierarchy management
    │       │
    │       ├── evangelism/
    │       │   ├── battle-map.tsx      # Evangelism sites map
    │       │   ├── site-card.tsx       # Individual site status
    │       │   └── progress-tracker.tsx # Vision 2026 progress
    │       │
    │       └── shared/
    │           ├── data-table.tsx      # Reusable data table
    │           ├── table-pagination.tsx # Pagination controls
    │           ├── search-bar.tsx      # Admin search
    │           ├── action-menu.tsx     # Row action dropdown
    │           └── confirm-dialog.tsx  # Delete confirmation
    │
    ├── lib/
    │   ├── db.ts                       # Prisma client singleton
    │   ├── r2.ts                       # Cloudflare R2 client
    │   ├── auth.ts                     # NextAuth configuration
    │   ├── utils.ts                    # Utility functions (cn, formatDate)
    │   ├── validators.ts               # Zod validation schemas
    │   ├── constants.ts                # App-wide constants
    │   └── worker-roles.ts             # Role hierarchy, labels, and categories
    │
    ├── hooks/
    │   ├── use-media-query.ts          # Responsive breakpoint hook
    │   ├── use-scroll-position.ts      # Scroll position tracking
    │   ├── use-local-storage.ts        # Persist to localStorage
    │   └── use-debounce.ts             # Debounce input changes
    │
    ├── types/
    │   ├── index.ts                    # Export all types
    │   ├── sermon.ts                   # Sermon type definitions
    │   ├── event.ts                    # Event type definitions
    │   ├── member.ts                   # Member type definitions
    │   ├── department.ts               # Department types
    │   ├── worker.ts                   # Worker and role type definitions
    │   └── evangelism.ts               # Evangelism/pledge types
    │
    ├── context/
    │   └── theme-provider.tsx          # Theme context (if needed)
    │
    └── animations/
        └── variants.ts                 # Framer Motion animation presets
```

---

## 4. DATABASE SCHEMA

### 4.1 Prisma Schema (`prisma/schema.prisma`)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "cockroachdb"
  url      = env("DATABASE_URL")
}

// ==================== AUTHENTICATION ====================

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String
  name          String
  role          Role      @default(MEMBER)
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relations
  sermons       Sermon[]  @relation("UploadedBy")
  events        Event[]   @relation("CreatedBy")
  
  @@index([email])
}

enum Role {
  SUPER_ADMIN      // Full access
  DEPT_DIRECTOR    // Department-level access
  CLERK            // Read + limited write
  MEMBER           // Public member
}

// ==================== SERMONS ====================

model Sermon {
  id            String    @id @default(cuid())
  slug          String    @unique
  title         String
  description   String    @db.Text
  preacher      String
  date          DateTime
  series        String?
  
  // Media URLs (stored in R2)
  videoUrl      String?
  audioUrl      String?
  thumbnailUrl  String?
  
  // Metadata
  duration      Int?      // Duration in seconds
  views         Int       @default(0)
  featured      Boolean   @default(false)
  published     Boolean   @default(true)
  
  // Relations
  uploadedById  String
  uploadedBy    User      @relation("UploadedBy", fields: [uploadedById], references: [id])
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  @@index([slug])
  @@index([date])
  @@index([preacher])
}

// ==================== EVENTS ====================

model Event {
  id            String        @id @default(cuid())
  title         String
  description   String        @db.Text
  location      String
  address       String?
  
  startDate     DateTime
  endDate       DateTime?
  allDay        Boolean       @default(false)
  
  category      EventCategory @default(GENERAL)
  imageUrl      String?
  registrationUrl String?
  
  featured      Boolean       @default(false)
  published     Boolean       @default(true)
  
  // Relations
  createdById   String
  createdBy     User          @relation("CreatedBy", fields: [createdById], references: [id])
  departmentId  String?
  department    Department?   @relation(fields: [departmentId], references: [id])
  
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  
  @@index([startDate])
  @@index([category])
}

enum EventCategory {
  GENERAL
  YOUTH
  WOMEN
  MEN
  CHILDREN
  EVANGELISM
  HEALTH
}

// ==================== DEPARTMENTS ====================

model Department {
  id            String    @id @default(cuid())
  slug          String    @unique
  name          String
  fullName      String
  description   String    @db.Text
  
  // Display
  icon          String    // Phosphor icon name
  color         String    // Hex color code
  imageUrl      String?
  
  // Leadership
  directorName  String?
  directorEmail String?
  directorPhone String?
  
  // Relations
  events        Event[]
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  @@index([slug])
}

// ==================== SMALL CARE GROUPS ====================

model SmallGroup {
  id            String    @id @default(cuid())
  name          String
  location      String    // Area name (e.g., "Marian")
  address       String
  
  // Coordinates for map
  latitude      Float
  longitude     Float
  
  // Schedule
  meetingDay    String    // "Wednesday"
  meetingTime   String    // "6:00 PM"
  
  // Leadership
  leaderName    String
  leaderPhone   String
  
  isActive      Boolean   @default(true)
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  @@index([location])
  @@index([latitude, longitude])
}

// ==================== MEMBERSHIP ====================

model Member {
  id            String          @id @default(cuid())
  
  // Personal Info
  firstName     String
  lastName      String
  email         String?
  phone         String
  dateOfBirth   DateTime?
  gender        Gender?
  imageUrl      String?         // Profile photo for workers display
  
  // Church Info
  memberType    MembershipType
  previousChurch String?
  baptismDate   DateTime?
  
  // Contact
  address       String?
  city          String?
  
  // Ministry Interests
  interests     String[]        // Array of department slugs
  
  // Worker Status
  isWorker      Boolean         @default(false)
  worker        Worker?         // Relation to Worker details
  
  status        MemberStatus    @default(PENDING)
  
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt
  
  @@index([phone])
  @@index([status])
  @@index([isWorker])
}

enum Gender {
  MALE
  FEMALE
}

enum MembershipType {
  BAPTISM           // New convert
  PROFESSION        // Profession of faith
  TRANSFER          // Transfer from another SDA church
  MISSING_MEMBER    // Returning member
}

enum MemberStatus {
  PENDING           // Awaiting review
  APPROVED          // Confirmed member
  REJECTED          // Application rejected
}

// ==================== WORKERS (HONOUR ROLL) ====================

model Worker {
  id            String          @id @default(cuid())
  
  // Link to member
  memberId      String          @unique
  member        Member          @relation(fields: [memberId], references: [id], onDelete: Cascade)
  
  // Role Information
  role          WorkerRole
  customRole    String?         // If role is OTHER, store custom role here
  roleDisplayName String        // The display name (either from enum or custom)
  
  // Hierarchy for ordering (lower = higher rank)
  hierarchyOrder Int            @default(100)
  
  // Optional spouse link (for Pastor & Wife display)
  spouseId      String?         @unique
  spouse        Worker?         @relation("WorkerSpouse", fields: [spouseId], references: [id])
  spouseOf      Worker?         @relation("WorkerSpouse")
  
  // Profile display
  bio           String?         @db.Text
  imageUrl      String?
  
  // Status
  isActive      Boolean         @default(true)
  appointedDate DateTime?
  
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt
  
  @@index([role])
  @@index([hierarchyOrder])
  @@index([isActive])
}

enum WorkerRole {
  // Pastoral Staff (Hierarchy: 1-10)
  PRESIDING_PASTOR          // 1
  PASTOR_SPOUSE             // 2
  SENIOR_PASTOR             // 3
  ASSOCIATE_PASTOR          // 4
  DISTRICT_PASTOR           // 5
  INTERN_PASTOR             // 6
  BIBLE_WORKER              // 7
  
  // Church Officers (Hierarchy: 10-30)
  FIRST_ELDER               // 10
  ELDER                     // 11
  HEAD_DEACON               // 15
  DEACON                    // 16
  HEAD_DEACONESS            // 17
  DEACONESS                 // 18
  
  // Administrative (Hierarchy: 20-40)
  CHURCH_CLERK              // 20
  TREASURER                 // 21
  ASSISTANT_TREASURER       // 22
  SECRETARY                 // 23
  
  // Sabbath School (Hierarchy: 30-40)
  SABBATH_SCHOOL_SUPERINTENDENT  // 30
  SABBATH_SCHOOL_SECRETARY       // 31
  SABBATH_SCHOOL_TEACHER         // 32
  
  // Departmental Directors (Hierarchy: 40-60)
  AYM_DIRECTOR              // 40 - Adventist Youth Ministry
  AYM_DEPUTY                // 41
  PATHFINDER_DIRECTOR       // 42
  ADVENTURER_DIRECTOR       // 43
  AMO_DIRECTOR              // 44 - Adventist Men Organization
  AWM_DIRECTOR              // 45 - Adventist Women Ministry
  CHILDREN_MINISTRY_DIRECTOR // 46
  COMMUNICATION_DIRECTOR    // 47
  HEALTH_MINISTRY_DIRECTOR  // 48
  FAMILY_MINISTRY_DIRECTOR  // 49
  PERSONAL_MINISTRY_DIRECTOR // 50
  STEWARDSHIP_DIRECTOR      // 51
  MUSIC_DIRECTOR            // 52
  
  // Coordinators & Support (Hierarchy: 60-80)
  CHOIR_LEADER              // 60
  CHOIR_MEMBER              // 61
  USHER_COORDINATOR         // 62
  USHER                     // 63
  MEDIA_COORDINATOR         // 64
  SOUND_ENGINEER            // 65
  PROTOCOL_COORDINATOR      // 66
  
  // Other
  OTHER                     // 100 - Custom role
}

// ==================== EVANGELISM ====================

model EvangelismSite {
  id            String          @id @default(cuid())
  name          String
  location      String
  address       String
  
  // Coordinates
  latitude      Float
  longitude     Float
  
  // Status
  phase         EvangelismPhase @default(PREPARATION)
  startDate     DateTime?
  endDate       DateTime?
  
  // Leadership
  coordinator   String
  phone         String
  
  // Targets
  soulTarget    Int             @default(0)
  soulsWon      Int             @default(0)
  
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt
  
  @@index([phase])
}

enum EvangelismPhase {
  PREPARATION
  SOWING
  REAPING
  RETENTION
}

model Pledge {
  id            String    @id @default(cuid())
  name          String
  email         String?
  phone         String
  
  pledgeType    String    // "I Will Go", "Bible Study", etc.
  soulTarget    Int       @default(1)
  soulsWon      Int       @default(0)
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  @@index([phone])
}

// ==================== RESOURCES ====================

model Resource {
  id            String    @id @default(cuid())
  title         String
  description   String?
  
  fileUrl       String    // R2 URL
  fileType      String    // "pdf", "doc", etc.
  fileSize      Int       // Bytes
  
  category      String    // "Sabbath School", "Manual", etc.
  departmentId  String?
  
  downloads     Int       @default(0)
  published     Boolean   @default(true)
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  @@index([category])
}

// ==================== CONTACT SUBMISSIONS ====================

model ContactSubmission {
  id            String    @id @default(cuid())
  name          String
  email         String
  phone         String?
  subject       String
  message       String    @db.Text
  
  isRead        Boolean   @default(false)
  
  createdAt     DateTime  @default(now())
  
  @@index([isRead])
}

// ==================== SITE SETTINGS ====================

model SiteSettings {
  id            String    @id @default("settings")
  
  // Live Stream
  liveStreamUrl String?
  isLive        Boolean   @default(false)
  liveTitle     String?
  
  // Contact Info
  officeAddress String?
  officePhone   String?
  officeEmail   String?
  officeHours   String?
  
  // Social Links
  facebookUrl   String?
  youtubeUrl    String?
  instagramUrl  String?
  
  updatedAt     DateTime  @updatedAt
}
```

---

## 5. COMPONENT ARCHITECTURE

### 5.1 Component Classification

| Type | Location | Purpose | Examples |
|------|----------|---------|----------|
| **UI** | `components/ui/` | Atomic, style-only | Button, Input, Card |
| **Layout** | `components/layout/` | Page structure | Navbar, Footer, Sidebar |
| **Sanctuary** | `components/sanctuary/` | Public-facing features | SermonCard, GroupFinder |
| **Command** | `components/command/` | Admin-only features | SermonTable, UploadZone |

### 5.2 Core UI Components (Reusable)

#### Button (`components/ui/button.tsx`)
```typescript
// Variants: primary, secondary, outline, ghost, danger
// Sizes: sm, md, lg
// States: loading, disabled
// Icons: left, right, only
```

#### Card (`components/ui/card.tsx`)
```typescript
// Sub-components: CardHeader, CardContent, CardFooter
// Variants: default, elevated, bordered
// Hover effects: lift, glow
```

#### Input (`components/ui/input.tsx`)
```typescript
// Types: text, email, password, tel, number, search
// States: default, focus, error, disabled
// Addons: left icon, right icon, prefix, suffix
```

### 5.3 Complex Component Patterns

#### Hero Slider (`components/sanctuary/home/hero-slider.tsx`)
```typescript
// Features:
// - Auto-advance with configurable interval
// - Touch/swipe support for mobile
// - Animated transitions (Framer Motion)
// - Lazy-loaded images
// - Slide indicators
// - Pause on hover
```

#### Sermon Player (`components/sanctuary/sermons/sermon-player.tsx`)
```typescript
// Features:
// - Toggle between video/audio
// - Playback speed control
// - Download button (R2 direct link)
// - Picture-in-picture mode
// - Progress persistence (localStorage)
```

#### Group Finder (`components/sanctuary/groups/group-finder.tsx`)
```typescript
// Features:
// - Text search by area name
// - Interactive Leaflet map
// - Marker clusters for dense areas
// - Click marker to see group details
// - "Get Directions" button
```

#### Worker Role Modal (`components/sanctuary/join/worker-role-modal.tsx`)
```typescript
// Features:
// - Triggered when user selects "Yes, I am a church worker"
// - Searchable dropdown with 40+ Adventist roles
// - Roles grouped by category (Pastoral, Officers, Departments)
// - Fuzzy search to find roles quickly
// - "Role not listed" option opens text input for custom role
// - Selected role displayed with gold badge styling
```

#### Workers Grid (`components/sanctuary/workers/workers-grid.tsx`)
```typescript
// Features:
// - Server-rendered for SEO and performance
// - Workers fetched ordered by hierarchyOrder ASC
// - Grouped by category sections
// - Pastor + Spouse: 1 card per row (full width on mobile)
// - Other workers: 2 cards per row on mobile, 3-4 on desktop
// - Each card shows: Photo, Name, Role (in GOLD badge)
// - Smooth entrance animations (staggered)
```

### 5.4 Workers Page Design Specification

#### Hierarchy Order (Display Order)
```typescript
const ROLE_HIERARCHY = {
  // Pastoral Staff (Top of page, featured section)
  PRESIDING_PASTOR: 1,
  PASTOR_SPOUSE: 2,
  SENIOR_PASTOR: 3,
  ASSOCIATE_PASTOR: 4,
  DISTRICT_PASTOR: 5,
  INTERN_PASTOR: 6,
  BIBLE_WORKER: 7,
  
  // Church Officers
  FIRST_ELDER: 10,
  ELDER: 11,
  HEAD_DEACON: 15,
  DEACON: 16,
  HEAD_DEACONESS: 17,
  DEACONESS: 18,
  
  // Administrative
  CHURCH_CLERK: 20,
  TREASURER: 21,
  ASSISTANT_TREASURER: 22,
  SECRETARY: 23,
  
  // Sabbath School
  SABBATH_SCHOOL_SUPERINTENDENT: 30,
  SABBATH_SCHOOL_SECRETARY: 31,
  SABBATH_SCHOOL_TEACHER: 32,
  
  // Department Directors
  AYM_DIRECTOR: 40,
  PATHFINDER_DIRECTOR: 42,
  ADVENTURER_DIRECTOR: 43,
  AMO_DIRECTOR: 44,
  AWM_DIRECTOR: 45,
  CHILDREN_MINISTRY_DIRECTOR: 46,
  COMMUNICATION_DIRECTOR: 47,
  HEALTH_MINISTRY_DIRECTOR: 48,
  FAMILY_MINISTRY_DIRECTOR: 49,
  PERSONAL_MINISTRY_DIRECTOR: 50,
  STEWARDSHIP_DIRECTOR: 51,
  MUSIC_DIRECTOR: 52,
  
  // Coordinators & Support
  CHOIR_LEADER: 60,
  USHER_COORDINATOR: 62,
  MEDIA_COORDINATOR: 64,
  SOUND_ENGINEER: 65,
  PROTOCOL_COORDINATOR: 66,
  
  // Other
  OTHER: 100,
};
```

#### Page Layout Structure
```
┌─────────────────────────────────────────────────────┐
│  HERO SECTION: "Our Dedicated Workers"               │
│  Subtitle: "Honouring those who serve the Lord"      │
│  Background: Church interior with golden overlay     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  PASTORAL SECTION (Featured - Gold Border)           │
│  ┌───────────────────────────────────────────────┐  │
│  │  [FULL WIDTH PASTOR CARD]                     │  │
│  │  Pastor Name                                   │  │
│  │  🏆 Presiding Pastor (Gold Badge)             │  │
│  └───────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────┐  │
│  │  [FULL WIDTH PASTOR SPOUSE CARD]              │  │
│  │  Spouse Name                                   │  │
│  │  🏆 Pastor's Spouse (Gold Badge)              │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  ELDERS SECTION                                      │
│  ┌─────────────┐ ┌─────────────┐                    │
│  │ [CARD]      │ │ [CARD]      │  ← 2 per row mobile │
│  │ First Elder │ │ Elder       │                    │
│  │ 🏆 Role     │ │ 🏆 Role     │                    │
│  └─────────────┘ └─────────────┘                    │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  DEACONS & DEACONESSES                               │
│  ┌─────────────┐ ┌─────────────┐                    │
│  │ [CARD]      │ │ [CARD]      │                    │
│  └─────────────┘ └─────────────┘                    │
│  ┌─────────────┐ ┌─────────────┐                    │
│  │ [CARD]      │ │ [CARD]      │                    │
│  └─────────────┘ └─────────────┘                    │
└─────────────────────────────────────────────────────┘

... more sections follow same pattern ...
```

#### Worker Card Component Styling
```tsx
// Worker Card - Gold Badge for Role
<motion.div 
  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl 
             transition-all border border-gray-100"
  whileHover={{ y: -4 }}
>
  {/* Profile Image */}
  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden 
                  border-4 border-secondary mb-4">
    <Image src={worker.imageUrl} alt={worker.name} fill />
  </div>
  
  {/* Name */}
  <h3 className="text-lg font-bold text-center text-gray-900">
    {worker.member.firstName} {worker.member.lastName}
  </h3>
  
  {/* GOLD ROLE BADGE - The Honour */}
  <div className="mt-3 flex justify-center">
    <span className="inline-flex items-center px-4 py-1.5 rounded-full 
                     bg-gradient-to-r from-amber-400 to-yellow-500 
                     text-black font-semibold text-sm shadow-md">
      <Crown className="w-4 h-4 mr-2" />
      {worker.roleDisplayName}
    </span>
  </div>
</motion.div>
```

#### Registration Form - Worker Check Section
```tsx
// Prominent section in registration form
<motion.section 
  className="border-2 border-secondary rounded-xl p-6 bg-amber-50"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>
  <div className="flex items-center gap-3 mb-4">
    <Users className="w-6 h-6 text-secondary" />
    <h3 className="text-xl font-bold text-gray-900">
      Are you a Church Worker?
    </h3>
  </div>
  
  <p className="text-gray-600 mb-4">
    If you hold any office or role in the church, we would like to 
    honour you on our Workers page.
  </p>
  
  <div className="flex gap-4">
    <Button 
      variant={isWorker ? "primary" : "outline"}
      onClick={() => setIsWorker(true)}
    >
      Yes, I am a worker
    </Button>
    <Button 
      variant={!isWorker ? "primary" : "outline"}
      onClick={() => setIsWorker(false)}
    >
      No, not currently
    </Button>
  </div>
  
  {isWorker && (
    <WorkerRoleModal 
      isOpen={showRoleModal} 
      onSelect={handleRoleSelect}
    />
  )}
</motion.section>
```

---

## 6. PAGE ROUTES & FILES

### 6.1 Public Routes (Sanctuary)

| Route | File | Data Source | Page Type |
|-------|------|-------------|-----------|
| `/` | `(public)/page.tsx` | `sermons`, `events` | SSR + ISR |
| `/about` | `(public)/about/page.tsx` | `siteSettings` | Static |
| `/sermons` | `(public)/sermons/page.tsx` | `sermons` | SSR + ISR |
| `/sermons/[slug]` | `(public)/sermons/[slug]/page.tsx` | `sermon` | SSR |
| `/events` | `(public)/events/page.tsx` | `events` | SSR + ISR |
| `/events/[id]` | `(public)/events/[id]/page.tsx` | `event` | SSR |
| `/departments` | `(public)/departments/page.tsx` | `departments` | Static |
| `/departments/[slug]` | `(public)/departments/[slug]/page.tsx` | `department`, `events` | SSR |
| `/small-groups` | `(public)/small-groups/page.tsx` | `smallGroups` | CSR |
| `/evangelism` | `(public)/evangelism/page.tsx` | Static + `pledges` | Static |
| `/workers` | `(public)/workers/page.tsx` | `workers` (ordered) | SSR |
| `/join` | `(public)/join/page.tsx` | - | Static (Form) |
| `/live` | `(public)/live/page.tsx` | `siteSettings` | SSR |
| `/contact` | `(public)/contact/page.tsx` | `siteSettings` | Static |

### 6.2 Admin Routes (Command Center)

| Route | File | Access Level |
|-------|------|--------------|
| `/command` | `(admin)/command/page.tsx` | CLERK+ |
| `/command/sermons` | `(admin)/command/sermons/page.tsx` | CLERK+ |
| `/command/sermons/new` | `(admin)/command/sermons/new/page.tsx` | DEPT_DIRECTOR+ |
| `/command/events` | `(admin)/command/events/page.tsx` | CLERK+ |
| `/command/members` | `(admin)/command/members/page.tsx` | CLERK+ |
| `/command/departments` | `(admin)/command/departments/page.tsx` | DEPT_DIRECTOR+ |
| `/command/small-groups` | `(admin)/command/small-groups/page.tsx` | DEPT_DIRECTOR+ |
| `/command/workers` | `(admin)/command/workers/page.tsx` | DEPT_DIRECTOR+ |
| `/command/evangelism` | `(admin)/command/evangelism/page.tsx` | SUPER_ADMIN |
| `/command/settings` | `(admin)/command/settings/page.tsx` | SUPER_ADMIN |
| `/login` | `(admin)/login/page.tsx` | Public |

---

## 7. API ENDPOINTS

### 7.1 RESTful API Structure

```typescript
// SERMONS
GET    /api/sermons                   // List all (with pagination, filters)
GET    /api/sermons/[id]              // Get single by ID or slug
POST   /api/sermons                   // Create new (auth required)
PATCH  /api/sermons/[id]              // Update (auth required)
DELETE /api/sermons/[id]              // Delete (auth required)

// EVENTS
GET    /api/events                    // List all
GET    /api/events/[id]               // Get single
POST   /api/events                    // Create new (auth required)
PATCH  /api/events/[id]               // Update (auth required)
DELETE /api/events/[id]               // Delete (auth required)

// DEPARTMENTS
GET    /api/departments               // List all
GET    /api/departments/[slug]        // Get single with related events

// SMALL GROUPS
GET    /api/small-groups              // List all or filter by location
GET    /api/small-groups/[id]         // Get single

// MEMBERS
POST   /api/members                   // Submit registration

// PLEDGES
POST   /api/pledges                   // Submit "I Will Go" pledge

// CONTACT
POST   /api/contact                   // Submit contact form

// WORKERS
GET    /api/workers                    // Get all workers (ordered by hierarchy)
GET    /api/workers/[id]               // Get single worker
POST   /api/workers                    // Create worker (auth required)
PATCH  /api/workers/[id]               // Update worker (auth required)
DELETE /api/workers/[id]               // Remove worker (auth required)
GET    /api/workers/roles              // Get all available roles for dropdown

// UPLOAD (R2)
POST   /api/upload                    // Get presigned upload URL

// SETTINGS
GET    /api/settings                  // Get site settings
PATCH  /api/settings                  // Update (super admin only)
```

### 7.2 Query Parameter Conventions

```typescript
// Pagination
?page=1&limit=12

// Filtering
?category=YOUTH
?preacher=Pastor%20John
?featured=true

// Sorting
?sort=date&order=desc

// Search
?search=salvation

// Date Range
?startDate=2026-01-01&endDate=2026-12-31
```

---

## 8. ANIMATION & DESIGN SYSTEM

### 8.1 Design Tokens

```css
/* globals.css */
:root {
  /* === SDA BRAND COLORS === */
  --primary: #003087;           /* SDA Blue - Trust, Authority */
  --primary-dark: #002266;      /* Darker for hover states */
  --primary-light: #1e4db7;     /* Lighter for backgrounds */
  
  --secondary: #F9A01B;         /* Gold - Excellence, Warmth */
  --secondary-light: #ffc107;   /* Lighter gold */
  
  --accent-green: #009A44;      /* SDA Green - Growth, Health */
  --accent-red: #D32F2F;        /* Urgency, Evangelism */
  
  /* === SURFACE COLORS === */
  --background: #f8f9fa;        /* Light gray for pages */
  --surface: #ffffff;           /* Cards, modals */
  --surface-elevated: #ffffff;  /* Elevated surfaces */
  
  /* === TEXT === */
  --text-primary: #1a1a1a;      /* Headings, body */
  --text-secondary: #666666;    /* Muted text */
  --text-tertiary: #999999;     /* Very muted */
  --text-inverse: #ffffff;      /* On dark backgrounds */
  
  /* === ADMIN THEME === */
  --admin-bg: #0f172a;          /* Midnight slate */
  --admin-surface: #1e293b;     /* Lighter slate */
  --admin-border: rgba(255, 255, 255, 0.05);
  
  /* === UI TOKENS === */
  --radius-sm: 8px;
  --radius: 12px;
  --radius-lg: 16px;
  --radius-full: 9999px;
  
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.15);
  
  /* === TRANSITIONS === */
  --transition-fast: 150ms;
  --transition-normal: 300ms;
  --transition-slow: 500ms;
}
```

### 8.2 Framer Motion Animation Presets

```typescript
// animations/variants.ts

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: "easeOut" }
};

export const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export const slideInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

// Page transition
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

// Hover effects
export const cardHover = {
  rest: { y: 0, boxShadow: "var(--shadow)" },
  hover: { 
    y: -8, 
    boxShadow: "var(--shadow-xl)",
    transition: { duration: 0.3 }
  }
};

// Hero slider
export const heroSlide = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

// Live pulse
export const livePulse = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [1, 0.6, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Counter animation hook
export const useCountAnimation = (target: number, duration: number = 2000) => {
  // Animate from 0 to target
};
```

### 8.3 Mobile-First Breakpoints

```typescript
// tailwind.config.ts
screens: {
  'xs': '375px',      // iPhone SE, small phones
  'sm': '640px',      // Large phones, small tablets
  'md': '768px',      // Tablets
  'lg': '1024px',     // Laptops
  'xl': '1280px',     // Desktops
  '2xl': '1536px',    // Large desktops
}

// Usage Example:
// <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
```

### 8.4 Animation Implementation Guidelines

| Component | Animation | Trigger |
|-----------|-----------|---------|
| **Page Load** | `fadeInUp` | On mount |
| **Cards** | `cardHover` + `staggerItem` | On scroll into view |
| **Hero Slider** | `heroSlide` | Auto (5s interval) |
| **Statistics** | `useCountAnimation` | On scroll into view |
| **Live Badge** | `livePulse` | Continuous |
| **Modal** | `fadeInScale` | On open |
| **Mobile Menu** | `slideInRight` | On toggle |
| **Sermon Player** | `fadeInUp` | On mount |

---

## 9. PWA CONFIGURATION

### 9.1 Next.js Configuration (`next.config.ts`)

```typescript
import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.r2.cloudflarestorage.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  cacheOnFrontEndNav: true,
  reloadOnOnline: true,
  workboxOptions: {
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/.*\.r2\.cloudflarestorage\.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "media-cache",
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          },
        },
      },
    ],
  },
})(nextConfig);
```

### 9.2 Web App Manifest (`public/manifest.json`)

```json
{
  "name": "SDA Cross River Conference",
  "short_name": "SDA CRC",
  "description": "The Digital Sanctuary of the Seventh-day Adventist Church, Cross River Conference",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#003087",
  "theme_color": "#003087",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/logo-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/logo-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "categories": ["religion", "lifestyle"],
  "screenshots": [
    {
      "src": "/screenshots/home.jpg",
      "sizes": "1080x1920",
      "type": "image/jpeg"
    }
  ]
}
```

### 9.3 Offline Strategy

| Resource | Cache Strategy | TTL |
|----------|----------------|-----|
| **HTML Pages** | Network First | - |
| **Static Assets** | Cache First | 30 days |
| **Images** | Cache First | 30 days |
| **API Responses** | Network First | 1 hour |
| **Sermons (Media)** | Cache First | 30 days |
| **Fonts** | Cache First | 1 year |

---

## 10. IMPLEMENTATION PHASES

### PHASE 1: Foundation (Week 1)

**Goal:** Project setup, core infrastructure, design system

| Day | Tasks |
|-----|-------|
| **Day 1** | Initialize Next.js 15, configure Tailwind, set up project structure |
| **Day 2** | Configure Prisma with CockroachDB, create schema, run migrations |
| **Day 3** | Set up Cloudflare R2 client, configure presigned uploads |
| **Day 4** | Build core UI components (Button, Card, Input, Badge) |
| **Day 5** | Build layout components (Navbar, Footer, MobileDrawer) |
| **Day 6** | Configure NextAuth, build login page, set up admin middleware |
| **Day 7** | Configure PWA manifest, service worker, test install prompt |

**Deliverables:**
- [ ] Working development environment
- [ ] Database connected and seeded
- [ ] R2 upload working
- [ ] Core UI components library
- [ ] Authentication flow
- [ ] PWA installable

---

### PHASE 2: Public Sanctuary (Weeks 2-3)

**Goal:** Build all public-facing pages

| Week | Focus | Pages |
|------|-------|-------|
| **Week 2A** | Homepage | Hero slider, quick links, latest sermons, upcoming events |
| **Week 2B** | Sermons | Library page, sermon detail, player component |
| **Week 3A** | Events & About | Events listing, event detail, about page |
| **Week 3B** | Community | Departments, small groups finder, join form |

**Deliverables:**
- [ ] Homepage with hero slider (church images)
- [ ] Sermon library with search/filter
- [ ] Sermon detail page with video/audio player
- [ ] Events calendar with category filters
- [ ] About page with leadership profiles
- [ ] Departments listing
- [ ] Small group finder with map
- [ ] Membership registration form

---

### PHASE 3: Mission Features (Week 4)

**Goal:** Build evangelism and live stream features

| Tasks |
|-------|
| Build Vision 2026 evangelism page |
| Create "I Will Go" pledge form |
| Build live stream page with YouTube/FB embed |
| Create live chat interface |
| Build contact page with form |

**Deliverables:**
- [ ] Evangelism page with phase cards
- [ ] Working pledge submission
- [ ] Live stream page with embed
- [ ] Contact form working

---

### PHASE 4: Command Center (Weeks 5-6)

**Goal:** Build admin dashboard and management features

| Week | Focus | Features |
|------|-------|----------|
| **Week 5A** | Dashboard | Stats overview, recent activity |
| **Week 5B** | Sermons | Upload, edit, delete, R2 integration |
| **Week 6A** | Events & Members | CRUD operations, member registry |
| **Week 6B** | Evangelism | Battle map, progress tracking |

**Deliverables:**
- [ ] Admin dashboard with statistics
- [ ] Sermon upload with R2 integration
- [ ] Event management
- [ ] Member registry
- [ ] Evangelism tracking
- [ ] Site settings management

---

### PHASE 5: Polish & Launch (Week 7-8)

| Tasks |
|-------|
| SEO optimization (meta tags, Open Graph) |
| Performance optimization (lazy loading, image compression) |
| Cross-browser testing |
| Mobile responsiveness testing |
| PWA testing on multiple devices |
| Security audit |
| Deploy to Vercel production |
| Domain configuration |
| Analytics setup |

---

## 11. ENVIRONMENT VARIABLES

### `.env.local` Template

```bash
# ===========================================
# SDA CRC Platform - Environment Variables
# ===========================================

# Database (CockroachDB)
DATABASE_URL="postgresql://username:password@host:26257/defaultdb?sslmode=verify-full"

# NextAuth
NEXTAUTH_SECRET="generate-a-32-char-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Cloudflare R2
R2_ACCOUNT_ID="your-cloudflare-account-id"
R2_ACCESS_KEY_ID="your-r2-access-key"
R2_SECRET_ACCESS_KEY="your-r2-secret-key"
R2_BUCKET_NAME="crc-media"
R2_PUBLIC_URL="https://your-bucket.r2.cloudflarestorage.com"

# Optional: Email (Resend)
RESEND_API_KEY="re_xxxxxxxxxxxxx"

# Optional: Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

---

## 12. QUICK REFERENCE CHEATSHEET

### Terminal Commands

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Production build
npm run start                  # Start production server
npm run lint                   # Run ESLint

# Database
npx prisma generate            # Generate Prisma client
npx prisma db push             # Push schema to database
npx prisma db seed             # Seed database
npx prisma studio              # Open Prisma Studio GUI

# Dependencies
npm install                    # Install all dependencies
npm update                     # Update dependencies
```

### File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `SermonCard.tsx` |
| Pages | kebab-case folders | `src/app/(public)/sermons/page.tsx` |
| Utilities | camelCase | `formatDate.ts` |
| Types | PascalCase | `Sermon.ts` |
| Hooks | camelCase with `use` prefix | `useMediaQuery.ts` |
| Constants | SCREAMING_SNAKE_CASE | `API_BASE_URL` |

### Git Commit Convention

```
feat: Add sermon upload functionality
fix: Correct mobile menu animation
style: Update button hover states
refactor: Extract media player logic
docs: Update README with API docs
chore: Update dependencies
```

### Component Template

```tsx
"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/animations/variants";

interface ComponentNameProps {
  title: string;
  children?: React.ReactNode;
}

export function ComponentName({ title, children }: ComponentNameProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeInUp}
      className="p-4"
    >
      <h2 className="text-xl font-bold text-primary">{title}</h2>
      {children}
    </motion.div>
  );
}
```

---

## 🙏 BENEDICTION

> *"Whatever you do, work at it with all your heart, as working for the Lord, not for human masters."*
> — Colossians 3:23

This platform is not just code—it is a digital extension of the sanctuary where souls will be touched, the Gospel will be proclaimed, and the Advent message will go to every home in Cross River State.

**Let us build with excellence. Let us build for eternity.**

---

*Document prepared with prayer and purpose for the glory of God.*
