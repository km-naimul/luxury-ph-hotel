# 🚀 Quick Deployment Steps

## 🔥 Firebase (Frontend) - Deploy Now

### Prerequisites
- Firebase CLI installed ✅ (Already installed)
- Firebase account (create at https://console.firebase.google.com)

### Steps:

1. **Login to Firebase** (requires browser):
   ```bash
   cd client
   firebase login
   ```
   - This will open your browser for authentication
   - Click "Allow" to authorize

2. **Initialize Firebase Hosting** (first time only):
   ```bash
   firebase init hosting
   ```
   - Select: **Use an existing project** or **Create a new project**
   - Public directory: **dist**
   - Single-page app: **Yes**
   - Automatic builds: **No**

3. **Build your frontend**:
   ```bash
   npm run build
   ```

4. **Deploy to Firebase**:
   ```bash
   firebase deploy --only hosting
   ```

5. **Your site will be live at**: 
   - `https://your-project-id.web.app`
   - `https://your-project-id.firebaseapp.com`

---

## 🖥️ Render (Backend) - Deploy Now

### Steps:

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Sign up/Login** (use GitHub for easy connection)
3. **Click "New +" → "Web Service"**
4. **Connect your GitHub repository**
5. **Configure**:
   - **Name**: `luxury-hotel-api`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
6. **Add Environment Variables** (in Render dashboard):
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_random_secret_key
   CLIENT_URL=https://your-firebase-url.web.app
   ```
7. **Click "Create Web Service"**
8. **Wait for deployment** (takes 5-10 minutes)
9. **Get your backend URL**: `https://your-service-name.onrender.com`

---

## 🔗 Connect Frontend to Backend

1. **Update `.env.production` in `client/` folder**:
   ```env
   VITE_API_BASE_URL=https://your-service-name.onrender.com/api
   ```

2. **Rebuild and redeploy frontend**:
   ```bash
   cd client
   npm run build
   firebase deploy --only hosting
   ```

---

## ✅ That's it! Your site is live! 🎉
