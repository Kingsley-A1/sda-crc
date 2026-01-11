Project Blueprint: SDA Cross River Conference Digital Platform

Status: Strategic Build | Stack: Next.js 15, PostgreSQL (CockroachDB), Cloudflare R2 | Type: PWA

1. Executive Summary

The SDA Cross River Conference Digital Platform is a "Digital Sanctuary" designed to proclaim the Everlasting Gospel. It serves as both a Member Hub (PWA for worship, sermons, and community) and a Mission HQ (Admin Command Center for aggressive evangelism and conference management).

Primary Goals:

Engagement: Instant access to live streams and a massive sermon archive with zero-egress download costs.

Mission: Tracking the "Vision 2026" evangelism goals and "I Will Go" pledges.

Community: Integrating the WAD Small Care Group structure into the daily lives of members.

2. Technical Architecture & Hosting

We are utilizing a modern, serverless stack to ensure high performance on Nigerian mobile networks with minimal maintenance costs.

Component

Service Provider

Why?

Frontend/API

Vercel

Industry standard for Next.js; global Edge network ensures speed in Calabar/Nigeria.

Database

CockroachDB Serverless

Distributed PostgreSQL; 100% uptime and scales automatically with membership growth.

Media Storage

Cloudflare R2

Hosts sermons and resources with Zero Egress Fees, making unlimited downloads affordable.

PWA Engine

Next-PWA

Enables "Add to Home Screen" functionality, offline caching, and a native app feel.

Live Streaming

Hybrid Integration

Low-latency YouTube/Facebook embeds for live events; auto-archiving to R2.

3. Database Schema (Enhanced)

Beyond standard tables, we are building for the "WAD Impact" and "Small Care" initiatives.

A. Core Administration

users: Admins, Clerks, and Members (Roles: SUPER_ADMIN, DEPT_DIRECTOR, CLERK, MEMBER).

sermons: Title, Preacher, Series, R2 Video URL, R2 Audio URL, Tags.

events: Calendar items, Location, Departmental Category, Live status.

B. Mission & Community (The Pulse)

care_groups: Name, Location (Geo-coordinates), Leader contact, Meeting time.

evangelism_sites: 2026 Strategy locations, Coordinator, Status (Preparation, Sowing, Reaping, Retention).

pledges: "I Will Go" records, Member ID, Soul target, Progress tracking.

resources: PDF Manuals, Sabbath School guides, and Departmental files on R2.

4. Implementation Roadmap

Phase 1: The Sanctuary Shell (Weeks 1-2)

[ ] Next.js 15 App Router initialization with Tailwind CSS.

[ ] PWA Manifest and Service Worker configuration.

[ ] Deployment of the Public Home and About (101 Goldie) pages.

Phase 2: The Word & The Archive (Weeks 3-4)

[ ] Integration of Cloudflare R2 with AWS S3 SDK.

[ ] Admin "War Room": Build the Sermon Upload & Management portal.

[ ] Public "Sermon Library": Searchable grid with audio/video toggle.

Phase 3: Total Member Involvement (Weeks 5-6)

[ ] Small Care Group Finder: Map-based search for local home cells.

[ ] Join Us Portal: Membership registration, Baptismal interest, and Transfer requests.

[ ] Departmental Hubs: AYM (Youth), AMO (Men), and AWM (Women) dynamic pages.

Phase 4: Strategy 2026 & Live (Weeks 7-8)

[ ] Battle Map: Admin dashboard for tracking evangelism site progress.

[ ] Live Sanctuary: Implementation of the Live Stream player with real-time chat.

[ ] Final Polish: SEO Optimization for Calabar/Cross River searches and PWA install testing.

5. Project Directory Structure

crc-platform/
├── public/                 # PWA Icons, Manifest, Static Assets
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── (public)/       # Public Sanctuary Routes (Sermons, Events, Join)
│   │   ├── (admin)/        # Mission HQ Routes (Dashboard, Evangelism Map)
│   │   ├── (auth)/         # Secure Login for Conference Admins
│   │   ├── api/            # Serverless functions (R2 Upload, DB Query)
│   │   └── layout.tsx      # Global Root Layout
│   ├── components/
│   │   ├── ui/             # Core Brand Components (Buttons, Cards)
│   │   ├── sanctuary/      # Public components (SermonPlayer, GroupFinder)
│   │   └── command/        # Admin components (StatsGrid, BattleList)
│   ├── lib/
│   │   ├── cockroach.ts    # DB Connection (Prisma or Drizzle)
│   │   ├── r2-client.ts    # Cloudflare R2 logic
│   │   └── utils.ts        # PWA & Auth helpers
│   └── styles/
│       └── globals.css     # SDA Brand CSS Variables
├── tailwind.config.ts      # Core Brand Colors & Breakpoints
└── package.json            # Next.js 15 & S3 SDK dependencies


6. Financial Plan & Cost Analysis

Building and maintaining this platform requires a modest but consistent investment to ensure performance and reliability.

A. Development Phase (Monthly Costs)

Item

Cost

Purpose

GitHub Copilot

~$10/mo

AI-powered development assistance to speed up building the complex Next.js logic.

Domain Name

~$15/yr

Official .org or .org.ng web address for the Conference.

B. Infrastructure & Hosting (Monthly Estimates)

Service

Tier

Cost

Notes

Vercel

Hobby

$0

Free for non-commercial projects. Pro tier ($20/mo) only needed if team grows.

CockroachDB

Serverless

$0

Free up to 10GB storage and 50M request units. High availability included.

Cloudflare R2

Pay-as-you-go

~$0 - $10

First 10GB free. $0.015/GB/mo after. **$0 Egress fees** (No cost for downloads).

C. Total Estimated Initial Monthly Budget

Minimum Operational Cost: ~$10.00 USD (GitHub Copilot only).

Scaling Operational Cost: ~$25.00 - $45.00 USD (If storage exceeds free tier and Vercel Pro is required).

7. Actionable Next Steps

Infrastructure: Set up accounts on Vercel, Cloudflare, and CockroachDB.

Initialization: Run npx create-next-app@latest crc-platform --typescript --tailwind --eslint.

Environment: Configure .env.local with your DATABASE_URL and R2_SECRET_KEY.

Baseline Build: Implement the globals.css and tailwind.config.ts we defined to lock in the brand identity.