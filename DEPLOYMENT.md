# Deployment Guide - CPAP Mask Selector

This guide will walk you through deploying your CPAP Mask Selector app to make it accessible online.

## Prerequisites

- GitHub account (free)
- Railway account (free tier available) - for backend
- Vercel account (free tier available) - for frontend

## Step-by-Step Deployment

### Step 1: Push to GitHub

1. **Create a new repository on GitHub**
   - Go to https://github.com/new
   - Name it: `cpap-mask-selector` (or any name you prefer)
   - Make it public or private (your choice)
   - Don't initialize with README, .gitignore, or license

2. **Push your code to GitHub**
   ```bash
   cd "C:\Users\Latefoss\Documents\Mask Selector"
   git add .
   git commit -m "Initial commit - CPAP Mask Selector app"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/cpap-mask-selector.git
   git push -u origin main
   ```
   (Replace `YOUR_USERNAME` with your GitHub username)

### Step 2: Deploy Backend to Railway

1. **Sign up/Login to Railway**
   - Go to https://railway.app
   - Sign up with GitHub (recommended)

2. **Create a New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `cpap-mask-selector` repository

3. **Configure the Service**
   - Railway should auto-detect it's a Node.js project
   - Set **Root Directory** to: `backend`
   - Railway will automatically:
     - Run `npm install`
     - Run `npm start`

4. **Get Your Backend URL**
   - Once deployed, Railway will provide a URL like: `https://your-app.railway.app`
   - Click on your service → Settings → Generate Domain
   - Copy this URL - you'll need it for the frontend

### Step 3: Deploy Frontend to Vercel

1. **Sign up/Login to Vercel**
   - Go to https://vercel.com
   - Sign up with GitHub (recommended)

2. **Import Your Project**
   - Click "Add New" → "Project"
   - Import your `cpap-mask-selector` repository

3. **Configure the Project**
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend` (click "Edit" and set it)
   - **Build Command**: `npm run build` (should auto-detect)
   - **Output Directory**: `build` (should auto-detect)

4. **Set Environment Variables**
   - Click "Environment Variables"
   - Add a new variable:
     - **Name**: `REACT_APP_API_URL`
     - **Value**: Your Railway backend URL (e.g., `https://your-app.railway.app`)
   - Make sure it's set for "Production", "Preview", and "Development"

5. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your app
   - You'll get a URL like: `https://cpap-mask-selector.vercel.app`

### Step 4: Test Your Deployed App

1. Visit your Vercel URL
2. Complete the questionnaire
3. Verify the recommendation appears correctly

## Alternative: Deploy Backend to Render

If you prefer Render over Railway:

1. **Sign up at Render**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create a New Web Service**
   - Click "New" → "Web Service"
   - Connect your GitHub repository

3. **Configure the Service**
   - **Name**: `cpap-mask-selector-api`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Deploy**
   - Render will automatically deploy
   - Get your URL (e.g., `https://cpap-mask-selector-api.onrender.com`)
   - Use this URL in your Vercel environment variables

## Troubleshooting

### Backend Issues

- **Port Error**: Railway/Render automatically sets the PORT environment variable. Make sure your code uses `process.env.PORT || 3001`
- **CORS Error**: The backend already has CORS enabled for all origins. If you have issues, check the CORS configuration in `backend/server/index.js`

### Frontend Issues

- **API Connection Error**: 
  - Verify `REACT_APP_API_URL` is set correctly in Vercel
  - Make sure the backend URL doesn't have a trailing slash
  - Check that the backend is actually deployed and running

- **Build Errors**:
  - Check Vercel build logs
  - Make sure all dependencies are in `package.json`
  - Verify Node.js version compatibility

## Quick Commands Reference

```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main

# Update after changes
git add .
git commit -m "Your commit message"
git push
```

## Your Deployment URLs

After deployment, you'll have:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-app.railway.app` (or `.onrender.com`)

Share the frontend URL with users - it's your public app link!

## Need Help?

- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs

