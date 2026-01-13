# MongoDB Collections Explanation

## 📊 Current Database Status

Based on the test, here's what's in your database:

### ✅ Existing Collections:
- **`rooms`** - ✅ 6 rooms (seeded successfully)
- **`test`** - (temporary test collection, can be ignored)

### ⏳ Collections That Will Appear Automatically:
- **`bookings`** - Will appear when you create your first booking
- **`guests`** - Will appear when you create your first booking
- **`users`** - Will appear when you create a user (for authentication)

---

## 🔍 Why You Don't See `bookings` Collection Yet

**MongoDB creates collections automatically when you insert data.**

Since you haven't created any bookings yet, the `bookings` and `guests` collections don't exist. They will be created automatically when:

1. You submit a booking through the frontend booking form, OR
2. You create a booking via the API

---

## 🧪 How to Create a Booking and See Collections

### Step 1: Start the Backend Server
```bash
cd server
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server is running on http://localhost:5000
```

### Step 2: Start the Frontend
```bash
cd client
npm run dev
```

### Step 3: Create a Booking
1. Go to: http://localhost:5173/book
2. Fill out the booking form:
   - Select a room (e.g., "Deluxe Room")
   - Enter check-in and check-out dates
   - Enter guest information
   - Click "Confirm Booking"
3. The booking will be saved to MongoDB!

### Step 4: Check MongoDB Atlas
1. Go to MongoDB Atlas Dashboard
2. Click "Browse Collections"
3. You should now see:
   - ✅ `bookings` collection (with your booking)
   - ✅ `guests` collection (with the guest information)

---

## 📝 Quick Test via API (Alternative)

If you want to test without the frontend, you can use curl:

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

After this, check MongoDB Atlas - you'll see the `bookings` and `guests` collections!

---

## ✅ Summary

- **`rooms` collection**: ✅ Exists (6 rooms)
- **`bookings` collection**: ⏳ Will appear when you create a booking
- **`guests` collection**: ⏳ Will appear when you create a booking

**The API is working correctly!** Collections are created automatically when data is inserted. Just create a booking and you'll see them appear in MongoDB Atlas.
