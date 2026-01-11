# SDA Cross River Conference Platform

> "The people who walk in darkness will see a great light." — Isaiah 9:2

A Digital Sanctuary for the Seventh-day Adventist Church, Cross River Conference.

## 🏗️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Database:** CockroachDB Serverless + Prisma ORM
- **Storage:** Cloudflare R2
- **Authentication:** NextAuth.js v5
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Hosting:** Vercel

## 📁 Project Structure

```
crc-platform/
├── prisma/
│   └── schema.prisma         # Database schema
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   ├── auth/         # Authentication
│   │   │   ├── sermons/      # Sermons CRUD
│   │   │   ├── events/       # Events CRUD
│   │   │   ├── departments/  # Departments CRUD
│   │   │   ├── small-groups/ # Small Groups CRUD
│   │   │   ├── members/      # Member registration
│   │   │   ├── workers/      # Workers/Leaders CRUD
│   │   │   ├── evangelism/   # Evangelism sites CRUD
│   │   │   ├── pledges/      # Financial pledges
│   │   │   ├── contact/      # Contact form
│   │   │   ├── upload/       # File uploads
│   │   │   └── settings/     # Site settings
│   │   └── ...               # Pages (to be created)
│   └── lib/
│       ├── db.ts             # Prisma client singleton
│       ├── auth.ts           # NextAuth configuration
│       ├── r2.ts             # Cloudflare R2 client
│       ├── utils.ts          # Utility functions
│       ├── validators.ts     # Zod validation schemas
│       ├── constants.ts      # App constants
│       └── worker-roles.ts   # Worker role hierarchy
└── .env.example              # Environment template
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Copy the environment file:
   ```bash
   cp .env.example .env.local
   ```

4. Fill in the environment variables in `.env.local`

5. Push the database schema:
   ```bash
   pnpm prisma db push
   ```

6. Generate Prisma client:
   ```bash
   pnpm prisma generate
   ```

7. Start the development server:
   ```bash
   pnpm dev
   ```

## 📖 API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sermons` | List published sermons |
| GET | `/api/sermons/[id]` | Get single sermon |
| GET | `/api/events` | List published events |
| GET | `/api/events/[id]` | Get single event |
| GET | `/api/departments` | List active departments |
| GET | `/api/small-groups` | Find small groups (with location) |
| GET | `/api/workers` | List workers (hierarchical order) |
| GET | `/api/workers/roles` | Get available worker roles |
| GET | `/api/evangelism` | List evangelism sites |
| GET | `/api/settings` | Get public site settings |
| POST | `/api/members` | Register new member |
| POST | `/api/pledges` | Submit a pledge |
| POST | `/api/contact` | Submit contact form |

### Protected Endpoints (Authentication Required)

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| POST | `/api/sermons` | EDITOR+ | Create sermon |
| PATCH | `/api/sermons/[id]` | EDITOR+ | Update sermon |
| DELETE | `/api/sermons/[id]` | ADMIN+ | Delete sermon |
| POST | `/api/events` | EDITOR+ | Create event |
| PATCH | `/api/events/[id]` | EDITOR+ | Update event |
| DELETE | `/api/events/[id]` | ADMIN+ | Delete event |
| POST | `/api/workers` | ADMIN+ | Add worker |
| PATCH | `/api/workers/[id]` | ADMIN+ | Update worker |
| DELETE | `/api/workers/[id]` | ADMIN+ | Archive worker |
| POST | `/api/upload` | EDITOR+ | Get upload URL |
| PATCH | `/api/settings` | ADMIN+ | Update settings |

## 🎨 Design Principles

1. **Mobile First** - All designs start from 375px width
2. **Performance** - LCP < 2.5s, FID < 100ms
3. **Accessibility** - WCAG 2.1 AA compliance
4. **Animation** - GPU-accelerated (transform/opacity only)
5. **Offline Ready** - PWA with service worker

## 📜 License

This project is developed for the Seventh-day Adventist Church, Cross River Conference.

---

*"Whatever you do, work at it with all your heart, as working for the Lord."* — Colossians 3:23
