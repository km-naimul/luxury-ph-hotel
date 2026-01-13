# How to View MongoDB Collections in Atlas

## 📊 Collections in MongoDB Atlas

Collections in MongoDB are created **automatically** when you insert data. Right now you should see:

### Expected Collections:
- ✅ `rooms` - Should exist (6 rooms seeded)
- ⏳ `bookings` - Will appear when you create your first booking
- ⏳ `guests` - Will appear when you create your first booking
- ⏳ `users` - Will appear when you create a user

---

## 🔍 How to View Collections in MongoDB Atlas

### Method 1: Browse Collections (GUI)
1. Go to https://cloud.mongodb.com
2. Sign in to your account
3. Click on your cluster name
4. Click **"Browse Collections"** button
5. You should see:
   - Database: `sk-hotel`
   - Collections: `rooms` (and others once data is inserted)

### Method 2: Check Database Status
Run the test script:
```bash
cd server
node test-db.js
```

This will show you:
- All collections in the database
- Number of documents in each collection

---

## 🧪 Test Creating a Booking

To see the `bookings` and `guests` collections appear:

### Option 1: Use the Frontend (Recommended)
1. Start backend: `cd server && npm run dev`
2. Start frontend: `cd client && npm run dev`
3. Go to: http://localhost:5173/book
4. Fill out the booking form and submit
5. Check MongoDB Atlas - you should now see `bookings` and `guests` collections!

### Option 2: Test via API (curl/Postman)
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "roomId": "deluxe-room",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "checkIn": "2024-12-25",
    "checkOut": "2024-12-27",
    "guests": 2
  }'
```

---

## 📝 Current Status

Based on the seed script, you should have:
- ✅ **rooms** collection with 6 documents

After creating a booking, you'll see:
- ✅ **bookings** collection
- ✅ **guests** collection

---

## 🔍 If Collections Don't Appear

1. **Refresh MongoDB Atlas** - Collections appear in real-time but you may need to refresh
2. **Check Database Name** - Make sure you're looking at the `sk-hotel` database
3. **Run Test Script** - Use `node test-db.js` to verify collections exist
4. **Check Server Logs** - Make sure the server is running and connected

---

## ✅ Quick Verification

Run this to see what's in your database:
```bash
cd server
node test-db.js
```

You should see:
- Collections list
- Room count (should be 6)
- Booking count (0 until you create one)
- Guest count (0 until you create one)
