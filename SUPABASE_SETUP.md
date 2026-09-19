# 🚀 Supabase Real-Time Alerts Setup Guide

This guide will help you set up Supabase real-time alerts for the INGRES AI platform.

## 📋 Prerequisites

- A Supabase account (free tier works fine)
- Python 3.8+ with pip
- Node.js 18+ with npm
- Git

---

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click **"New Project"**
4. Fill in the details:
   - **Name**: `ingres-groundwater-alerts` (or your preferred name)
   - **Database Password**: Generate a strong password and **save it**
   - **Region**: Choose closest to India (Singapore or Mumbai recommended)
   - **Pricing Plan**: Free (sufficient for MVP)
5. Click **"Create new project"** (takes ~2 minutes)

---

## Step 2: Get Your API Credentials

1. Once the project is created, go to **Settings** (gear icon in sidebar)
2. Click **API** in the settings menu
3. Copy these values (you'll need them later):

   ```
   Project URL: https://xxxxxxxxxxxxx.supabase.co
   anon public key: eyJhbGc...
   service_role key: eyJhbGc... (keep this secret!)
   ```

---

## Step 3: Create Database Schema

1. In Supabase dashboard, click **SQL Editor** (in left sidebar)
2. Click **"New Query"**
3. Open the file `/backend/supabase_schema.sql` in this repository
4. Copy the entire SQL content
5. Paste it into the Supabase SQL Editor
6. Click **"Run"** (or press Ctrl+Enter)
7. You should see: ✅ Success. No rows returned

### Verify Tables Were Created

1. Go to **Table Editor** (in left sidebar)
2. You should see these tables:
   - ✅ districts
   - ✅ sensor_readings
   - ✅ alerts
   - ✅ alert_rules

---

## Step 4: Enable Realtime

1. Still in **Table Editor**, click on the **alerts** table
2. Look for the realtime toggle (usually in top right)
3. Enable **Realtime** for the alerts table
4. Repeat for **sensor_readings** table

**Note**: The SQL script already set up `REPLICA IDENTITY FULL`, so realtime should work automatically.

---

## Step 5: Configure Backend Environment

1. Navigate to the `/backend` directory:
   ```bash
   cd backend
   ```

2. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` and add your Supabase credentials:
   ```env
   SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   SUPABASE_ANON_KEY=eyJhbGc...
   SUPABASE_SERVICE_KEY=eyJhbGc...
   ```

4. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

---

## Step 6: Configure Frontend Environment

1. Navigate to the project root:
   ```bash
   cd ..
   ```

2. Create a `.env.local` file:
   ```bash
   cp .env.example .env.local
   ```

3. Edit `.env.local` and add:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. Install Node.js dependencies:
   ```bash
   npm install
   ```

   Then install Supabase client:
   ```bash
   npm install @supabase/supabase-js
   ```

---

## Step 7: Start the Backend Server

Open a new terminal and run:

```bash
cd backend
python app.py
```

You should see:
```
✓ Supabase client initialized successfully
✓ Sensor simulator started (runs every 30 seconds)
✓ Groundwater model loaded successfully!
 * Running on http://0.0.0.0:5000
```

---

## Step 8: Start the Frontend

Open another terminal and run:

```bash
npm run dev
```

You should see:
```
✓ Ready in 2.3s
✓ Local: http://localhost:3000
```

---

## Step 9: Test the System

### Test Backend Endpoints

Open a new terminal:

```bash
# Manually trigger sensor simulation
curl -X POST http://localhost:5000/api/simulate-sensors

# Check alerts
curl http://localhost:5000/api/alerts

# Check alert statistics
curl http://localhost:5000/api/alert-stats
```

### Test Frontend

1. Open your browser to **http://localhost:3000**
2. Navigate to the **Alerts** page
3. You should see:
   - ✅ "Real-time connected" indicator
   - ✅ Live alerts appearing automatically
   - ✅ Severity statistics (Critical, Warning, Info)

---

## Step 10: Verify Real-Time Updates

### Test Real-Time Functionality

1. Keep the Alerts page open in your browser
2. In another browser tab, open **Supabase Dashboard** → **Table Editor** → **alerts**
3. Click **"Insert"** → **"Insert row"**
4. Fill in:
   - district_id: `UP001`
   - severity: `CRITICAL`
   - alert_type: `manual_test`
   - message: `Test real-time alert`
   - metric_type: `groundwater_level`
   - metric_value: `25.5`
5. Click **"Save"**
6. **Switch back to your Alerts page** - you should see the new alert appear **instantly** without refreshing!

---

## 🎉 Success Checklist

- ✅ Supabase project created
- ✅ Database schema deployed
- ✅ Realtime enabled for alerts table
- ✅ Backend `.env` configured
- ✅ Frontend `.env.local` configured
- ✅ Backend server running (Flask)
- ✅ Frontend server running (Next.js)
- ✅ Alerts appearing on frontend
- ✅ Real-time updates working
- ✅ Can acknowledge alerts
- ✅ Sensor simulator generating data

---

## 🔧 Troubleshooting

### Backend Issues

**Error: "Supabase client not initialized"**
- Check your `.env` file in `/backend` directory
- Verify SUPABASE_URL and SUPABASE_ANON_KEY are correct
- Make sure there are no extra spaces

**Error: "Model file not found"**
- The groundwater ML model isn't required for alerts
- You can comment out model loading in `app.py` if needed

### Frontend Issues

**Error: "Supabase not configured"**
- Check `.env.local` in project root
- Variable names must start with `NEXT_PUBLIC_`
- Restart `npm run dev` after changing .env.local

**Alerts not appearing in real-time**
- Check browser console (F12) for WebSocket errors
- Verify Realtime is enabled in Supabase for `alerts` table
- Check Supabase dashboard → **Database** → **Replication** → should be enabled

**Connection status shows "Connecting..."**
- Check your internet connection
- Verify SUPABASE_URL is correct (should be https://)
- Try disabling browser ad blockers (they sometimes block WebSockets)

### Database Issues

**Tables not created**
- Re-run the SQL script in Supabase SQL Editor
- Check for SQL errors in the output
- Make sure you're connected to the right project

**No data in tables**
- Wait 30 seconds - the sensor simulator runs automatically
- Or manually trigger: `curl -X POST http://localhost:5000/api/simulate-sensors`
- Check Flask terminal for error messages

---

## 📊 Understanding the System

### How It Works

1. **Sensor Simulator** (Flask backend)
   - Runs every 30 seconds automatically
   - Generates realistic sensor data for 10 districts
   - Writes data to `sensor_readings` table
   - Checks thresholds and creates alerts

2. **Alert Engine** (Flask backend)
   - Monitors groundwater levels
   - Triggers alerts when thresholds are breached:
     - **CRITICAL**: < 30 meters
     - **WARNING**: < 50 meters
   - Stores alerts in `alerts` table

3. **Real-Time Subscription** (Next.js frontend)
   - Connects to Supabase via WebSocket
   - Listens for INSERT/UPDATE/DELETE events on `alerts` table
   - Updates UI instantly when new alerts arrive

### Alert Thresholds

| Metric | Severity | Threshold | Operator |
|--------|----------|-----------|----------|
| Groundwater Level | CRITICAL | 30 m | < |
| Groundwater Level | WARNING | 50 m | < |
| Extraction Rate | WARNING | 1000 units | > |
| Rainfall | INFO | 500 mm | > |
| Temperature | WARNING | 40°C | > |

---

## 🚀 Next Steps

Now that your real-time alerts are working, you can:

1. **Customize Alert Rules**
   - Edit thresholds in `/backend/alert_engine.py`
   - Add new metrics to monitor

2. **Add Email Notifications**
   - Integrate SendGrid or AWS SES
   - Trigger emails when CRITICAL alerts occur

3. **Add SMS Alerts**
   - Integrate Twilio
   - Send SMS for CRITICAL groundwater depletion

4. **Build Custom Dashboards**
   - Use alert statistics API: `/api/alert-stats`
   - Create graphs with sensor readings data

5. **Deploy to Production**
   - Deploy backend to Heroku/Railway/Fly.io
   - Deploy frontend to Vercel/Netlify
   - Update environment variables for production

---

## 📚 API Reference

### Backend Endpoints

- `POST /api/sensor-data` - Record sensor reading
- `GET /api/alerts` - Get alerts (with filters)
- `POST /api/alerts/:id/acknowledge` - Acknowledge alert
- `GET /api/alert-stats` - Get alert statistics
- `POST /api/simulate-sensors` - Manual simulation trigger
- `GET /api/sensor-readings` - Get sensor readings
- `GET /api/districts` - Get all districts

---

## 💡 Tips

- The free Supabase tier includes:
  - 500 MB database space
  - 2 GB bandwidth
  - 50 MB file storage
  - Realtime connections
  
- Sensor simulation generates ~10 alerts per hour on average
- Alert acknowledgment is user-specific (tracked by user ID)
- Real-time connection reconnects automatically if dropped

---

## ❓ Need Help?

- **Supabase Docs**: https://supabase.com/docs
- **Supabase Realtime**: https://supabase.com/docs/guides/realtime
- **Flask Docs**: https://flask.palletsprojects.com/
- **Next.js Docs**: https://nextjs.org/docs

---

**Happy monitoring! 🌊💧**
