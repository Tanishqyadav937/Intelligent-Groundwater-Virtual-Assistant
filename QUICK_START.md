# 🚀 Quick Start Guide - INGRES AI with Supabase Alerts

## ✅ Installation Complete!

All files have been created and dependencies installed. Follow these steps to start the application.

---

## Step 1: Start the Application

### Terminal 1 - Frontend (Next.js)

```bash
# Navigate to project root
cd /Users/tanishqyadav/Desktop/ingres-ai-frontend

# Start Next.js development server
npm run dev
```

**Expected output:**
```
✓ Ready in 2-3s
✓ Local: http://localhost:3000
```

### Terminal 2 - Backend (Flask) - Optional for Supabase Alerts

**Only needed if you want to use Supabase real-time alerts:**

```bash
# Navigate to backend directory
cd /Users/tanishqyadav/Desktop/ingres-ai-frontend/backend

# Install Python dependencies (first time only)
pip install -r requirements.txt

# Start Flask server
python app.py
```

**Expected output:**
```
✓ Supabase client initialized (or INFO: not configured)
✓ Groundwater model loaded successfully!
 * Running on http://0.0.0.0:5000
```

---

## Step 2: Access the Application

Open your browser to: **http://localhost:3000**

### Pages Available:

- **Dashboard**: http://localhost:3000/dashboard
- **Alerts**: http://localhost:3000/alerts 🆕 *Real-time alerts*
- **Predictions**: http://localhost:3000/predict
- **Map**: http://localhost:3000/map
- **Analysis**: http://localhost:3000/analysis
- **Reports**: http://localhost:3000/reports
- **Compare**: http://localhost:3000/compare
- **Search**: http://localhost:3000/search
- **Settings**: http://localhost:3000/settings

---

## Step 3: Optional - Set Up Supabase Real-Time Alerts

**If you want live real-time alerts:**

1. Follow the detailed guide: **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)**

2. Quick summary:
   - Create free Supabase account
   - Run SQL schema from `backend/supabase_schema.sql`
   - Copy API credentials
   - Add to `.env.local` and `backend/.env`

3. **Without Supabase:**
   - The app works perfectly fine with mock data
   - Alerts page will show stored alerts from Zustand
   - All features available except real-time updates

---

## 🔧 Troubleshooting

### Issue: Port 3000 already in use

```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Issue: Module not found errors

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

### Issue: Python module not found

```bash
cd backend
pip install -r requirements.txt
```

### Issue: Flask model not loading

```bash
# The ML model is optional for alerts
# Edit backend/app.py and comment out model loading if needed
```

---

## 📁 Project Structure

```
ingres-ai-frontend/
├── app/                    # Next.js pages
│   ├── alerts/            # 🆕 Real-time alerts page
│   ├── dashboard/
│   ├── predict/
│   └── ...
├── backend/               # Flask API
│   ├── app.py            # 🆕 Updated with Supabase endpoints
│   ├── alert_engine.py   # 🆕 Alert logic
│   ├── sensor_simulator.py # 🆕 Mock data generator
│   └── supabase_client.py # 🆕 Database connection
├── components/
│   ├── alerts/           # 🆕 AlertsFeed component
│   └── ui/
├── hooks/
│   └── useSupabaseAlerts.ts # 🆕 Real-time subscription
├── lib/
│   ├── supabase.ts       # 🆕 Supabase config
│   └── alertTypes.ts     # 🆕 TypeScript types
└── README files...
```

---

## 🎯 What's New

### Real-Time Alerts System

- ✅ Live WebSocket connection to Supabase
- ✅ Automatic sensor simulation every 30 seconds
- ✅ Threshold-based alerts (CRITICAL < 30m, WARNING < 50m)
- ✅ Acknowledge alerts functionality
- ✅ Filter by severity
- ✅ Historical data storage
- ✅ Graceful fallback to mock data

### Backend API Endpoints

- `POST /api/sensor-data` - Record sensor reading
- `GET /api/alerts` - Get alerts with filters
- `POST /api/alerts/:id/acknowledge` - Acknowledge alert
- `GET /api/alert-stats` - Get statistics
- `POST /api/simulate-sensors` - Manual trigger
- `GET /api/sensor-readings` - Get readings
- `GET /api/districts` - Get districts

---

## 🎨 Features Overview

### Current Implementation (~20% of Advanced Design)

✅ **Frontend**
- Next.js 14 with TypeScript
- Responsive dashboard with charts
- Real-time alerts feed
- Interactive map (Leaflet)
- ML-powered predictions
- State management (Zustand)

✅ **Backend**
- Flask REST API
- ML model (Voting Ensemble)
- Supabase integration
- Sensor simulation
- Alert engine

✅ **Real-Time**
- WebSocket subscriptions
- Live alert updates
- Connection status indicator
- Automatic data generation

### Planned Features (From Advanced Design)

🔜 Multi-agent AI architecture  
🔜 Advanced RAG v2.0  
🔜 Knowledge graphs  
🔜 Federated learning  
🔜 Multi-language NLP  
🔜 AR/VR interfaces  
🔜 Edge computing  

---

## 📊 Testing the System

### Test Real-Time Alerts (with Supabase configured)

1. **Start both servers** (Frontend + Backend)
2. **Open Alerts page**: http://localhost:3000/alerts
3. **Watch for**: "Real-time connected" ✅ indicator
4. **Wait 30 seconds**: Automatic alerts will appear
5. **Click "Acknowledge"**: Mark alerts as reviewed
6. **Filter by severity**: Click on Critical/Warning/Info cards

### Test Without Supabase

1. **Start frontend only**: `npm run dev`
2. **Open Alerts page**: Will show mock alerts
3. **All features work** except real-time updates

### Manual Backend Testing

```bash
# Trigger simulation
curl -X POST http://localhost:5000/api/simulate-sensors

# Check alerts
curl http://localhost:5000/api/alerts | jq

# Get statistics
curl http://localhost:5000/api/alert-stats | jq
```

---

## 📚 Documentation

- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - Complete Supabase setup guide
- **[REALTIME_ALERTS_README.md](./REALTIME_ALERTS_README.md)** - Technical documentation
- **[INGRES_AI_Advanced_Design.md](./INGRES_AI_Advanced_Design.md)** - Full system architecture

---

## 🆘 Need Help?

1. Check the **SUPABASE_SETUP.md** troubleshooting section
2. Look at browser console (F12) for frontend errors
3. Check Flask terminal output for backend errors
4. Verify environment variables are set correctly

---

## 🚀 Next Steps

1. **Run the application** with `npm run dev`
2. **Explore the dashboard** and existing features
3. **Optional**: Set up Supabase for real-time alerts
4. **Customize**: Adjust thresholds in `backend/alert_engine.py`
5. **Deploy**: Follow production deployment guides

---

**Built for sustainable groundwater management in India 🇮🇳 💧**
