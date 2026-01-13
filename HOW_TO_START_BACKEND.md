# 🚀 How to Start the Backend Server

## Quick Start

### Step 1: Open a Terminal
Open PowerShell, Command Prompt, or your terminal.

### Step 2: Navigate to Server Folder
```bash
cd "c:\project\Luxury ph hotel\server"
```

### Step 3: Start the Server
```bash
npm run dev
```

## ✅ What You Should See

When the server starts successfully, you'll see:
```
✅ Connected to MongoDB
🚀 Server is running on http://localhost:5000
📊 Environment: development
🔗 Health check: http://localhost:5000/health
```

## ⚠️ Common Issues

### Issue 1: Port 5000 Already in Use
**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
1. Find what's using port 5000:
   ```bash
   netstat -ano | findstr :5000
   ```
2. Kill the process (replace PID with the number from above):
   ```bash
   taskkill /PID <PID> /F
   ```
3. Or change the port in `server/.env`:
   ```
   PORT=5001
   ```
   Then update `client/.env`:
   ```
   VITE_API_BASE_URL=http://localhost:5001/api
   ```

### Issue 2: MongoDB Connection Failed
**Error:** `MongoServerError` or connection timeout

**Solution:**
1. Check your `.env` file in the `server` folder
2. Verify MongoDB Atlas connection string is correct
3. Make sure your IP is whitelisted in MongoDB Atlas
4. Check internet connection

### Issue 3: Missing Dependencies
**Error:** `Cannot find module` or `npm: command not found`

**Solution:**
```bash
cd server
npm install
```

### Issue 4: TypeScript Errors
**Error:** Compilation errors

**Solution:**
```bash
cd server
npm install
npm run build
```

## 🔍 Verify Server is Running

Open your browser and go to:
```
http://localhost:5000/health
```

You should see:
```json
{
  "success": true,
  "message": "SK+ Hotel API is running",
  "timestamp": "..."
}
```

## 📝 Keep Server Running

**Important:** Keep the terminal window open while using the app. The server must stay running for the frontend to work.

To stop the server, press `Ctrl + C` in the terminal.

## 🎯 Full Setup (Both Servers)

**Terminal 1 - Backend:**
```bash
cd "c:\project\Luxury ph hotel\server"
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd "c:\project\Luxury ph hotel\client"
npm run dev
```

Both must be running simultaneously!
