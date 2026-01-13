# Backend Server Setup Guide

## ⚠️ "Failed to Fetch" Error

If you're seeing a "Failed to fetch" error when registering or logging in, it usually means the **backend server is not running**.

## ✅ Solution

### Step 1: Start the Backend Server

Open a terminal and run:

```bash
cd server
npm run dev
```

You should see:
```
🚀 Server is running on http://localhost:5000
📊 Environment: development
🔗 Health check: http://localhost:5000/health
```

### Step 2: Verify Backend is Running

Open your browser and go to:
```
http://localhost:5000/health
```

You should see a JSON response:
```json
{
  "success": true,
  "message": "SK+ Hotel API is running",
  "timestamp": "..."
}
```

### Step 3: Check MongoDB Connection

Make sure your MongoDB connection is working. The server should show:
```
✅ Connected to MongoDB
```

If you see MongoDB connection errors, check your `.env` file in the `server` folder.

## 🔍 Common Issues

1. **Port 5000 already in use**
   - Stop other applications using port 5000
   - Or change PORT in `server/.env`

2. **MongoDB not connected**
   - Check MongoDB Atlas connection string in `.env`
   - Verify internet connection

3. **Missing dependencies**
   - Run `npm install` in the `server` folder

## 📝 Quick Start Commands

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

Both servers must be running for the app to work!
