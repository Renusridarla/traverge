# ✈️ Traverge — Smart Travel Planning Platform

> **Explore ✈ Plan ✈ Travel ✈ Repeat**

Traverge is a modern, responsive full-stack travel planning platform built with Node.js, Express, MongoDB, and React (Vite + Tailwind CSS). It helps travelers discover Indian states and international destinations, find suitable stays, inspect live weather conditions, and generate personalized day-wise itineraries with visual budget breakdowns.

---

## ✨ Features

- **🇮🇳 Indian Trips Catalog**: Detailed tourist guide covering all 36 Indian States & Union Territories.
- **🌎 International Trips Catalog**: Explore popular global destinations across 20+ countries (Maldives, Thailand, Bali, Singapore, Dubai, Paris, Switzerland, Japan, USA) with INR pricing.
- **🌤️ Weather Intelligence API**: Live weather forecasts and dynamic activity recommendations (Sunny vs. Rainy vs. Cold).
- **📅 Day-Wise Itinerary Generator**: Custom Morning, Afternoon, and Evening schedules with time slots, places, weather suitability, and itemized cost breakdowns.
- **💰 Visual Budget Breakdown**: Visual progress bar and itemized expenses (Stays, Food, Transport, Sightseeing, Misc).
- **🏨 Accommodation Discovery**: Seed dataset of realistic sample hotels across 8 categories with filters for star rating, price range, and amenities.
- **🎨 Modern Travel UI**: Premium Vibrant Orange + Golden Yellow theme with responsive mobile drawer navigation and smooth hover micro-interactions.

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Lucide React, React Router DOM, Axios.
- **Backend**: Node.js, Express.js, Cors, Dotenv, Axios.
- **Database**: MongoDB + Mongoose (with automatic MongoDB Memory Server fallback).
- **Deployment**: Vercel / Render / Netlify ready.

---

## 🚀 Quick Setup & Local Execution

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/traverge.git
cd traverge
```

### 2. Start Backend API
```bash
cd server
npm install
npm run dev
```
*Backend runs on `http://localhost:5000`*

### 3. Start Frontend Client
```bash
cd client
npm install
npm run dev
```
*Frontend runs on `http://localhost:3000`*

---

## 🌐 Environment Variables

Create `.env` in `/server`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/traverge
WEATHER_API_KEY=your_openweather_api_key_here
```
