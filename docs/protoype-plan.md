Prototype Execution Plan: SDA Cross River Conference (Static Version)

Goal: Create a functional, interactive mockup for GitHub Pages to secure leadership approval.
Tech: HTML5, CSS3, Vanilla JavaScript.

1. The Page List (Deliverables)

We will build these 7 specific files to demonstrate the full scope of the platform.

Filename

Purpose

Key Features to Demo

index.html

Home/Landing

Hero banner, "Watch Live" button, Featured Sermon, Welcome message.

sermons.html

Archive Library

Grid of sermon videos, Search bar, Filter by Preacher.

live.html

Live Stream

Embedded YouTube/Facebook player mockup, Chat interface simulation.

departments.html

Ministries Hub

Cards for AMO, AWM, AYO, Children's Ministry, Dorcas.

department-view.html

Single Dept View

A template showing what the "AMO" or "AYO" specific page looks like (Resources, Gallery).

events.html

Calendar

Upcoming events list, "Add to Calendar" button simulation.

contact.html

Connect

Contact form, Map location, "Join Us" membership form.

2. Directory Structure (VS Code)

Set up your folder exactly like this to ensure GitHub Pages works correctly.

crc-prototype/
│
├── index.html              # Main Entry Point
├── sermons.html
├── live.html
├── departments.html
├── department-view.html
├── events.html
├── contact.html
│
├── assets/                 # All your static resources
│   ├── css/
│   │   ├── style.css       # Main stylesheet (Reset + Global Styles)
│   │   └── responsive.css  # Mobile adjustments (Media Queries)
│   │
│   ├── js/
│   │   └── main.js         # Navigation logic, Mobile Menu toggle, Tab switching
│   │
│   ├── images/
│   │   ├── logo.png        # CRC Logo
│   │   ├── hero-bg.jpg     # Main banner image
│   │   ├── pastor.jpg      # Placeholder for sermon thumbnails
│   │   └── icons/          # (Optional) specific department icons
│   │
│   └── vendor/             # External libraries (optional)
│       └── font-awesome/   # If not using CDN


3. Required Assets Checklist

Before coding, gather or generate these items to keep the design "Robust & Beautiful."

Images:

[ ] Logo: The official SDA Cross River Conference logo (PNG transparent).

[ ] Hero Image: High-quality photo of the church building or a vibrant worship session.

[ ] Sermon Thumbnails: 3-4 varied images for the sermon grid.

[ ] Ministry Action Shots: Photos of Men (AMO) and Women (AWM) in uniform/action.

Icons:

Use Phosphor Icons or FontAwesome (CDN links provided in code) for things like Play buttons, Calendars, and User icons.

Colors (SDA Branding):

Primary: #003087 (SDA Blue)

Secondary: #F9A01B (Gold/Yellow accents)

Accent: #009A44 (Green for growth/youth)

4. Development Strategy (Step-by-Step)

Step 1: The "Master Layout" (Day 1)

Build the Navigation Bar (Logo left, Links center, "Give" button right).

Build the Footer (Links, Copyright, Social Icons).

Why: You will copy-paste this Header/Footer into every single HTML file.

Step 2: The Homepage (Day 2)

Create the Hero Section with a big "Welcome" text and background image.

Add a "Latest Sermon" section (3 card grid).

Add a "Verse of the Day" strip.

Step 3: The Sermon & Live Pages (Day 3)

sermons.html: Use a CSS Grid to display video thumbnails.

live.html: Embed a dummy YouTube iframe (<iframe src="...">) to show how streaming looks.

Step 4: Departments & Events (Day 4)

Create the grid for ministries.

Create a simple table or list layout for upcoming events.

Step 5: JavaScript Logic (Day 5)

Write main.js to handle the Mobile Menu (Hamburger icon).

Add simple interactivity (e.g., clicking "Watch" opens a modal).

5. Next Steps for You

Create the Folder: Create a folder named crc-prototype on your desktop.

Open VS Code: Open that folder.

Create Files: Right-click and create index.html, assets/css/style.css, etc., following the structure above.

Start Coding: Begin with the index.html structure.