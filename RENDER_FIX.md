# 🔧 Render Deployment Fix

## The Problem
Render is looking for `package.json` in the wrong location: `/opt/render/project/src/package.json`

## The Solution

You have **2 options**:

---

## Option 1: Fix in Render Dashboard (Easiest) ⭐ RECOMMENDED

1. Go to your Render Dashboard: https://dashboard.render.com
2. Open your service (the one that failed)
3. Go to **Settings** tab
4. Scroll down to **Build & Deploy**
5. Check these settings:

   - **Root Directory**: Must be set to `server` (NOT blank, NOT `/server`, just `server`)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: `Node`

6. Click **Save Changes**
7. Go to **Events** tab and click **Manual Deploy** → **Deploy latest commit**

---

## Option 2: Move render.yaml to Root (If Option 1 doesn't work)

If the Root Directory setting isn't working, move `render.yaml` to the repository root:

1. **Move** `server/render.yaml` → `render.yaml` (root of your repo)
2. **Update** the build command in Render dashboard to:
   ```
   cd server && npm install && npm run build
   ```
3. **Update** the start command to:
   ```
   cd server && npm start
   ```
4. **Set Root Directory** in Render to: (leave blank or set to `.`)

---

## Option 3: Use Render Dashboard Only (No render.yaml)

1. **Delete** `server/render.yaml` (it might be causing confusion)
2. In Render Dashboard, set:
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: `Node`

---

## ✅ Verification Checklist

After fixing, make sure:
- [ ] Root Directory is set to `server` (no leading slash, no trailing slash)
- [ ] Build Command is: `npm install && npm run build`
- [ ] Start Command is: `npm start`
- [ ] Environment Variables are set (MONGODB_URI, JWT_SECRET, etc.)
- [ ] Deploy again after making changes

---

## 🆘 Still Not Working?

If it still fails, check the build logs and verify:
1. Your GitHub repo structure matches:
   ```
   your-repo/
   ├── server/
   │   ├── package.json  ← Should be here
   │   ├── src/
   │   └── ...
   └── client/
   ```

2. The Root Directory path is relative to your repo root, so `server` is correct

3. Try deploying from a clean state:
   - In Render, go to Settings
   - Clear the Root Directory field
   - Set it again to `server`
   - Save and redeploy
