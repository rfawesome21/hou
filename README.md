# House of Kaia — Website & CMS

**House of Kaia** is a modern, content-driven fashion & lifestyle platform powered by **Payload CMS** and **Next.js**.
This repository includes a fully working backend, a beautiful, production-ready website, and a scalable content authoring system designed for editorial workflows.

Use this project to manage:

* Fashion drops, collections, and product showcases
* Blog posts, stories, and editorials
* Brand pages and lookbooks
* SEO-optimized landing pages
* A flexible content publishing pipeline

---

## Core Features

* Fully configured **Payload CMS** backend
* **Authentication** & access control
* **Layout Builder** (hero, content, media, CTA, etc.)
* **Preview mode** (draft + live preview)
* **On-demand revalidation** for instant frontend updates
* **SEO-ready** pages
* **Search** system
* **Redirects** for legacy URLs
* **Scheduled publishing**
* Beautiful **Next.js 15** frontend with Tailwind & shadcn/UI

---

## Quick Start

Follow these steps to run *House of Kaia* locally.

### 1. Clone the Repo

```bash
git clone <your-repo-url> house-of-kaia
cd house-of-kaia
```

### 2. Setup Environment Variables

Copy the example env:

```bash
cp .env.example .env
```

Update values as needed (database, Payload secret, etc.).

### 3. Install & Start

```bash
pnpm install
pnpm dev
```

Open:

```
http://localhost:3000
```

Log in through the CMS UI and create your first admin user.

---

## How It Works

The CMS configuration is structured for fashion-focused editorial content. Key collections include:

### **Users**

Admin/auth-enabled users with access to unpublished drafts and workflows.

### **Pages**

All pages use the layout builder for maximum flexibility—great for campaign pages, lookbooks, and brand stories.

### **Posts**

Used for editorial content, blogs, and news.

### **Media**

Structured image handling with focal point, resizing, and preconfigured image sizes.

### **Categories**

Nested taxonomies for organizing posts (e.g., “Fashion → Runway”).

### **Globals**

* **Header** navigation
* **Footer** links and branding

---

## Access Control

* Public users can read published pages & posts
* Admin users can create, edit, and publish content
* Draft mode ensures content is only public when published

---

## Layout Builder

Reusable building blocks power all custom page designs:

* Hero
* Media block
* Content block
* Call-to-Action
* Archive lists

Perfect for dynamic brand storytelling.

---

## Rich Editing (Lexical)

The CMS provides a smooth editor with:

* Inline formatting
* Media embeds
* Link management
* Payload blocks

---

## Draft Preview & Live Preview

Preview any page or post before publishing:

* **Draft Preview** → opens unpublished changes inside the website
* **Live Preview** → real-time preview while editing

---

## On-demand Revalidation

When content is published or updated, the website regenerates just the pages affected — keeping everything fresh and fast.

> For image updates, republish the page to refresh Next.js image cache.

---

## SEO & Search

* Automatic meta fields
* Payload SEO Plugin
* Integrated search results pages
* Redirects for long-term URL integrity

---

## Jobs & Scheduled Publishing

Schedule posts, drops, or pages to publish/unpublish automatically — ideal for launches.

---

## Frontend (Website)

The House of Kaia frontend is built with:

* **Next.js App Router (15)**
* **TypeScript**
* **TailwindCSS**
* **shadcn/ui**
* **Payload Admin Bar**
* **Full dark mode support**

Includes:

* Blog system
* Dynamic landing pages
* Media-rich layouts
* Authentication
* SEO baked in

---

## 🧪 Development Notes

### Postgres Support

Payload uses schema-based migrations. For local development:

```bash
pnpm payload migrate:create
```

Then on deployments:

```bash
pnpm payload migrate
```

### Docker Support

```bash
docker-compose up
```

---

## 🌱 Seed Data (Optional)

Seed the database from the CMS Admin Panel.
**Warning:** This clears existing data.

---

## 🏭 Production

1. Build:

```bash
pnpm build
```

2. Start:

```bash
pnpm start
```

---

## ☁️ Deployment Options

### **Payload Cloud (recommended)**

Fastest way to deploy website + CMS in one click.

### **Vercel**

Supported via the Vercel Postgres adapter.

### **Self-hosting**

Deploy like any standard Node.js app (VPS, Coolify, DigitalOcean, etc.)

---

## ❓ Support

For issues or questions:

* Join the **Payload Discord**
* Open a **GitHub Discussion** in your repo