# 🔧 CORS Configuration Fix

## Problem
Your backend CORS is configured to only allow `http://localhost:5173`, but your frontend is now deployed at `https://luxury-ph-hotel.web.app`.

## Solution

### Update Backend CORS in Render Dashboard:

1. Go to your Render Dashboard: https://dashboard.render.com
2. Open your backend service (`luxury-ph-hotel-api` or similar)
3. Go to **Environment** tab
4. Add or update the `CLIENT_URL` environment variable:

   ```
   CLIENT_URL=https://luxury-ph-hotel.web.app
   ```

   **OR** if you want to allow multiple origins, you can update the backend code to accept both.

5. **Save Changes** and Render will automatically redeploy

### Alternative: Allow Multiple Origins (Backend Code Update)

If you want to allow both local development and production, update `server/src/app.ts`:

```typescript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://luxury-ph-hotel.web.app',
    'https://luxury-ph-hotel.firebaseapp.com'
  ],
  credentials: true,
}));
```

Then commit and push, Render will auto-deploy.

---

## After Updating CORS:

1. Wait for Render to finish redeploying (2-3 minutes)
2. Test your login at: https://luxury-ph-hotel.web.app/login
3. It should work now! ✅
