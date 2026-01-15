# 🚀 Deployment Guide

This guide will help you deploy the Luxury PH Hotel application.

## 📋 Overview

- **Frontend (Client)**: Deploy to Firebase Hosting
- **Backend (Server)**: Deploy to Render (recommended) or Railway

---

## 🔥 Firebase Deployment (Frontend)

### Step 1: Install Firebase CLI (if not already installed)
```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase
```bash
cd client
firebase login
```
This will open a browser window for authentication.

### Step 3: Initialize Firebase Project (First time only)
```bash
firebase init hosting
```

Follow the prompts:
- Select "Use an existing project" or "Create a new project"
- Set `dist` as your public directory
- Configure as a single-page app: **Yes**
- Set up automatic builds: **No** (we'll build manually)

### Step 4: Build the Project
```bash
npm run build
```

### Step 5: Deploy to Firebase
```bash
firebase deploy --only hosting
```

Your site will be live at: `https://your-project-id.web.app` or `https://your-project-id.firebaseapp.com`

### Step 6: Set Environment Variables (Important!)

Before deploying, you need to create a `.env.production` file in the `client` directory:

```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
```

Then rebuild and redeploy:
```bash
npm run build
firebase deploy --only hosting
```

**Note**: Since Vite builds at build time, you need to set the environment variable before running `npm run build`.

---

## 🖥️ Render Deployment (Backend)

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up/Login with GitHub
3. Connect your GitHub repository

### Step 2: Create a New Web Service
1. Click "New +" → "Web Service"
2. Connect your repository
3. Configure the service:
   - **Name**: `luxury-hotel-api` (or your choice)
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free tier is fine for testing

### Step 3: Set Environment Variables in Render Dashboard

Go to the "Environment" tab and add:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_strong_random_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=https://your-firebase-url.web.app
STRIPE_SECRET_KEY=your_stripe_secret_key (optional)
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key (optional)
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret (optional)
```

### Step 4: Deploy
1. Click "Create Web Service"
2. Render will automatically deploy your backend
3. Wait for deployment to complete
4. Your backend URL will be: `https://your-service-name.onrender.com`

### Step 5: Update Frontend Environment Variable

Update your `client/.env.production` file with the Render backend URL:
```env
VITE_API_BASE_URL=https://your-service-name.onrender.com/api
```

Then rebuild and redeploy the frontend to Firebase.

---

## 🔄 Alternative: Railway Deployment (Backend)

### Step 1: Install Railway CLI
```bash
npm i -g @railway/cli
```

### Step 2: Login
```bash
railway login
```

### Step 3: Initialize Project
```bash
cd server
railway init
```

### Step 4: Add Environment Variables
```bash
railway variables set NODE_ENV=production
railway variables set MONGODB_URI=your_mongodb_uri
railway variables set JWT_SECRET=your_jwt_secret
railway variables set CLIENT_URL=your_firebase_url
# Add other variables as needed
```

### Step 5: Deploy
```bash
railway up
```

---

## ✅ Post-Deployment Checklist

- [ ] Backend is deployed and accessible
- [ ] Frontend environment variable points to backend URL
- [ ] Frontend is deployed to Firebase
- [ ] CORS is configured correctly (backend allows frontend URL)
- [ ] MongoDB Atlas allows connections from Render/Railway IP (0.0.0.0/0)
- [ ] All environment variables are set correctly
- [ ] Test login/registration on live site
- [ ] Test booking creation
- [ ] Verify API endpoints are working

---

## 🔗 Quick Deployment Commands

### Frontend (Firebase)
```bash
cd client
npm run build
firebase deploy --only hosting
```

### Backend (Render)
- Push to GitHub, Render auto-deploys
- Or use Render dashboard to trigger manual deploy

---

## 📝 Important Notes

1. **MongoDB Atlas**: Make sure your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0) or add Render/Railway IPs to the whitelist.

2. **CORS**: Update `CLIENT_URL` environment variable in backend to match your Firebase URL.

3. **Environment Variables**: 
   - Frontend: Set before building (Vite bundles them at build time)
   - Backend: Set in Render/Railway dashboard

4. **Free Tier Limitations**:
   - Render free tier: Services sleep after 15 minutes of inactivity
   - Firebase: Generous free tier for hosting
   - Consider upgrading for production use

5. **Domain Setup**: Both platforms allow custom domain setup (free on Firebase, paid on Render).

---

## 🆘 Troubleshooting

### Frontend can't connect to backend
- Check `VITE_API_BASE_URL` is set correctly
- Verify backend is running (check Render/Railway logs)
- Check CORS settings in backend

### Backend deployment fails
- Check build logs in Render/Railway dashboard
- Verify all environment variables are set
- Check MongoDB connection string format

### MongoDB connection errors
- Verify MongoDB Atlas allows connections from 0.0.0.0/0
- Check connection string format
- Verify database user credentials
