# Design System & Style Guide: LapakKilat

This document serves as the single source of truth for the visual architecture, token configurations, and interface aesthetics of LapakKilat[cite: 1]. It ensures design consistency across developer workflows and provides explicit instructions for AI generation agents (*vibe coding*).

---

## 1. Machine & Developer Tokens

### Base Project Information
*   **Project Name:** LapakKilat[cite: 1]
*   **Document Baseline Version:** 1.0
*   **UI Framework Baseline:** Tailwind CSS v4
*   **Component Library:** Shadcn UI

### Global Typography
*   **Base & Heading Font:** Inter, sans-serif
*   **Playful Theme Font Override:** Plus Jakarta Sans, sans-serif
*   **Font Weights:** 
    *   Normal: 400
    *   Medium: 500
    *   Semibold: 600
    *   Bold: 700
*   **Text Scale & Line Heights:**
    *   Text XS (12px): Size 0.75rem / Line Height 1rem
    *   Text SM (14px): Size 0.875rem / Line Height 1.25rem
    *   Text Base (16px): Size 1rem / Line Height 1.5rem
    *   Text LG (18px): Size 1.125rem / Line Height 1.75rem
    *   Text XL (20px): Size 1.25rem / Line Height 1.75rem
    *   Text 2XL (24px): Size 1.5rem / Line Height 2rem

### Spacing & Layout Grid
*   **Base Spacing Unit:** 4px (Strictly aligned with Tailwind CSS default spacing steps)
*   **Spacing Scale:**
    *   Space 1: 0.25rem (4px)
    *   Space 2: 0.5rem (8px)
    *   Space 3: 0.75rem (12px)
    *   Space 4: 1rem (16px)
    *   Space 6: 1.5rem (24px)
    *   Space 8: 2rem (32px)
*   **Layout Container Rules:**
    *   Mobile Storefront Container: `max-w-md` (448px - Isolated viewport constraint for the consumer-facing catalog)
    *   Desktop Merchant Dashboard: `max-w-7xl`
    *   Product Card Grid Gap: 1rem (16px)

### System Semantic Colors
*   **Success:** Background `#dcfce7` (`green-100`), Text `#15803d` (`green-700`)
*   **Error:** Background `#fee2e2` (`red-100`), Text `#b91c1c` (`red-700`)
*   **Warning:** Background `#fef9c3` (`yellow-100`), Text `#a16207` (`yellow-700`)

### Preset Design Styles
*   **Style 1: Fresh & Clean**
    *   Template ID: `fresh`
    *   Canvas Background: `#ffffff` (Pure White)
    *   Main Text Color: `#064e3b` (`emerald-950`)
    *   Muted Text Color: `#4b5563` (`gray-600`)
    *   Primary Accent Color: `#059669` (`emerald-600`)
    *   Hover Accent Color: `#047857` (`emerald-700`)
    *   Component Border Radius: 0.5rem (`rounded-lg`)
    *   Card Border Style: 1px solid `#e5e7eb`
    *   Shadow Preset: `shadow-sm`
*   **Style 2: Playful & Warm**
    *   Template ID: `playful`
    *   Canvas Background: `#fff1f2` (`rose-50`)
    *   Main Text Color: `#1e293b` (`slate-800`)
    *   Muted Text Color: `#64748b` (`slate-500`)
    *   Primary Accent Color: `#fb7185` (`rose-400`)
    *   Hover Accent Color: `#f43f5e` (`rose-500`)
    *   Component Border Radius: 1rem (`rounded-2xl`)
    *   Card Border Style: none (Border-free)
    *   Shadow Preset: `shadow-md shadow-rose-100`
*   **Style 3: Bold & Minimalist**
    *   Template ID: `minimalist`
    *   Canvas Background: `#09090b` (`zinc-950`)
    *   Main Text Color: `#fafafa` (`zinc-50`)
    *   Muted Text Color: `#a1a1aa` (`zinc-400`)
    *   Primary Accent Color: `#f4f4f5` (`zinc-100`)
    *   Hover Accent Color: `#e4e4e7` (`zinc-200`)
    *   Component Border Radius: 0px (`rounded-none` / Sharp Edges)
    *   Card Border Style: 1px solid `#27272a` (`zinc-800`)
    *   Shadow Preset: `shadow-none`

---

## 2. Visual & Atmosphere Guidelines (Human-Readable)

### Theme & Vibes
LapakKilat projects a **"Local-Empowerment, Clean, and Zero-Friction"** atmosphere[cite: 1]. The user experience must seamlessly balance a highly clean, professional SaaS layout on the merchant's backend administration dashboard, with an ultra-lightweight, accessible, and highly familiar storefront presentation for everyday local consumers[cite: 1].

*   **Merchant Dashboard Identity:** A clean, uncluttered interface that actively leverages negative space to ensure merchants with limited tech literacy do not feel overwhelmed by too many input elements[cite: 1].
*   **Public Storefront Identity:** Highly optimized for mobile devices, closely mimicking a native smartphone application interface that scraps heavy design assets to guarantee lightning-fast rendering over cell networks.

### Design Principles
*   **Mobile-First Isolation Constraint:** All consumer-facing store pages (`/[slug]`) must strictly reside inside a maximum width layout tier of `max-w-md` (448px) even when accessed via widescreen desktop monitors. The workspace centers automatically on the page to build a clean native application layout feel.
*   **Strict Negative Space Utilization:** Avoid tight layout clusters. Lean into Tailwind's native vertical spacing strings like `space-y-4` or `space-y-6` to preserve maximum reading clarity on lower-end smartphone screens.
*   **Language Intimacy Principle:** To bridge accessibility gaps and drive maximum community confidence, all user-facing interface labels, placeholders, interactive instructions, toast notifications, and modals **must strictly prioritize Bahasa Indonesia**[cite: 1].

---

## 3. Core Components & Page Patterns

### Navigation & Header
*   **Dashboard Admin Navbar:** A fixed top container (`h-16`) utilizing blurred background layer transparency (`backdrop-blur-md bg-white/80`). Houses the minimalistic LapakKilat typography brand logo, a profile avatar icon managing Better Auth session drops, and flat routes.
*   **Storefront Header Section:** Positioned inline inside the public `max-w-md` viewport block. Houses a simple landscape store banner cover, a centered circular profile thumbnail component (`w-20 h-20`), a bold store title header (`text-xl font-bold`), and the store tagline label (`text-sm text-muted`).
*   **Dynamic Category Tabs:** A sticky horizontal action ribbon situated underneath the storefront profile banner. It maps out unique text tags entered dynamically by the merchant into tap-scrollable horizontal elements. Selecting a element immediately maps filters over local client arrays.

### Buttons & Input
*   **Primary Call-to-Action (CTA):** The primary interactive path buttons must dynamically map to structural rules based on the store's active design template (`rounded-lg`, `rounded-2xl`, or `rounded-none`). Layout text scaling sits standard at `text-base font-semibold py-3` to fulfill comfortable mobile finger press sizes.
*   **Floating Cart Trigger Button:** Fixed at a static stack location at the base viewport axis (`bottom-6 left-1/2 -translate-x-1/2 w-11/12 max-w-sm z-50`). Styled to dynamically track active Zustand array object counts and running total prices (e.g., `🛒 3 Item — Rp54.000`).
*   **Form Field Inputs:** Standardized form fields consume customized base components from Shadcn UI. Borders leverage thin neutral outline traits that fluidly swap over into a distinct active color halo ring linked directly to the primary color palette of the theme when selected.

### Cards & Bands
*   **Product Grid Cards:** Arranged across a symmetrical 2-column layout grid matrix on mobile smartphone displays (`grid-cols-2 gap-3`).
*   **Card Anatomy:** Top half contains a uniform 1:1 square ratio crop product placeholder rendered cleanly through Next.js `<Image/>` wrappers. Bottom half handles contextual descriptive text: item name title (`text-sm font-semibold line-clamp-1`), category label indicator badge, localized high-contrast price text (`text-base font-bold text-accent`), and a full-width `+ Keranjang` call element.
*   **Card Border Constraints:** Strictly dependent on the active style selection data block. Playful styles replace borders with loose tinted shadows, whereas Minimalist views enforce sharp, thin `border-zinc-800` styling lines.

---

## 4. Accessibility & Interaction Policies

### Accessibility & Contrast Compliance (WCAG 2.1 AA)
To achieve flawless functional accessibility and secure the maximum layout scoring evaluation criteria across competition guidelines[cite: 1]:
*   **Contrast Balancing Rule:** Core text components holding critical transactional data hooks (such as currency values or button texts) must maintain a minimum contrast ratio step of **4.5:1** against their background layer surfaces.
*   **Fresh Theme Color Contrast:** Avoid loading flat white text over light-green values. Buttons must consume highly saturated deep shades (`bg-emerald-600`) as safe background surfaces for white text labels to enforce maximum legibility.
*   **Minimalist Theme Color Contrast:** High contrast is naturally achieved via white text over charcoal/black backdrops (`bg-zinc-950`). Secondary descriptive strings must fall safely into clear text reading zones via centered gray values (`text-zinc-400`).
*   **Touch Targets Footprints:** All clickable elements (buttons, tag selectors, category filter chips, and cart trash buttons) must guarantee a minimum target surface footprint of **44px × 44px** on smartphone viewports to accommodate standard finger sizes without miss-clicks.

### Interactions & Motion
Micro-animations are restricted to thin processing steps to maximize performance delivery speeds on budget mobile units.
*   **Hover & Transition Classes:** All interactive elements (links, catalog cards, selections, and call buttons) must apply transitions using matching utility timing rules: `transition-all duration-150 ease-in-out`.
*   **Tactile Click Feedback:** Pressing down on primary buttons must invoke immediate physical viewport confirmation feedback via brief scale transformations (`active:scale-95`).
*   **Shopping Cart Drawer Motion:** Clicking the floating cart path must pull the shopping summary overlay tray into view via linear bottom-to-top translate slides (`transition-transform duration-200 ease-out translate-y-0`) instead of hard pop-ins.