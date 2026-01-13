# MongoDB Database Information

## About Database Names in MongoDB Atlas

### ✅ Important: Databases are Created Automatically!

In MongoDB Atlas, **you don't need to create a database manually**. The database will be created automatically when you:
1. Connect to it for the first time, OR
2. Write data to it for the first time

### Current Configuration

**Database Name**: `sk-hotel`  
**Connection String Format**: `mongodb+srv://username:password@cluster.net/database-name?options`

The database `sk-hotel` doesn't exist yet in your cluster, and that's **completely normal**! It will be created automatically when:
- The backend connects successfully, OR
- We create the first document/collection

---

## How to Verify Connection

### Option 1: Test the Connection (Recommended)

Run the server:
```bash
cd server
npm run dev
```

If you see `✅ MongoDB connected successfully`, the connection is working!  
The database `sk-hotel` will appear in your MongoDB Atlas dashboard after the first write operation.

### Option 2: Check MongoDB Atlas Dashboard

1. Go to MongoDB Atlas Dashboard
2. Click on your cluster
3. Click "Browse Collections"
4. You might see "No collections yet" - this is normal!
5. After the backend runs and creates data, you'll see:
   - Database: `sk-hotel`
   - Collections: (rooms, bookings, etc.)

---

## If Connection Still Fails

### Common Issues:

1. **IP Whitelist** (Most Common)
   - Go to MongoDB Atlas → Network Access
   - Add your IP address OR `0.0.0.0/0` for development

2. **Username/Password**
   - Verify username: `Sk_hotel-db`
   - Verify password: `cXXxwwRsAZjirEIB`
   - Check for any extra spaces or typos

3. **Database User Permissions**
   - Go to Database Access
   - Ensure user `Sk_hotel-db` has "Read and write to any database" permissions

---

## Next Steps

1. **Test the connection** by running `npm run dev` in the server directory
2. **Check the console** for connection success message
3. **Verify in Atlas** - database will appear after first data write
4. **Start building models** - we'll create Room, Booking models next

The database name `sk-hotel` in the connection string is correct - MongoDB will create it automatically!
