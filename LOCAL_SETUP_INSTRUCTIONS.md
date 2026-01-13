# Local Setup Instructions - MongoDB Atlas Connection

## ✅ Configuration Complete!

Your backend is now configured with MongoDB Atlas. Here's what was set up:

### 1. Environment Variables Created
- ✅ `.env` file created in `server/` directory
- ✅ MongoDB Atlas connection string configured
- ✅ JWT secret generated
- ✅ CORS configured for frontend

### 2. Database Connection Enabled
- ✅ Database connection code uncommented in `server.ts`
- ✅ Ready to connect to MongoDB Atlas

---

## 🚀 Next Steps to Run Locally

### Step 1: Install Dependencies (if not already done)

```bash
cd server
npm install
```

### Step 2: Start the Backend Server

```bash
cd server
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server is running on http://localhost:5000
📊 Environment: development
🔗 Health check: http://localhost:5000/health
```

### Step 3: Start the Frontend (in a new terminal)

```bash
cd client
npm run dev
```

The frontend will run on: `http://localhost:5173`

---

## 🧪 Test the Connection

1. **Test Backend Health Check:**
   - Open browser: http://localhost:5000/health
   - Should see: `{"success":true,"message":"SK+ Hotel API is running",...}`

2. **Test MongoDB Connection:**
   - Check terminal/console for: `✅ MongoDB connected successfully`
   - If you see an error, check the connection string in `.env`

---

## ⚠️ Troubleshooting

### If MongoDB connection fails:

1. **Check your MongoDB Atlas IP Whitelist:**
   - Go to MongoDB Atlas dashboard
   - Click "Network Access" (or "IP Access List")
   - Add `0.0.0.0/0` (allow all IPs) for development
   - OR add your current IP address

2. **Verify Connection String:**
   - Check `.env` file in `server/` directory
   - Ensure password is correct (no extra spaces)

3. **Check Database User:**
   - Go to MongoDB Atlas → Database Access
   - Ensure user `Sk_hotel-db` exists and has permissions

---

## 📝 What's Next?

Once the server is running, we can:
1. ✅ Create MongoDB models (Room, Booking, Guest, etc.)
2. ✅ Build API endpoints (GET /api/rooms, POST /api/bookings, etc.)
3. ✅ Connect frontend forms to backend APIs
4. ✅ Test the full stack

---

## 🔒 Security Notes

- The `.env` file is in `.gitignore` (won't be committed to GitHub)
- Change JWT_SECRET in production
- Consider restricting IP access in MongoDB Atlas for production
