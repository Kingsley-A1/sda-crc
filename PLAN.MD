Project Blueprint: SDA Cross River Conference Digital Platform

Status: Draft | Stack: Next.js (App Router), PostgreSQL, Cloudflare R2 | Type: PWA

1. Executive Summary

This project aims to build a Progressive Web App (PWA) for the Seventh-Day Adventist Church Cross River Conference. The platform will serve two distinct groups:

The Admin/Conference: Tools to manage content, events, and ministries without coding.

The Members/Public: A fast, installable app to watch sermons, stream programs, and connect with ministries (AMO, AWM, AYO).

2. Technical Architecture

The stack is chosen for performance and cost-efficiency.

Frontend (The "Face"): Next.js 15 (App Router).

Why: Incredible speed, SEO optimized (crucial for evangelism), and PWA support (installable on phones like an app).

Database (The "Brain"): PostgreSQL (Managed via Neon or Supabase).

Why: Structured data is essential for maintaining thousands of sermon records, member directories, and event calendars.

Storage (The "Vault"): Cloudflare R2.

Why: Traditional cloud storage charges for "egress" (downloading files). R2 is zero-egress fee. This is critical for a church allowing unlimited sermon downloads.

Live Streaming: Hybrid Approach.

Strategy: We will not host live streams directly on R2 (it is for storage). We will embed a YouTube Live or Facebook Live player on the site for the live event, then automatically upload the recording to R2 for the permanent "Sermon Archive."

3. Database Schema (Simplified)

We need three core tables to start.

A. users (Admins & Members)

Column

Type

Notes

id

UUID

Primary Key

email

String

Unique, for login

role

Enum

'ADMIN', 'EDITOR', 'MEMBER'

ministry_affiliation

String

e.g., 'AMO', 'AWM'

B. sermons

Column

Type

Notes

id

UUID

Primary Key

title

String

preacher

String

video_url

String

Link to Cloudflare R2 file

audio_url

String

Link to Cloudflare R2 file (for low data)

date

DateTime

C. events

Column

Type

Notes

id

UUID

Primary Key

title

String

department

String

e.g., 'Youth', 'Women'

start_time

DateTime

is_live

Boolean

Toggles the "Live Now" banner

4. Feature Implementation Roadmap

Phase 1: The Foundation (Weeks 1-2)

[ ] Setup Next.js project with Tailwind CSS.

[ ] Configure next-pwa to make the site installable.

[ ] Build the "App Shell" (Navbar, Sidebar, Footer).

[ ] Create the Landing Page (Hero section, Featured Sermon).

Phase 2: The Archive (Weeks 3-4)

[ ] Set up Cloudflare R2 bucket (crc-sermons).

[ ] Build the Admin Upload Form:

Action: Admin selects video file -> File uploads directly to R2 -> URL saved to Postgres.

[ ] Build the Public Sermon Library with search/filter by preacher.

Phase 3: Ministries & Departments (Weeks 5-6)

[ ] Create dynamic pages for AMO, AWM, and AYO.

[ ] Each department gets a "Resources" tab (PDFs/Guides hosted on R2).

[ ] Build the "Contact Us" and "Join Us" forms (connected to email alerts).

Phase 4: Live & Interactive (Weeks 7-8)

[ ] Integrate the Live Stream Player page.

[ ] Add "Upcoming Events" calendar.

[ ] Final Polish: Accessibility check, SEO tags, Performance tuning.

5. Project Directory Structure (VS Code View)

This is how your project files will be organized. We are using the src directory pattern for cleaner organization.

crc-platform/
├── public/ # Static assets (images, logos, favicon, manifest.json)
├── src/
│ ├── app/ # App Router (Pages & Layouts)
│ │ ├── (auth)/ # Route group for authentication (login/signup)
│ │ ├── (main)/ # Route group for main site
│ │ │ ├── page.tsx # Home Page (Landing)
│ │ │ ├── sermons/ # /sermons route
│ │ │ ├── events/ # /events route
│ │ │ ├── departments/
│ │ │ │ ├── amo/ # /departments/amo
│ │ │ │ ├── awm/ # /departments/awm
│ │ │ │ └── ayo/ # /departments/ayo
│ │ │ └── about/ # /about route
│ │ ├── admin/ # Admin Dashboard (protected routes)
│ │ ├── api/ # API Routes (Serverless functions)
│ │ ├── layout.tsx # Root Layout
│ │ └── globals.css # Global Styles (Tailwind imports)
│ ├── components/ # Reusable UI components
│ │ ├── ui/ # Buttons, Cards, Inputs (base elements)
│ │ ├── shared/ # Navbar, Footer, Sidebar
│ │ └── features/ # SermonPlayer, EventCard (complex logic)
│ ├── lib/ # Utility functions & Database config
│ │ ├── db.ts # Postgres connection setup
│ │ ├── r2.ts # Cloudflare R2 upload helper
│ │ └── utils.ts # General helper functions
│ └── types/ # TypeScript definitions (Sermon, User, Event interfaces)
├── .env.local # Environment variables (API Keys - DO NOT COMMIT)
├── next.config.mjs # Next.js configuration (PWA settings go here)
├── tailwind.config.ts # Tailwind styling config
└── package.json # Dependencies

6. Actionable Next Steps

Initialize the Repo: Run npx create-next-app@latest crc-platform.

Database: Set up a free Postgres instance on Neon.tech.

Storage: Create a Cloudflare account and purchase R2 (starts free/cheap).

Prototype: Use the React code provided below as your page.tsx starting point.
