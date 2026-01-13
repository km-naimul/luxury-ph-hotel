# Test Credentials for SK+ Hotel

## 🔑 Admin Account

**Email:** `admin@skhotel.com`  
**Password:** `admin123`  
**Role:** Admin  
**Access:** Admin Dashboard (can view and manage all bookings)

---

## 👤 Customer Accounts

### Customer 1
**Email:** `john.doe@email.com`  
**Password:** `customer123`  
**Role:** Guest  
**Access:** Customer Dashboard (can view own bookings)

### Customer 2
**Email:** `jane.smith@email.com`  
**Password:** `customer123`  
**Role:** Guest  
**Access:** Customer Dashboard (can view own bookings)

---

## 📋 How to Seed Test Users

Run this command in the `server` directory:

```bash
cd server
npm run seed:users
```

This will create:
- 1 Admin user
- 2 Customer users
- Sample bookings for customers (if rooms exist)

**Note:** Make sure you've seeded rooms first:
```bash
npm run seed
```

---

## 🧪 Testing Scenarios

### Admin Testing:
1. Login with admin credentials
2. Navigate to Admin Dashboard
3. View all bookings
4. Update booking statuses
5. Cancel bookings
6. View booking statistics

### Customer Testing:
1. Login with customer credentials
2. Navigate to Customer Dashboard
3. View own bookings
4. Create new bookings
5. View booking history
6. Update profile (if implemented)

### Booking Flow Testing:
1. Login as customer
2. Go to Rooms page
3. Select a room
4. Click "Book Now"
5. Fill booking form
6. Complete payment (if Stripe configured)
7. View booking confirmation

---

## ⚠️ Important Notes

- These are **test credentials only** - do not use in production!
- Change passwords in production
- The seed script will skip users that already exist
- Bookings are created with future dates (7+ days from now)
- Customer 1 (john.doe@email.com) has a confirmed booking
- Customer 2 (jane.smith@email.com) has a pending booking
