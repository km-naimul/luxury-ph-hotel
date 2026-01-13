# Backend Setup Guide

## Information Needed for Backend Connection

### 1. MongoDB Database Connection

You have two options:

#### Option A: Local MongoDB (Recommended for Development)
- **Requirement**: MongoDB must be installed on your computer
- **Default Connection**: `mongodb://localhost:27017/sk-hotel`
- **No additional setup needed** if MongoDB is running locally

#### Option B: MongoDB Atlas (Cloud - Recommended for Production)
- **Requirement**: Free account at https://www.mongodb.com/cloud/atlas
- **What you'll need**:
  - MongoDB Atlas connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/sk-hotel`)
  - Or separate credentials:
    - MONGODB_USER
    - MONGODB_PASSWORD
    - MONGODB_URI (connection string)

### 2. Backend to Frontend Connection

**Already configured!** But you can customize if needed:
- **Backend Server Port**: Default is `5000` (http://localhost:5000)
- **Frontend URL**: Default is `http://localhost:5173` (Vite default)
- **API Base URL**: `http://localhost:5000/api`

### 3. Environment Variables Needed

Create a `.env` file in the `server/` directory with:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
# Option 1: Full connection string (recommended for Atlas)
MONGODB_URI=mongodb://localhost:27017/sk-hotel
# OR for Atlas: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sk-hotel

# Option 2: Separate credentials (optional)
# MONGODB_USER=your-username
# MONGODB_PASSWORD=your-password

# JWT Secret (for authentication - change this!)
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173
```

## Quick Start Questions

Please answer these so I can help you set up:

1. **MongoDB Setup**:
   - [ ] Do you have MongoDB installed locally?
   - [ ] Do you want to use MongoDB Atlas (cloud)?
   - [ ] Do you have a MongoDB Atlas account/connection string?

2. **Ports** (Optional - defaults work fine):
   - Backend port (default: 5000) - OK?
   - Frontend port (default: 5173) - OK?

3. **Security**:
   - Do you want me to generate a secure JWT secret, or use the default for now?

## Next Steps

Once you provide this information, I will:
1. Create the `.env` file with your configuration
2. Create `.env.example` file as a template
3. Test the database connection
4. Start implementing the API endpoints
5. Connect the frontend to the backend

---

**Note**: If you don't have MongoDB yet, I can guide you through:
- Installing MongoDB locally, OR
- Setting up a free MongoDB Atlas account (recommended - it's free and easy)
