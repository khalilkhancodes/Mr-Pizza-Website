# FastBite - Premium Fast Food Ordering Website

A modern, production-ready Next.js 14 application for a fast-food restaurant with WhatsApp-based checkout, cash on delivery, and a lightweight staff order management console.

## 🚀 Features

### Customer-Facing
- **Home Page** - Hero, featured deals, best sellers, quick links
- **Menu Page** - Category filtering, search, item cards with quick add-to-cart
- **Product Detail** - Full image, description, size/add-on options, quantity selector
- **Deals Page** - Bundled offers with original vs discounted pricing
- **About Page** - Brand story, values, team, timeline
- **Contact Page** - Form (email API), map embed, hours, contact info
- **Cart** - Persistent drawer with quantity editing, notes, live subtotal
- **Checkout** - Name, phone, address, notes; server-validated total
- **WhatsApp Handoff** - Pre-filled order message with order code & tracking link
- **Order Status** - Public read-only page via unguessable link; real-time status timeline

### Staff Console (Protected)
- **Login** - Supabase Auth (email/password, rate-limited)
- **Orders List** - Newest first, status badges, view details link
- **Order Detail** - Full items, customer info, status update buttons (Confirm/Deliver/Cancel)

### Technical
- **Next.js 14 App Router** with SSR/ISR
- **Tailwind CSS** with custom design tokens from design system
- **Zustand** for cart state (persisted to localStorage)
- **Supabase** (Postgres + Auth) - server-only access via service role
- **Sanity.io-ready** content layer (local JSON seed for dev)
- **Next.js Image Optimization** with lazy loading
- **TypeScript** strict mode
- **Rate limiting** on order/contact endpoints

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| State | Zustand + localStorage |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| CMS | Sanity.io (schema-ready) |
| Images | Next.js Image + Cloudinary/Sanity |
| Hosting | Vercel |

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── orders/        # POST create order, POST status update
│   │   └── contact/       # POST contact form
│   ├── menu/              # Menu page
│   ├── product/[slug]/    # Product detail
│   ├── deals/             # Deals page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── cart/              # Cart drawer
│   ├── checkout/          # Checkout page
│   ├── order/[id]/        # Order status page
│   └── staff/             # Protected staff routes
├── components/
│   ├── ui/                # Base UI components (Button, Input, etc.)
│   ├── layout/            # Header, Footer, GlobalLoader
│   ├── cart/              # CartDrawer
│   └── forms/             # Form components
├── content/
│   └── menu.ts            # Menu/Deals seed data (Sanity-shaped)
├── lib/
│   ├── supabase/          # Server & client Supabase clients
│   ├── rate-limit.ts      # In-memory rate limiting
│   └── utils.ts           # Helpers (price formatting, IDs, etc.)
├── store/
│   └── cart.ts            # Zustand cart store
├── types/
│   └── index.ts           # TypeScript interfaces
└── globals.css            # Design system tokens & utilities
```

## 🎨 Design System

The design follows the **"Midnight Gilded"** system from `assets/DESIGN.md`:

- **Colors**: Deep charcoal (`#131313`), gold accent (`#EAB308`), cream text (`#FAFAFA`)
- **Typography**: Playfair Display (headlines) + Inter (body/UI)
- **Spacing**: 8px baseline, generous whitespace (48-80px section gaps)
- **Components**: Sharp containers (0px), soft interactive (4-8px), gold focus rings
- **No shadows** - depth via tonal layers and borders
- **Photography-forward** - editorial food imagery with scrim overlays

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm
- Supabase account
- (Optional) Sanity.io account for CMS

### Installation

```bash
# Clone and install
cd fastbite
pnpm install

# Copy environment template
cp .env.example .env.local

# Fill in your values in .env.local
# - Supabase URL & keys
# - WhatsApp business number
# - Email service API key (Resend recommended)
```

### Database Setup

```bash
# Run the migration in Supabase SQL Editor
# Or via Supabase CLI:
supabase db push
```

The migration creates:
- `orders` table with RLS policies
- Auto-updating `updated_at` trigger
- Indexes for common queries

### Development

```bash
pnpm dev
```

Open http://localhost:3000

### Build & Deploy

```bash
pnpm build
pnpm start  # Test production build locally
```

Deploy to Vercel:
1. Connect GitHub repo
2. Add environment variables in Vercel dashboard
3. Deploy

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Service role (server-only) |
| `NEXT_PUBLIC_SITE_URL` | Yes | Production URL for metadata |
| `WHATSAPP_BUSINESS_NUMBER` | Yes | Int'l format (e.g., 15551234567) |
| `RESEND_API_KEY` | No | For contact form emails |
| `CONTACT_EMAIL` | No | Where contact forms go |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | No | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | No | Sanity dataset name |

## 📦 API Endpoints

### `POST /api/orders`
Creates an order with server-side price validation.

**Request:**
```json
{
  "customerName": "John Doe",
  "customerPhone": "+15551234567",
  "deliveryAddress": "123 Main St",
  "note": "No onions",
  "items": [
    { "menuItemId": "item-1", "quantity": 2, "selectedOptions": {} }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "orderId": "abc123...",
  "orderCode": "ORD-A1B2",
  "total": 56.00
}
```

### `POST /api/orders/[id]/status` (Staff only)
Updates order status. Requires valid Supabase Auth session.

### `POST /api/contact`
Submits contact form. Rate limited to 5/min.

## 🛡 Security

- **Server-only DB access** - Browser never talks to Supabase directly
- **Price recalculation** - Order total computed from menu data, never trusted from client
- **Unguessable order IDs** - 24-char nanoid, never listed publicly
- **Staff auth** - Supabase Auth with session cookies, validated server-side
- **Rate limiting** - 10 orders/min, 5 contacts/min per IP
- **HTTPS enforced** - Via Vercel
- **CSP-ready** - Nonce-based scripts, no inline styles

## 🎯 Key Implementation Details

### Cart Persistence
```typescript
// Zustand + localStorage middleware
// Survives page reloads, browser restarts
```

### WhatsApp Handoff
```typescript
// Client-side wa.me link generation
// Message: order code + items + total + tracking link
// Opens in new tab, falls back to phone number display
```

### Order Status Page
```typescript
// /order/[id] - Public read-only
// If staff session cookie present → renders status update forms
// Authorization checked server-side per request
```

### Content Layer (Sanity-Ready)
```typescript
// src/content/menu.ts exports typed functions:
// getMenuItemsByCategory(), getDealById(), calculateItemTotal()
// Swap imports to Sanity client when ready - zero component changes
```

## 📱 Responsive Breakpoints

| Breakpoint | Width | Columns |
|------------|-------|---------|
| Mobile | 375px | 4-col fluid |
| Tablet | 768px | 8-col |
| Desktop | 1440px | 12-col / 1280px max |

## ♿ Accessibility

- Semantic HTML5 (`<nav>`, `<main>`, `<article>`, `<aside>`)
- Focus visible states (gold ring, 2px offset)
- ARIA labels on icon buttons
- Color contrast ≥ 4.5:1 (gold on charcoal = 7.2:1)
- Keyboard navigable cart drawer, modals, menus
- Alt text on all images

## 🧪 Testing

```bash
# Type checking
pnpm typecheck

# Linting
pnpm lint

# Production build test
pnpm build && pnpm start
```

## 📄 License

MIT - Feel free to use for your own projects.

## 🙏 Credits

- Design: Custom "Midnight Gilded" system
- Fonts: Playfair Display & Inter (Google Fonts)
- Icons: Custom SVG (Lucide-inspired)
- Images: Placeholder - replace with your food photography