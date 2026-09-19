# 🚨 Supabase Real-Time Alerts System

## Overview

The INGRES AI platform now includes a **real-time alerts system** powered by Supabase that monitors groundwater levels across Indian districts and triggers instant notifications when critical thresholds are breached.

### Key Features

✅ **Real-Time Updates** - Alerts appear instantly via WebSocket connection  
✅ **Automatic Monitoring** - Sensor simulator runs every 30 seconds  
✅ **Threshold-Based Alerts** - CRITICAL, WARNING, and INFO severity levels  
✅ **Acknowledgment System** - Track which alerts have been reviewed  
✅ **Historical Data** - All sensor readings and alerts stored in Supabase  
✅ **Live Statistics** - Real-time alert counts and district breakdowns  
✅ **Graceful Fallback** - Works with or without Supabase configuration  

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   FRONTEND (Next.js)                    │
│  ┌───────────────────────────────────────────────────┐  │
│  │  AlertsFeed Component                             │  │
│  │  - Real-time subscription via WebSocket           │  │
│  │  - Severity filtering                             │  │
│  │  - Acknowledge functionality                      │  │
│  └───────────────────────────────────────────────────┘  │
│                         ↓                               │
│  ┌───────────────────────────────────────────────────┐  │
│  │  useSupabaseAlerts Hook                           │  │
│  │  - Manages real-time connection                   │  │
│  │  - Handles INSERT/UPDATE/DELETE events            │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                         ↓ WebSocket
┌─────────────────────────────────────────────────────────┐
│                   SUPABASE CLOUD                        │
│  ┌───────────────────────────────────────────────────┐  │
│  │  PostgreSQL Database                              │  │
│  │  ├─ districts                                     │  │
│  │  ├─ sensor_readings                               │  │
│  │  ├─ alerts                                        │  │
│  │  └─ alert_rules                                   │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Realtime Engine                                  │  │
│  │  - Broadcasts changes via WebSocket               │  │
│  │  - REPLICA IDENTITY FULL enabled                  │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                         ↑ REST API
┌─────────────────────────────────────────────────────────┐
│                   BACKEND (Flask)                       │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Sensor Simulator (APScheduler)                   │  │
│  │  - Runs every 30 seconds                          │  │
│  │  - Generates data for 10 districts                │  │
│  │  - Simulates seasonal patterns                    │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Alert Engine                                     │  │
│  │  - Checks thresholds                              │  │
│  │  - Creates alerts in database                     │  │
│  │  - Monitors groundwater_level, rainfall, etc.     │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  REST API Endpoints                               │  │
│  │  /api/alerts                                      │  │
│  │  /api/sensor-data                                 │  │
│  │  /api/alert-stats                                 │  │
│  │  /api/simulate-sensors                            │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## Quick Start

### Prerequisites

```bash
# Check versions
python --version  # Should be 3.8+
node --version    # Should be 18+
npm --version
```

### 1. Set Up Supabase

Follow the detailed guide: **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)**

Quick summary:
1. Create Supabase project
2. Run SQL schema (`/backend/supabase_schema.sql`)
3. Get API credentials
4. Enable Realtime for `alerts` table

### 2. Configure Backend

```bash
cd backend

# Create .env file
cp .env.example .env

# Edit .env and add your Supabase credentials
nano .env

# Install dependencies
pip install -r requirements.txt
```

### 3. Configure Frontend

```bash
# From project root
cp .env.example .env.local

# Edit .env.local and add your Supabase credentials
nano .env.local

# Install dependencies
npm install
npm install @supabase/supabase-js
```

### 4. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
python app.py
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 5. Test It Out

1. Open http://localhost:3000/alerts
2. You should see "Real-time connected" ✅
3. Wait 30 seconds for automatic sensor simulation
4. Watch alerts appear in real-time!

---

## Project Structure

```
ingres-ai-frontend/
├── backend/
│   ├── supabase_schema.sql        # Database schema
│   ├── supabase_client.py         # Supabase connection
│   ├── alert_engine.py            # Alert logic & thresholds
│   ├── sensor_simulator.py        # Mock sensor data generator
│   ├── app.py                     # Flask API (updated)
│   ├── requirements.txt           # Python dependencies (updated)
│   └── .env.example               # Backend environment template
│
├── app/
│   └── alerts/
│       └── page.tsx               # Alerts page (updated)
│
├── components/
│   └── alerts/
│       └── AlertsFeed.tsx         # Real-time alerts component (NEW)
│
├── hooks/
│   └── useSupabaseAlerts.ts       # Real-time subscription hook (NEW)
│
├── lib/
│   ├── supabase.ts                # Supabase client config (NEW)
│   ├── alertTypes.ts              # TypeScript interfaces (NEW)
│   └── utils.ts                   # Utilities (updated)
│
├── .env.example                   # Frontend environment template
├── SUPABASE_SETUP.md              # Detailed setup guide (NEW)
└── REALTIME_ALERTS_README.md      # This file (NEW)
```

---

## Alert Thresholds

### Groundwater Level

| Depth (m below ground) | Severity | Alert Message |
|------------------------|----------|---------------|
| < 30 | 🔴 CRITICAL | Critical groundwater depletion |
| 30-50 | 🟡 WARNING | Groundwater level declining |
| > 50 | 🔵 INFO | Normal monitoring |

### Other Metrics

| Metric | Threshold | Severity | Condition |
|--------|-----------|----------|-----------|
| Extraction Rate | > 1000 units | WARNING | Over-extraction |
| Rainfall | > 500 mm | INFO | Heavy rainfall |
| Temperature | > 40°C | WARNING | Heat wave |

**Note:** Thresholds can be customized in `/backend/alert_engine.py`

---

## API Endpoints

### Backend (Flask)

#### POST /api/sensor-data
Record sensor reading and check for alerts.

**Request:**
```json
{
  "district_id": "UP001",
  "groundwater_level": 28.5,
  "rainfall": 450.2,
  "temperature": 35.1,
  "extraction_rate": 850.0,
  "population_affected": 125000
}
```

**Response:**
```json
{
  "status": "recorded",
  "sensor_id": 123,
  "alerts_triggered": 1,
  "alerts": [...]
}
```

#### GET /api/alerts
Fetch alerts with optional filters.

**Query Parameters:**
- `limit` (default: 50)
- `offset` (default: 0)
- `severity` (CRITICAL, WARNING, INFO)
- `district_id` (e.g., UP001)

**Response:**
```json
[
  {
    "id": 1,
    "district_id": "UP001",
    "severity": "CRITICAL",
    "message": "Critical groundwater depletion: 28.5m",
    "triggered_at": "2024-01-15T10:30:00Z",
    "acknowledged_at": null
  }
]
```

#### POST /api/alerts/:id/acknowledge
Acknowledge an alert.

**Request:**
```json
{
  "user_id": "user-abc123"
}
```

#### GET /api/alert-stats
Get alert statistics.

**Query Parameters:**
- `hours` (default: 24)

**Response:**
```json
{
  "total_alerts": 15,
  "critical_count": 3,
  "warning_count": 8,
  "info_count": 4,
  "by_district": {
    "UP001": 5,
    "TN001": 3
  }
}
```

#### POST /api/simulate-sensors
Manually trigger sensor simulation (useful for testing).

---

## Database Schema

### districts
Stores district information and thresholds.

| Column | Type | Description |
|--------|------|-------------|
| id | VARCHAR(50) | District code (e.g., UP001) |
| name | VARCHAR(100) | District name |
| state | VARCHAR(50) | State name |
| latitude | DECIMAL | GPS coordinate |
| longitude | DECIMAL | GPS coordinate |
| critical_threshold | DECIMAL | Critical level (default: 30m) |
| warning_threshold | DECIMAL | Warning level (default: 50m) |

### sensor_readings
Timestamped sensor measurements.

| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT | Auto-incrementing ID |
| district_id | VARCHAR(50) | FK to districts |
| groundwater_level | DECIMAL | Depth in meters |
| rainfall | DECIMAL | Rainfall in mm |
| temperature | DECIMAL | Temperature in °C |
| extraction_rate | DECIMAL | Extraction rate |
| created_at | TIMESTAMP | Reading timestamp |

### alerts
Alert records triggered by threshold breaches.

| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT | Auto-incrementing ID |
| district_id | VARCHAR(50) | FK to districts |
| severity | VARCHAR(20) | CRITICAL, WARNING, INFO |
| alert_type | VARCHAR(50) | Type of alert |
| message | TEXT | Human-readable message |
| metric_type | VARCHAR(50) | Which metric triggered |
| metric_value | DECIMAL | Value that triggered |
| triggered_at | TIMESTAMP | Alert timestamp |
| acknowledged_by | VARCHAR(100) | User who acknowledged |
| acknowledged_at | TIMESTAMP | Acknowledgment time |

---

## Frontend Components

### AlertsFeed

Main component for displaying real-time alerts.

**Usage:**
```tsx
import { AlertsFeed } from '@/components/alerts/AlertsFeed'

<AlertsFeed 
  districtId="UP001"     // Optional: filter by district
  severity="CRITICAL"    // Optional: filter by severity
  limit={50}             // Number of alerts to fetch
  showFilters={true}     // Show filter controls
/>
```

### useSupabaseAlerts Hook

Custom hook for real-time alert subscription.

**Usage:**
```tsx
import { useSupabaseAlerts } from '@/hooks/useSupabaseAlerts'

const { alerts, loading, isConnected, acknowledgeAlert } = useSupabaseAlerts({
  districtId: 'UP001',
  severity: 'CRITICAL',
  limit: 50
})
```

**Returns:**
- `alerts` - Array of alert objects
- `loading` - Boolean indicating initial load
- `error` - Error message if any
- `isConnected` - WebSocket connection status
- `acknowledgeAlert(id, userId)` - Function to acknowledge
- `refresh()` - Manual refresh function

---

## Configuration

### Alert Rules (Backend)

Edit `/backend/alert_engine.py` to customize thresholds:

```python
self.rules = {
    'groundwater_level': [
        {
            'severity': 'CRITICAL', 
            'threshold': 30,  # Change this
            'operator': '<',
            'message_template': 'Critical depletion: {value}m'
        }
    ]
}
```

### Simulation Settings (Backend)

Edit `/backend/sensor_simulator.py` to adjust patterns:

```python
self.district_patterns = {
    'UP001': {
        'decline_rate': -0.3,  # meters per day
        'volatility': 3        # random variation
    }
}
```

### Realtime Settings (Frontend)

Edit `/lib/supabase.ts` to configure WebSocket:

```typescript
export const supabase = createClient(url, key, {
  realtime: {
    params: {
      eventsPerSecond: 10  // Adjust rate limit
    }
  }
})
```

---

## Testing

### Manual Testing

**Test Backend:**
```bash
# Trigger simulation
curl -X POST http://localhost:5000/api/simulate-sensors

# Check alerts
curl http://localhost:5000/api/alerts | jq

# Check stats
curl http://localhost:5000/api/alert-stats | jq
```

**Test Frontend:**
1. Open Alerts page
2. Check "Real-time connected" indicator
3. Open browser DevTools → Network → WS tab
4. Look for WebSocket connection to Supabase

**Test Realtime:**
1. Keep Alerts page open
2. In Supabase dashboard, manually insert alert
3. Alert should appear instantly on page

### Automated Testing

```bash
# Backend tests (if implemented)
cd backend
pytest

# Frontend tests
npm test
```

---

## Troubleshooting

### Issue: "Supabase not configured"

**Solution:**
- Check `.env.local` has correct `NEXT_PUBLIC_SUPABASE_URL`
- Restart Next.js dev server after changing env vars
- Verify no typos in environment variable names

### Issue: Alerts not appearing in real-time

**Solution:**
- Check Realtime is enabled in Supabase for `alerts` table
- Check browser console for WebSocket errors
- Verify `REPLICA IDENTITY FULL` is set (in SQL schema)
- Try disabling browser extensions/ad blockers

### Issue: Flask app can't connect to Supabase

**Solution:**
- Check `backend/.env` has correct credentials
- Verify `SUPABASE_ANON_KEY` (not service_role key for client)
- Check internet connection
- Try pinging Supabase URL

### Issue: Sensor simulator not running

**Solution:**
- Check Flask logs for errors
- Verify `flask-apscheduler` is installed
- Manually trigger: `curl -X POST http://localhost:5000/api/simulate-sensors`

---

## Production Deployment

### Backend Deployment

**Heroku/Railway/Fly.io:**
```bash
# Add environment variables
heroku config:set SUPABASE_URL=https://...
heroku config:set SUPABASE_ANON_KEY=eyJ...

# Deploy
git push heroku main
```

### Frontend Deployment

**Vercel/Netlify:**
```bash
# Add environment variables in dashboard
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_API_URL=https://your-backend.herokuapp.com

# Deploy
vercel --prod
```

### Security Notes

⚠️ **Never commit** `.env` files to git  
⚠️ **Never expose** `service_role` key in frontend  
⚠️ **Always use** `anon` key for client-side code  
✅ **Enable** Row Level Security (RLS) in production  
✅ **Use** HTTPS for all API calls in production  

---

## Performance Optimization

### Reduce Database Load

```python
# Adjust simulation frequency in app.py
scheduler.add_job(func=run_simulator, trigger="interval", seconds=60)  # Changed from 30
```

### Limit Realtime Updates

```typescript
// Batch updates in frontend
const debouncedRefresh = useMemo(
  () => debounce(refresh, 1000),
  [refresh]
)
```

### Add Pagination

```typescript
// Load more alerts on scroll
const { alerts } = useSupabaseAlerts({ 
  limit: 20,
  offset: page * 20 
})
```

---

## Future Enhancements

- [ ] Email notifications for CRITICAL alerts
- [ ] SMS alerts via Twilio
- [ ] Push notifications via PWA
- [ ] Alert rules management UI
- [ ] Historical alert analytics
- [ ] Export alerts to CSV
- [ ] Custom notification channels (Slack, Discord)
- [ ] Geofencing for location-based alerts
- [ ] Machine learning for predictive alerts

---

## Resources

- **Supabase Docs**: https://supabase.com/docs
- **Supabase Realtime**: https://supabase.com/docs/guides/realtime
- **Flask-APScheduler**: https://viniciuschiele.github.io/flask-apscheduler/
- **Next.js**: https://nextjs.org/docs

---

## License

This implementation is part of the INGRES AI groundwater monitoring platform.

---

## Support

For issues or questions:
1. Check [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) troubleshooting section
2. Review Supabase dashboard logs
3. Check Flask terminal output
4. Inspect browser console errors

---

**Built with ❤️ for sustainable groundwater management in India 🇮🇳**
