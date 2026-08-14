export interface DistrictData {
  id: string;
  name: string;
  state: string;
  status: 'Safe' | 'Semi-Critical' | 'Critical';
  groundwaterLevel: number; // m bgl (meters below ground level)
  extractionRate: number; // %
  rechargeCapacity: number; // mm/yr
  rainfallForecast: number; // mm
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
  lat: number;
  lng: number;
  historical: { month: string; level: number; extraction: number; recharge: number }[];
}

export interface AlertItem {
  id: string;
  date: string;
  district: string;
  message: string;
  severity: 'Critical' | 'Warning' | 'Info';
  status: 'Unread' | 'Read' | 'Acknowledged';
}

export interface GroundWaterReport {
  id: string;
  title: string;
  type: 'Executive Summary' | 'Detailed Analysis' | 'Farmer-Friendly' | 'Technical';
  district: string;
  date: string;
  pages: number;
  fileSize: string;
}

export const INDIAN_DISTRICTS: DistrictData[] = [
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    status: 'Critical',
    groundwaterLevel: 24.8,
    extractionRate: 142.5,
    rechargeCapacity: 310,
    rainfallForecast: 480,
    trend: 'down',
    lastUpdated: '10 minutes ago',
    lat: 26.9124,
    lng: 75.7873,
    historical: [
      { month: 'Jan', level: 22.1, extraction: 130, recharge: 20 },
      { month: 'Feb', level: 22.4, extraction: 132, recharge: 15 },
      { month: 'Mar', level: 23.0, extraction: 138, recharge: 10 },
      { month: 'Apr', level: 23.8, extraction: 145, recharge: 5 },
      { month: 'May', level: 24.5, extraction: 150, recharge: 0 },
      { month: 'Jun', level: 25.1, extraction: 148, recharge: 12 },
      { month: 'Jul', level: 24.9, extraction: 140, recharge: 95 },
      { month: 'Aug', level: 24.2, extraction: 135, recharge: 110 },
      { month: 'Sep', level: 24.0, extraction: 136, recharge: 40 },
      { month: 'Oct', level: 24.3, extraction: 139, recharge: 15 },
      { month: 'Nov', level: 24.6, extraction: 141, recharge: 10 },
      { month: 'Dec', level: 24.8, extraction: 142, recharge: 5 },
    ],
  },
  {
    id: 'anantapur',
    name: 'Anantapur',
    state: 'Andhra Pradesh',
    status: 'Semi-Critical',
    groundwaterLevel: 16.4,
    extractionRate: 98.2,
    rechargeCapacity: 450,
    rainfallForecast: 560,
    trend: 'stable',
    lastUpdated: '15 minutes ago',
    lat: 14.6819,
    lng: 77.6006,
    historical: [
      { month: 'Jan', level: 15.2, extraction: 90, recharge: 30 },
      { month: 'Feb', level: 15.5, extraction: 92, recharge: 25 },
      { month: 'Mar', level: 16.0, extraction: 95, recharge: 15 },
      { month: 'Apr', level: 16.8, extraction: 102, recharge: 10 },
      { month: 'May', level: 17.2, extraction: 106, recharge: 5 },
      { month: 'Jun', level: 17.0, extraction: 100, recharge: 40 },
      { month: 'Jul', level: 16.2, extraction: 94, recharge: 120 },
      { month: 'Aug', level: 15.8, extraction: 91, recharge: 130 },
      { month: 'Sep', level: 15.9, extraction: 93, recharge: 60 },
      { month: 'Oct', level: 16.1, extraction: 96, recharge: 35 },
      { month: 'Nov', level: 16.3, extraction: 97, recharge: 20 },
      { month: 'Dec', level: 16.4, extraction: 98, recharge: 15 },
    ],
  },
  {
    id: 'latur',
    name: 'Latur',
    state: 'Maharashtra',
    status: 'Critical',
    groundwaterLevel: 21.2,
    extractionRate: 128.4,
    rechargeCapacity: 380,
    rainfallForecast: 610,
    trend: 'down',
    lastUpdated: '5 minutes ago',
    lat: 18.4088,
    lng: 76.5604,
    historical: [
      { month: 'Jan', level: 19.5, extraction: 115, recharge: 25 },
      { month: 'Feb', level: 19.8, extraction: 118, recharge: 20 },
      { month: 'Mar', level: 20.4, extraction: 122, recharge: 10 },
      { month: 'Apr', level: 21.0, extraction: 130, recharge: 5 },
      { month: 'May', level: 21.8, extraction: 135, recharge: 0 },
      { month: 'Jun', level: 21.5, extraction: 129, recharge: 35 },
      { month: 'Jul', level: 20.8, extraction: 122, recharge: 105 },
      { month: 'Aug', level: 20.3, extraction: 120, recharge: 115 },
      { month: 'Sep', level: 20.5, extraction: 124, recharge: 50 },
      { month: 'Oct', level: 20.9, extraction: 126, recharge: 25 },
      { month: 'Nov', level: 21.0, extraction: 127, recharge: 15 },
      { month: 'Dec', level: 21.2, extraction: 128, recharge: 10 },
    ],
  },
  {
    id: 'ludhiana',
    name: 'Ludhiana',
    state: 'Punjab',
    status: 'Critical',
    groundwaterLevel: 29.5,
    extractionRate: 168.0,
    rechargeCapacity: 520,
    rainfallForecast: 680,
    trend: 'down',
    lastUpdated: '12 minutes ago',
    lat: 30.901,
    lng: 75.8573,
    historical: [
      { month: 'Jan', level: 27.2, extraction: 150, recharge: 40 },
      { month: 'Feb', level: 27.6, extraction: 155, recharge: 35 },
      { month: 'Mar', level: 28.1, extraction: 162, recharge: 20 },
      { month: 'Apr', level: 29.0, extraction: 175, recharge: 10 },
      { month: 'May', level: 30.2, extraction: 185, recharge: 5 },
      { month: 'Jun', level: 30.8, extraction: 180, recharge: 45 },
      { month: 'Jul', level: 29.8, extraction: 160, recharge: 140 },
      { month: 'Aug', level: 29.1, extraction: 158, recharge: 150 },
      { month: 'Sep', level: 29.2, extraction: 162, recharge: 70 },
      { month: 'Oct', level: 29.3, extraction: 165, recharge: 30 },
      { month: 'Nov', level: 29.4, extraction: 166, recharge: 20 },
      { month: 'Dec', level: 29.5, extraction: 168, recharge: 15 },
    ],
  },
  {
    id: 'chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    status: 'Safe',
    groundwaterLevel: 7.8,
    extractionRate: 72.1,
    rechargeCapacity: 890,
    rainfallForecast: 1200,
    trend: 'up',
    lastUpdated: '2 minutes ago',
    lat: 13.0827,
    lng: 80.2707,
    historical: [
      { month: 'Jan', level: 8.5, extraction: 75, recharge: 60 },
      { month: 'Feb', level: 8.8, extraction: 78, recharge: 40 },
      { month: 'Mar', level: 9.1, extraction: 82, recharge: 20 },
      { month: 'Apr', level: 9.5, extraction: 85, recharge: 10 },
      { month: 'May', level: 9.8, extraction: 88, recharge: 5 },
      { month: 'Jun', level: 9.6, extraction: 84, recharge: 30 },
      { month: 'Jul', level: 9.0, extraction: 79, recharge: 90 },
      { month: 'Aug', level: 8.4, extraction: 76, recharge: 120 },
      { month: 'Sep', level: 8.1, extraction: 74, recharge: 160 },
      { month: 'Oct', level: 7.5, extraction: 70, recharge: 220 },
      { month: 'Nov', level: 7.2, extraction: 68, recharge: 250 },
      { month: 'Dec', level: 7.8, extraction: 72, recharge: 110 },
    ],
  },
  {
    id: 'kurnool',
    name: 'Kurnool',
    state: 'Andhra Pradesh',
    status: 'Safe',
    groundwaterLevel: 9.2,
    extractionRate: 64.5,
    rechargeCapacity: 610,
    rainfallForecast: 780,
    trend: 'up',
    lastUpdated: '8 minutes ago',
    lat: 15.8281,
    lng: 78.0373,
    historical: [
      { month: 'Jan', level: 9.8, extraction: 68, recharge: 50 },
      { month: 'Feb', level: 10.1, extraction: 70, recharge: 30 },
      { month: 'Mar', level: 10.5, extraction: 72, recharge: 20 },
      { month: 'Apr', level: 10.9, extraction: 75, recharge: 10 },
      { month: 'May', level: 11.2, extraction: 78, recharge: 5 },
      { month: 'Jun', level: 10.8, extraction: 74, recharge: 40 },
      { month: 'Jul', level: 10.0, extraction: 69, recharge: 110 },
      { month: 'Aug', level: 9.4, extraction: 65, recharge: 130 },
      { month: 'Sep', level: 9.1, extraction: 63, recharge: 90 },
      { month: 'Oct', level: 8.9, extraction: 62, recharge: 70 },
      { month: 'Nov', level: 9.0, extraction: 63, recharge: 40 },
      { month: 'Dec', level: 9.2, extraction: 64, recharge: 25 },
    ],
  },
];

export const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'alt-1',
    date: '2026-08-14 11:30 AM',
    district: 'Ludhiana',
    message: 'Critical groundwater depletion rate detected in Ludhiana block (168% extraction). Irrigation advisory issued.',
    severity: 'Critical',
    status: 'Unread',
  },
  {
    id: 'alt-2',
    date: '2026-08-14 09:15 AM',
    district: 'Jaipur',
    message: 'Borewell recharge threshold below 310 mm/yr in Jaipur rural sector. Drip irrigation recommended.',
    severity: 'Critical',
    status: 'Unread',
  },
  {
    id: 'alt-3',
    date: '2026-08-13 04:45 PM',
    district: 'Latur',
    message: 'Semi-critical water table drop to 21.2 m bgl. Check community rainwater harvesting structures.',
    severity: 'Warning',
    status: 'Read',
  },
  {
    id: 'alt-4',
    date: '2026-08-12 02:20 PM',
    district: 'Chennai',
    message: 'Monsoon recharge positive impact: Groundwater level improved by 1.2 meters.',
    severity: 'Info',
    status: 'Acknowledged',
  },
];

export const INITIAL_REPORTS: GroundWaterReport[] = [
  {
    id: 'rep-1',
    title: 'National Groundwater Assessment 2026',
    type: 'Executive Summary',
    district: 'All India',
    date: 'Aug 2026',
    pages: 14,
    fileSize: '1.2 MB',
  },
  {
    id: 'rep-2',
    title: 'Jaipur District Aquifer Dynamics & Artificial Recharge',
    type: 'Detailed Analysis',
    district: 'Jaipur',
    date: 'Jul 2026',
    pages: 38,
    fileSize: '4.5 MB',
  },
  {
    id: 'rep-3',
    title: 'Kharif Season Irrigation & Groundwater Guide',
    type: 'Farmer-Friendly',
    district: 'Punjab & Haryana',
    date: 'Jun 2026',
    pages: 6,
    fileSize: '850 KB',
  },
  {
    id: 'rep-4',
    title: 'Deccan Trap Aquifer Modeling & Recharge Efficiency',
    type: 'Technical',
    district: 'Latur',
    date: 'May 2026',
    pages: 52,
    fileSize: '7.8 MB',
  },
];
