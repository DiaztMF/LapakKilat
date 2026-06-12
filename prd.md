# Product Requirement Document (PRD)

**Project:** LapakKilat (No-Code Instant Mini-Catalog Platform for Micro-UMKM)[cite: 1]  
**Version:** 1.0 (MVP Scope - INF TECH FESTIVAL 2026)[cite: 1]  
**Status:** Approved & Ready for Execution  

---

## 📑 1. Title & Revision History

### Project Information
*   **Project Name:** LapakKilat[cite: 1]
*   **Creation Date:** June 12, 2026
*   **Author:** Diazt Muhammad Firmansyah (Project Manager & Tech Lead)
*   **Target Release:** June 15, 2026 (Online Selection Phase Submission Deadline)[cite: 1]

### Revision History
| Version | Date | Description of Changes | Author |
| :--- | :--- | :--- | :--- |
| **v0.1** | June 12, 2026 | Initial concept ideation, feature mapping, and tech stack setup. | Diazt M.F. |
| **v1.0** | June 12, 2026 | Baseline MVP finalized: Integrated Better Auth, Zustand, Drizzle ORM, Cloudflare R2, and QR Code system. | Diazt M.F. |

---

## 🎯 2. Background & Objectives (Objective)

### Background
Many micro-UMKM operators and street food vendors (*Pedagang Kaki Lima* / PKL) in Indonesia struggle to expand their market reach digitally due to high technical barriers[cite: 1]. Giant e-commerce platforms or marketplaces are often overwhelmingly complex, featuring bloated dashboards, tedious registration flows, and automated payment gateways that feel unnatural to micro-merchants who prefer direct personal interactions[cite: 1]. Conversely, building a custom website demands coding expertise and recurring hosting budgets that these businesses simply cannot afford[cite: 1].

### Objectives & Visi Proyek
*   **Lowering the Technical Barrier:** Provide an instant, form-driven *no-code* mini-catalog builder that enables merchants to launch a responsive storefront website in under 5 minutes without dealing with code or server management[cite: 1].
*   **Promoting Grassroots Digital Inclusion:** Empower the traditional local economy (PKL, neighborhood grocery stores, and home-based culinary kitchens) with a professional and lightweight online identity[cite: 1].
*   **Localization Priority:** Ensure 100% of the merchant dashboard and customer-facing catalogs are rendered in **Bahasa Indonesia** to maintain high accessibility, familiarity, and ease of use for the local community.
*   **Competition Optimization:** Build a fully functional, bug-free MVP aligned perfectly with the subtheme *"UMKM & Digital Economy"* to score maximum points in the INF TECH FESTIVAL 2026 competition[cite: 1].

---

## 👥 3. Target User (User Persona)

The platform fundamentally serves two distinct user actors:

### A. The Creator (Micro-UMKM Merchant)
*   **Profile:** Street food vendors, traditional mom-and-pop grocery shops (*warung kelontong*), or home-based snack producers operating via pre-orders.
*   **Needs:** To present their current menu, inventory, and pricing cleanly to customers via a single shareable link (URL) or a scannable QR Code.
*   **Constraints:** Low-to-medium digital literacy, manages the entire business exclusively via an entry-level smartphone, highly cost-sensitive, and cannot afford downtime or complex administration.

### B. The Consumer (End-Buyer)
*   **Profile:** General public, local neighborhood residents, or routine customers looking to purchase items from their favorite local merchant.
*   **Needs:** Fast access to the merchant's catalog without downloading massive apps, transparent pricing, and a smooth checkout flow.
*   **Constraints:** Accesses the shop via mobile web browsers, expects a highly responsive interface, and prefers completing transactions natively through WhatsApp text chats.

---

## 🛠️ 4. Feature Specifications (Features)

Features are prioritized to guarantee that the core application engine works flawlessly during live evaluation before the competition deadline[cite: 1].

### P1: Core MVP Scope (Must Work 100% Without Major Bugs)
1.  **Google OAuth Integration (Better Auth):** Seamless registration and login flow for creators via a one-click Google login. The database strictly enforces **1 Google Account = 1 Shop/Catalog** to dramatically simplify data structure and user routing.
2.  **Form-Driven No-Code Dashboard (Bahasa Indonesia):** A centralized creator dashboard written entirely in Indonesian. It allows merchants to fill in simple text inputs for store profiles (Nama Toko, Slogan, No. WhatsApp, Profile/Banner Photos) and choose from 3 visual design presets with a simple radio button select.
3.  **Dynamic Storefront Rendering:** Next.js dynamic routing system (`/[slug]`) that reads parameters from the URL, instantly pulls store/product records from the PostgreSQL database, and renders the catalog utilizing the merchant's chosen preset design style.
4.  **Dynamic Category Tabs:** A client-side tagging system. Merchants type free text for a category name (e.g., "Makanan Berat", "Minuman") inside the product creation form. The storefront dynamically parses these unique texts into horizontal navigation tabs for quick filtering.
5.  **Client-Side Shopping Cart (Zustand):** A lightweight floating shopping cart interface fixed at the bottom of the customer's mobile browser viewport. It tracks selected items, handles quantity arithmetic, and displays total prices in real-time.
6.  **WhatsApp Direct Checkout Engine:** An automated compiler that takes current checkout items out of the Zustand state and formats them into a neat, readable string block. Clicking the button seamlessly forwards the customer into the merchant's WhatsApp chat with a pre-written order string (e.g., *"Halo [Nama Toko], saya [Nama Pembeli] mau memesan..."*).
7.  **Auto QR Code Generator:** Dynamically generates a high-quality QR Code graphic inside the merchant's dashboard pointing exactly to their custom URL (`lapakkilat.id/slug-toko`) paired with a one-click "Unduh QR Code" PNG download action.

### P2: Secondary Priority (Nice-to-Have if Time Permits)
1.  **Frontend Image Upload Validation:** Automated checks on the client-side file picker component to intercept and reject files exceeding 2 MB for product/banner slots, conserving Cloudflare R2 storage resources.

### P3: Out of Scope (Explicitly Excluded for Competition MVP)
1.  Automated automated payment gateways (e.g., Midtrans or Xendit integration) — Transactions are finished manually on WhatsApp.
2.  Live shipping fee APIs (RajaOngkir, GoSend, or JNE integrations).
3.  Live inventory decrement tracking and low-stock notification triggers.

---


## 🔄 5. User Flow & Design Guidelines

### System Sitemap Arsitektur Halaman
```text
├── / (Main Promotional Landing Page - Platform marketing)
├── /api/auth/* (Better Auth API Endpoints for Google OAuth)
├── /dashboard (Creator Central Hub - Guarded by Server Sessions)
│   ├── /dashboard/profil (Manage Shop Details, Template Presets, QR Download)
│   └── /dashboard/produk (Product CRUD - Max 20 items per shop, Dynamic Category input)
└── /[slug] (Dynamic Web Catalog Storefront - Public, Highly Optimized for Mobile)

```

### User Journey Path
```
[Merchant] -> Landing Page -> Login Google -> Input Nama Toko -> Access Dashboard -> Add Products -> Click Publish -> URL Active
                                                                                                                        |
[Customer] <----------------- Opens URL Tautan / Scans Paper QR Code <--------------------------------------------------+
    |
    v
Web Catalog (ID) -> Tap Filter Tabs -> Click '+ Keranjang' -> Input Name -> Tap 'Pesan via WA' -> Redirect to WhatsApp App
```

### UI/UX Design & Copywriting Mandate

* **Localization:** Every placeholder, navigation tag, success state, and button label across `/dashboard` and `/[slug]` must use Bahasa Indonesia (e.g., Gunakan *"Tambah ke Keranjang"* menggantikan *"Add to Cart"*, dan *"Pesan Sekarang"* menggantikan *"Checkout"*).
* **Mobile-First Constraint:** When a customer catalog `/[slug]` is launched on widescreen monitors or desktop environments, the core container elements must be centrally aligned with a maximum constraint width of `max-w-md` (simulating a mobile screen device layout) to maintain optimal visual balance.

### Preset Design Matrix (Tailwind Utility Mapping)

| Style Preset | Base Canvas / Background | Typography Tokens | Main Call-To-Action (CTA) |
| --- | --- | --- | --- |
| **Fresh & Clean** | `bg-white` | `text-emerald-900` | `bg-emerald-600 text-white rounded-lg` |
| **Playful** | `bg-pink-50/50` | `text-slate-800` | `bg-rose-400 text-white rounded-2xl shadow-sm` |
| **Minimalist** | `bg-zinc-950` | `text-zinc-50` | `rounded-none border border-zinc-800` (Crisp Box Borders) |

---

## ⚙️ 6. Technical Requirements & Performance

### Technology Architecture (Tech Stack)

* **Core Meta-Framework:** Next.js 16 (App Router architecture) to orchestrate optimal layout separation and fluid dynamic slug path matching (`app/[slug]/page.js`).
* **Authentication Service:** Better Auth library coupled with Google Client Identification configs.
* **Client State Orchestration:** Zustand for a super lightweight, decoupled client-side global store maintaining item additions, decrements, and total caching.
* **Database Object-Relational Mapper:** Drizzle ORM managing schema definitions, type safety, and connection pooling strings.
* **Data Tier Storage:** Neon Postgres serverless layer to persist core operational tables.
* **Object Asset Blob Storage:** Cloudflare R2 (S3-Compatible) utilizing native AWS S3 SDK wrappers to achieve high-performance asset streaming with zero egress fees for image files.

### Performance & Device Constraints

* **Responsiveness:** Storefront pages must achieve perfect layouts across viewport sizes stretching down to 360px wide.
* **Loading Benchmarks:** The dynamic catalog path must prioritize Server-Side Rendering (SSR) to guarantee a First Contentful Paint (FCP) metric threshold below 1.5 seconds on a standard 4G mobile cellular data band.
* **Media Optimization:** All merchant-uploaded product assets displayed to customers must pipe through the native Next.js `<Image/>` component wrappers to enforce automated WebP graphic transmutation on-the-fly.

### Security Controls

* **Server Session Guarding:** Every private subpath housed within `/dashboard/*` must validate active session objects via Next.js middleware execution. Unauthorized state hits must drop the connection and issue a permanent HTTP redirect back to the home route `/`.
* **URL Sanitization:** Shop slug generation hooks must subject strings to regular expression replacements to drop whitespace, special characters, or uppercase typography tokens to protect query safety.

---

## 📊 7. Success Indicators (Metrics / Analytics)

Since LapakKilat is built to satisfy evaluation checklists inside a strict web development hackathon layout, success is calculated against formal score thresholds:

* **Functionality Excellence (Max 25 Points):** The system reliably spins up database-backed paths instantly upon clicking save, and the Zustand order compiler maps perfectly to active WhatsApp text prompts with zero script exceptions.
* **UI/UX Accessibility (Max 20 Points):** Navigating through horizontal category tags remains fluid, floating cart blocks cause no overlap anomalies on small screens, and template preset switches re-render utility classes cleanly without breaking layout margins.
* **Tech Stack Sophistication (Max 15 Points):** Secure Google login handshakes through Better Auth work flawlessly, Drizzle queries scale efficiently with single-digit millisecond latency overheads, and the system runs stable over secure HTTPS endpoints on the Vercel architecture.