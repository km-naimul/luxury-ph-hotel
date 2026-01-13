# How to Test Booking Functionality

## 🚀 Quick Start

### 1. Start Backend Server
```bash
cd server
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server is running on http://localhost:5000
```

### 2. Start Frontend
```bash
cd client
npm run dev
```

Frontend runs on: http://localhost:5173

---

## 📝 Test the Booking Form

### Step 1: Open Booking Page
1. Go to: http://localhost:5173/book
2. You'll see the booking form

### Step 2: Fill Out the Form

**Required Fields:**
1. **Select Room**: Choose from dropdown (e.g., "Deluxe Room")
2. **Check-in Date**: Select a future date
3. **Check-out Date**: Select a date after check-in
4. **Number of Guests**: Enter 1-6
5. **First Name**: Your first name
6. **Last Name**: Your last name
7. **Email**: Your email address
8. **Phone**: Your phone number
9. **Special Requests**: (Optional)

### Step 3: Submit the Booking

1. Click **"Confirm Booking"** button
2. Button will show "Processing..." while submitting
3. Form validates all fields
4. Data is sent to backend API
5. **Success!** You'll be redirected to confirmation page
6. Booking is saved to MongoDB database!

---

## ✅ What Happens When You Submit

1. **Form Validation** ✅
   - All required fields checked
   - Email format validated
   - Dates validated (check-out after check-in)

2. **API Call** ✅
   - POST request to `http://localhost:5000/api/bookings`
   - Booking data sent to backend

3. **Backend Processing** ✅
   - Guest created/updated in database
   - Room found in database
   - Pricing calculated (room rate + 15% tax + 10% service charge)
   - Booking created with unique booking number
   - Saved to MongoDB

4. **Success Response** ✅
   - Redirected to `/booking-confirmation` page
   - Booking confirmation number displayed
   - All booking details shown

5. **Database Updated** ✅
   - Booking saved in `bookings` collection
   - Guest saved in `guests` collection

---

## 🔍 Verify the Booking

### Check in MongoDB Atlas:
1. Go to MongoDB Atlas Dashboard
2. Click "Browse Collections"
3. Check `bookings` collection - you'll see your booking!
4. Check `guests` collection - you'll see the guest info!

### Check via API:
```bash
# Get all bookings
curl http://localhost:5000/api/bookings

# Get bookings by email
curl "http://localhost:5000/api/bookings?email=your-email@example.com"
```

---

## 📋 Expected Result

After clicking "Confirm Booking":

✅ **Success Message**: Redirected to confirmation page  
✅ **Booking Number**: Unique booking number displayed  
✅ **Booking Details**: Room, dates, guests, total amount  
✅ **Database**: Booking saved in MongoDB  
✅ **No Errors**: Smooth submission process  

---

## ⚠️ Troubleshooting

### If booking fails:

1. **Check Backend is Running**
   - Terminal should show: `🚀 Server is running on http://localhost:5000`
   - If not, start it: `cd server && npm run dev`

2. **Check Browser Console (F12)**
   - Look for any error messages
   - Check Network tab to see API request status

3. **Check Server Logs**
   - Look at the terminal where backend is running
   - Should see the booking request logged

4. **Common Issues:**
   - **CORS Error**: Make sure backend is running on port 5000
   - **404 Error**: Check backend server is running
   - **Validation Error**: Make sure all required fields are filled
   - **Room Not Found**: Select a room from the dropdown

---

## 🎉 Success!

When everything works:
- ✅ Form submits successfully
- ✅ Redirected to confirmation page
- ✅ Booking saved in database
- ✅ Success message shown (confirmation page)

The booking system is fully functional! 🚀
