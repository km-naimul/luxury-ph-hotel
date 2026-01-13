# 🔐 Authentication & Payment Setup Guide

## ✅ What's Been Implemented

### 1. Authentication System ✅
- Login page (`/login`)
- Register page (`/register`)
- Auth context for state management
- Protected routes (redirects to login if not authenticated)
- JWT token storage in localStorage

### 2. Booking Flow Updates ✅
- "Book Now" buttons now require authentication
- Users redirected to login if not authenticated
- After login/register, users redirected back to booking page
- Booking created with "pending" status (waiting for payment)

### 3. Payment Gateway Integration ✅
- Stripe integration setup
- Payment page created (`/payment`)
- Payment intent creation
- Webhook handler for payment status
- Payment verification

### 4. Database Updates ✅
- Booking model updated with payment fields:
  - `paymentStatus`: 'pending' | 'paid' | 'failed' | 'refunded'
  - `paymentIntentId`: Stripe payment intent ID
  - `stripePaymentId`: Stripe payment ID

---

## 🔧 Setup Required

### 1. Stripe Account Setup

1. **Create Stripe Account:**
   - Go to https://stripe.com
   - Sign up for a free account
   - Get your API keys from the dashboard

2. **Get API Keys:**
   - Test Mode Secret Key: `sk_test_...`
   - Test Mode Publishable Key: `pk_test_...`
   - Webhook Secret: `whsec_...` (after setting up webhook)

3. **Configure Environment Variables:**

   **Backend (`server/.env`):**
   ```env
   STRIPE_SECRET_KEY=sk_test_your_secret_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

   **Frontend (`client/.env`):**
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
   ```

4. **Setup Webhook (Production):**
   - In Stripe Dashboard → Webhooks
   - Add endpoint: `https://yourdomain.com/api/payments/webhook`
   - Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
   - Copy webhook secret to `.env`

### 2. Install Dependencies

**Backend:**
```bash
cd server
npm install stripe
```

**Frontend:**
```bash
cd client
npm install @stripe/stripe-js @stripe/react-stripe-js
```

---

## 📋 Complete Booking Flow

### Step-by-Step Process:

1. **User clicks "Book Now"**
   - If not logged in → Redirected to `/login`
   - If logged in → Go to `/book`

2. **Login/Register**
   - User signs in or creates account
   - After successful auth → Redirected to `/book`

3. **Booking Page**
   - User fills booking form
   - Selects room, dates, guests
   - Clicks "Confirm Booking"
   - Booking created in database with status: "pending"

4. **Payment Page**
   - User redirected to `/payment`
   - Payment intent created with Stripe
   - User enters card details
   - Clicks "Pay"

5. **Payment Processing**
   - Stripe processes payment
   - Webhook updates booking status
   - Payment status set to "paid"
   - Booking status set to "confirmed"

6. **Confirmation**
   - User redirected to `/booking-confirmation`
   - Shows booking details and confirmation

---

## 🚀 How to Test

### 1. Start Servers

**Backend:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
cd client
npm run dev
```

### 2. Test Booking Flow

1. Go to homepage
2. Click "Book Now" → Should redirect to login
3. Register/Login
4. Fill booking form
5. Confirm booking → Redirected to payment page
6. Use Stripe test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Any ZIP code
7. Complete payment
8. See confirmation page

### 3. Test Cards (Stripe Test Mode)

- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- **3D Secure:** `4000 0025 0000 3155`

---

## 📝 Files Created/Updated

### Frontend:
- `client/src/context/AuthContext.tsx` - Authentication context
- `client/src/pages/LoginPage.tsx` - Login page
- `client/src/pages/RegisterPage.tsx` - Register page
- `client/src/pages/PaymentPage.tsx` - Payment page
- `client/src/components/ProtectedRoute.tsx` - Protected route wrapper
- `client/src/services/payment.ts` - Payment service

### Backend:
- `server/src/controllers/payment.controller.ts` - Payment controller
- `server/src/routes/payment.routes.ts` - Payment routes
- `server/src/models/Booking.ts` - Updated with payment fields

### Updated:
- `client/src/App.tsx` - Added routes and protected routes
- `client/src/main.tsx` - Added AuthProvider
- `client/src/pages/BookingPage.tsx` - Redirects to payment
- `client/src/services/api.ts` - Added token to requests
- `server/src/app.ts` - Added payment routes
- `server/src/controllers/bookings.controller.ts` - Booking status set to pending

---

## ⚠️ Important Notes

1. **Stripe Keys Required:**
   - You MUST add Stripe keys to `.env` files
   - Without keys, payment will fail

2. **Webhook Setup:**
   - For local development, use Stripe CLI: `stripe listen --forward-to localhost:5000/api/payments/webhook`
   - For production, configure webhook in Stripe Dashboard

3. **Testing:**
   - Use Stripe test mode keys
   - Use test card numbers (never real cards in test mode)

4. **Authentication:**
   - Users must be logged in to book
   - Token stored in localStorage
   - Token sent with all API requests

---

## 🎯 Next Steps

1. ✅ Authentication - DONE
2. ✅ Payment Integration - DONE
3. ⏳ Add Stripe keys to `.env` files
4. ⏳ Test the complete flow
5. ⏳ (Optional) Add email notifications
6. ⏳ (Optional) Add booking cancellation

**The system is ready - just add your Stripe keys and test!** 🚀
