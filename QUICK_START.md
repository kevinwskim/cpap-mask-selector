# Quick Start - Deploy Your CPAP Mask Selector App

## 🚀 Fast Deployment (5 minutes)

### Step 1: Push to GitHub

1. **Create GitHub Repository**
   - Go to: https://github.com/new
   - Name: `cpap-mask-selector`
   - Click "Create repository"

2. **Push Your Code**
   ```powershell
   cd "C:\Users\Latefoss\Documents\Mask Selector"
   git remote add origin https://github.com/YOUR_USERNAME/cpap-mask-selector.git
   git branch -M main
   git push -u origin main
   ```
   *(Replace YOUR_USERNAME with your GitHub username)*

### Step 2: Deploy Backend (Railway) - 2 minutes

1. Go to: https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Click on the service → Settings → Set **Root Directory** to: `backend`
6. Railway auto-deploys! Get your URL (e.g., `https://your-app.railway.app`)

### Step 3: Deploy Frontend (Vercel) - 2 minutes

1. Go to: https://vercel.com
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Import your repository
5. Configure:
   - **Root Directory**: `frontend`
   - **Framework**: Create React App (auto-detected)
6. Add Environment Variable:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: Your Railway backend URL
7. Click "Deploy"

### Step 4: Done! 🎉

Your app is live at: `https://your-app.vercel.app`

---

## 📋 Detailed Instructions

See `DEPLOYMENT.md` for complete step-by-step guide with troubleshooting.

## 🔧 Local Testing First (Optional)

Test locally before deploying:

```powershell
# Terminal 1 - Backend
cd backend
npm install
npm start

# Terminal 2 - Frontend  
cd frontend
npm install
npm start
```

Then visit: http://localhost:3000

