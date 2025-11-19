# 🚀 CPAP Mask Selector - Quick Start

## Simple 3-Step Setup

### Step 1: Install Dependencies

```bash
npm install
cd frontend
npm install
cd ..
```

### Step 2: Build Frontend

```bash
npm run build
```

### Step 3: Start Server

```bash
npm start
```

**That's it!** Open your browser to: **http://localhost:3000**

---

## One-Command Setup (First Time)

```bash
npm run setup
```

This installs everything and builds the app. Then just run:

```bash
npm start
```

---

## What Changed?

- ✅ **Single Server**: Everything runs on one Express server (port 3000)
- ✅ **No Deployment Needed**: Works completely locally
- ✅ **No Environment Variables**: No configuration needed
- ✅ **Simple**: Just install, build, and start

---

## Troubleshooting

**Port 3000 already in use?**
```bash
PORT=3001 npm start
```

**Frontend not showing?**
Make sure you ran `npm run build` first!

**Need to rebuild after changes?**
```bash
npm run build
npm start
```

---

## Project Structure

```
Mask Selector/
├── server/              # Express server (API + serves React)
│   ├── index.js
│   └── algorithm.js
├── frontend/            # React app
│   ├── src/
│   └── build/           # Built files (created after build)
└── package.json         # Root package.json
```

---

That's all you need! The app is now a simple local server. 🎉

