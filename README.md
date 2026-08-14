# INGRES AI Advanced - Intelligent Groundwater Virtual Assistant for India

An intelligent, light, airy, and accessible frontend dashboard and AI virtual assistant designed for India's hydro-geology ecosystem. Built specifically for **Farmers**, **Government Officials (Ministry of Jal Shakti / CGWB)**, and **Researchers**.

![Design Theme](https://img.shields.io/badge/Theme-Light%20%26%20Airy-3B82F6)
![Performance](https://img.shields.io/badge/Network-2G%2F3G%20Optimized-10B981)
![Tech Stack](https://img.shields.io/badge/Stack-Next.js%2014--React--TypeScript--Tailwind--Zustand-blue)

---

## 🎨 Design System & Theme Specifications

- **Page Background**: `#FFFFFF` (pure white)
- **Card Surface**: `#F9FAFB` (off-white light gray, border `#E5E7EB`)
- **Hover Surface**: `#F3F4F6` (subtle hover state)
- **Primary Color**: `#3B82F6` (Soft blue groundwater accent)
- **Primary Light / Dark**: `#DBEAFE` / `#1E40AF`
- **Safe / Good**: `#10B981` (Soft green background `#D1FAE5`)
- **Warning**: `#F59E0B` (Amber background `#FEF3C7`)
- **Critical**: `#EF4444` (Soft red background `#FEE2E2`)
- **Typography**: Inter / System UI font hierarchy, 48px touch-friendly mobile targets.

---

## 🚀 Key Features & Pages

1. **Landing Page (`/`)**: Hero section, 3-persona breakdown (Farmer, Official, Researcher), core features, and live telemetry preview.
2. **Dashboard Overview (`/dashboard`)**: Personalized welcome header, region status card with trend indicator, 4 quick stat cards, 12-month Recharts trend line chart with metric toggles, and recent alerts.
3. **Detailed Analysis (`/analysis`)**: Single parameter drilldown (Groundwater Level m bgl, Extraction %, Recharge mm/yr), time horizon selector (1M, 3M, 6M, 1Y, All), area chart, explanations, and data citations.
4. **Compare Districts (`/compare`)**: Multi-district search & selection, color-coded comparative matrix table, and comparative bar chart.
5. **Alerts & Warnings (`/alerts`)**: Filterable warning feed with acknowledgment/dismissal actions, and notification controls (Email, SMS, Critical-only, Frequency).
6. **Reports Builder (`/reports`)**: Template selection (Executive Summary, Detailed Analysis, Farmer-Friendly, Technical), custom metric selector, date range picker, live preview modal, and PDF downloads.
7. **Geospatial Map (`/map`)**: Interactive vector GIS map viewer with telemetry station pins color-coded by safety status, layer controls, zoom controls, and station popup cards.
8. **AI Assistant Search (`/search`)**: Natural language query search bar ("Ask about your water..."), suggested query pills, and AI assistant response cards with stats & recommendations.
9. **User Settings (`/settings`)**: Profile info, role selector, language switcher (English, Hindi, Telugu, Tamil, Marathi, Bengali), units system, and JSON data export.
10. **Error Pages (`/not-found`, `/error`)**: Custom 404 & 500 error pages adhering to the light design system.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18 + TypeScript (Strict mode)
- **Styling**: TailwindCSS v3 (Utility-first, light palette tokens)
- **State Management**: Zustand (`useGroundwaterStore`, `useUserStore`, `useUIStore`)
- **Data Visualization**: Recharts
- **Icons**: Lucide React
- **Micro-Animations**: Framer Motion / CSS Transitions

---

## 💻 Developer Setup Guide

### 1. Clone & Install Dependencies

```bash
# Navigate to project directory
cd "untitled folder"

# Install dependencies
npm install
```

### 2. Run Local Development Server

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application live.

### 3. Build for Production

```bash
npm run build
npm run start
```

---

## 📦 Project Structure

```
├── app/
│   ├── layout.tsx         # Root App Shell (Header, Sidebar, MobileNav, Toast)
│   ├── page.tsx           # 1. Landing Page
│   ├── dashboard/         # 2. Overview Dashboard
│   ├── analysis/          # 3. Detailed Analysis
│   ├── compare/           # 4. Compare Districts
│   ├── alerts/            # 5. Alerts & Notifications
│   ├── reports/           # 6. Reports Builder
│   ├── map/               # 7. Geospatial Map
│   ├── search/            # 8. AI Natural Language Search
│   ├── settings/          # 9. User Profile & Settings
│   ├── not-found.tsx      # 404 Page
│   └── error.tsx          # 500 Page
├── components/
│   ├── ui/                # Component Library (Button, Card, Input, Table, etc.)
│   └── layout/            # Layout components (Header, Sidebar, MobileNav, Footer)
├── store/                 # Zustand state stores
├── hooks/                 # Custom React hooks (useFetch, useDebounce, useLocalStorage)
├── lib/                   # Utilities & Indian Telemetry Datasets
└── tailwind.config.ts     # Design tokens & color system
```

---

## ♿ Accessibility & 3G/2G Performance

- **WCAG 2.1 AA Compliant**: All text elements satisfy a 4.5:1 minimum contrast ratio.
- **Mobile First**: All touch targets are minimum 44px-48px height.
- **Data Lightweight**: No heavy asset downloads, compressed bundle size (<150KB gzipped JS).
