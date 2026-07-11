# Velô Sprint - Electric Vehicle Configurator

React web application for configuring and purchasing the **Velô Sprint** electric vehicle.

## About the Project

A SPA (Single Page Application) that allows you to:
- Customize the vehicle's colors, wheels, and options
- Calculate prices in real time
- Place orders with credit analysis
- Check order status

**Velô Sprint Specs:** 450 km range | 0-100 km/h in 3.2s | 500 hp

---

## Tech Stack

| Category | Technologies |
|-----------|-------------|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui |
| **State** | Zustand (global), React Hook Form (forms) |
| **Validation** | Zod |
| **Data Fetching** | TanStack Query |
| **Backend** | Supabase (PostgreSQL + Edge Functions) |

---

## Installation

```bash
# Install dependencies
yarn install

# Run in development
yarn dev
```

Access: `http://localhost:5173`

---

## Supabase Setup

### 1. Create Project

1. Go to [supabase.com](https://supabase.com) and create an account
2. Click **New Project**
3. Choose a name and password for the database
4. Wait for creation (~2 minutes)

### 2. Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_PROJECT_ID="your_project_id"
VITE_SUPABASE_PUBLISHABLE_KEY="your_public_anon_key"
VITE_SUPABASE_URL="https://your_project_id.supabase.co"
```

> Find this information in: **Project Settings → API**

### 3. Deploy (database + functions)

```bash
# Install CLI
yarn add supabase -D

# Login and link project
yarn supabase login
yarn supabase link --project-ref kwtzwqhnnybnkpqhughu

# Apply migrations (creates tables and RLS)
yarn supabase db push

# Deploy Edge Functions
yarn supabase functions deploy
```

Done! The database and functions will be configured.

---

## Main Structure

```
src/
├── pages/           # Application pages
├── components/      # React components
│   ├── configurator/   # Car configurator
│   ├── landing/        # Landing page
│   └── ui/             # shadcn/ui components
├── store/           # Global state (Zustand)
├── hooks/           # Custom hooks
└── integrations/    # Supabase client
```

---

## Routes

| Route | Description |
|------|-----------|
| `/` | Landing page |
| `/configure` | Vehicle configurator |
| `/order` | Checkout/Order |
| `/success` | Order confirmation |
| `/lookup` | Order lookup |

---

## Pricing Model

- **Base price:** R$ 40,000
- **Sport Wheels:** +R$ 2,000
- **Precision Park:** +R$ 5,500
- **Flux Capacitor:** +R$ 5,000
- **Financing:** 12x with 2% monthly interest

---

## Database

**`orders` table** — main fields:
- `order_number` — Format: VLO-XXXXXX
- `color`, `wheel_type`, `optionals` — Configuration
- `customer_name`, `customer_email`, `customer_cpf` — Customer
- `payment_method`, `total_price` — Payment
- `status` — pending, approved, rejected, analysis

---

## Credit Analysis

| Score | Result |
|-------|-----------|
| > 700 | Approved |
| 501-700 | Under review |
| ≤ 500 | Rejected |

*If down payment ≥ 50% of total, approves even with score < 700*

---

## Main Flow

```
Landing → Configurator → Checkout → Credit Analysis → Confirmation
```

---

## Scripts

```bash
npm run dev      # Development
npm run build    # Production build
npm run lint     # Lint code
```
