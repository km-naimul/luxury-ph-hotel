# 📋 How to View Reservations - Dashboards Guide

## ✅ Dashboards Created!

I've created **both Customer and Admin dashboard pages** to view reservations.

---

## 🔍 Where to View Reservations

### 1. **Customer Dashboard** (View Your Own Bookings)
**URL:** `/dashboard`

**Features:**
- View your personal booking history
- Filter by status (All, Confirmed, Pending, Cancelled, Completed)
- See booking details (room, dates, amount, status)
- View room images and details
- Cancel bookings (when status is confirmed)

**Access:** Navigate to `http://localhost:5173/dashboard`

---

### 2. **Admin Dashboard** (View ALL Bookings)
**URL:** `/admin/dashboard`

**Features:**
- View ALL bookings across all customers
- Statistics overview:
  - Total bookings count
  - Confirmed bookings
  - Pending bookings
  - Cancelled bookings
  - Total revenue
- Filter bookings by status
- Table view with complete booking information
- Guest details (name, email, phone)
- Manage bookings (view/edit/cancel actions)

**Access:** Navigate to `http://localhost:5173/admin/dashboard`

---

## ⚠️ Important: Authentication Required

**Both dashboards require authentication** to work properly.

### Current Status:
- ✅ Dashboard pages created and styled
- ✅ Connected to booking APIs
- ❌ Authentication pages (login/register) NOT created yet
- ❌ Auth token storage NOT implemented

### What Happens Now:
- Dashboards will show an error: "Failed to load bookings. Please login."
- You need to implement authentication first

---

## 🔐 To Make Dashboards Work:

### Step 1: Create Login Page
Create `/login` page with:
- Email and password fields
- Call `POST /api/auth/login`
- Store token in localStorage
- Redirect to dashboard on success

### Step 2: Create Register Page
Create `/register` page with:
- Registration form (name, email, password)
- Call `POST /api/auth/register`
- Store token in localStorage
- Redirect to dashboard on success

### Step 3: Update API Client
The API client needs to send tokens automatically. I've started this, but you need to ensure tokens are sent in all requests.

---

## 💳 Payment Gateway Status

### ❌ Payment Gateway: **NOT IMPLEMENTED**

**Current Booking Flow:**
1. User fills booking form
2. Booking is created in database
3. Status is automatically set to "confirmed"
4. **NO payment processing occurs**

**To Implement Payment Gateway:**
1. Install Stripe SDK: `npm install stripe @stripe/stripe-js`
2. Add payment status field to Booking model
3. Create payment endpoints (`/api/payments/create-intent`, `/api/payments/webhook`)
4. Add payment form/page before booking confirmation
5. Integrate Stripe Checkout
6. Handle payment webhooks to update booking status

**Recommended:** Use Stripe (most popular, well-documented)

---

## 📊 Quick Access Guide

### For Customers:
1. Go to: `http://localhost:5173/dashboard`
2. (After login) View all your bookings
3. Filter by status
4. View booking details
5. Cancel bookings if needed

### For Admins:
1. Go to: `http://localhost:5173/admin/dashboard`
2. (After login as admin) View ALL bookings
3. See statistics and revenue
4. Filter and manage bookings
5. View guest information

---

## 🚀 Next Steps

1. ✅ Dashboards created
2. ⏳ Create login/register pages
3. ⏳ Implement authentication flow
4. ⏳ Test dashboards with real bookings
5. ⏳ (Optional) Add payment gateway
6. ⏳ (Optional) Add booking management actions (edit, cancel)

---

## 📝 Summary

- ✅ **Customer Dashboard:** Created at `/dashboard`
- ✅ **Admin Dashboard:** Created at `/admin/dashboard`
- ✅ **Booking Viewing APIs:** Already implemented in backend
- ❌ **Authentication UI:** Need to create login/register pages
- ❌ **Payment Gateway:** Not implemented (future feature)

**The dashboards are ready - you just need authentication to use them!**
