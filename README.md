# CPAP Mask Selector

A comprehensive web application that helps users find the perfect CPAP mask based on a 12-factor assessment algorithm. The app features a user-friendly questionnaire interface and provides detailed recommendations with explanations.

## Features

- **12-Factor Assessment**: Comprehensive questionnaire covering all critical factors for CPAP mask selection
- **Safety-First Algorithm**: Implements safety constraints and critical warnings
- **Visual Questionnaire**: Multi-step wizard with progress tracking
- **Detailed Recommendations**: Provides specific mask models, attachment methods, and accessories
- **Factor Explanation**: Shows how each answer influenced the recommendation
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Project Structure

```
Mask Selector/
├── backend/              # Express API server
│   ├── server/
│   │   ├── index.js      # Main server file
│   │   └── algorithm.js  # Algorithm implementation
│   ├── package.json
│   └── railway.json      # Railway deployment config
├── frontend/             # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Questionnaire.jsx
│   │   │   ├── QuestionStep.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   └── Results.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── vercel.json       # Vercel deployment config
└── README.md
```

## Local Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional, defaults to port 3001):
```env
PORT=3001
NODE_ENV=development
```

4. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file to set the API URL:
```env
REACT_APP_API_URL=http://localhost:3001
```

4. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Deployment

### Backend Deployment (Railway)

1. **Create a Railway account** at [railway.app](https://railway.app)

2. **Create a new project** and connect your GitHub repository

3. **Add a new service** and select "Deploy from GitHub repo"

4. **Configure the service**:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

5. **Set environment variables** (if needed):
   - `PORT`: Railway will automatically assign a port
   - `NODE_ENV`: `production`

6. **Deploy**: Railway will automatically deploy when you push to your repository

7. **Get your API URL**: Railway will provide a URL like `https://your-app.railway.app`

### Frontend Deployment (Vercel)

1. **Create a Vercel account** at [vercel.com](https://vercel.com)

2. **Import your project** from GitHub

3. **Configure the project**:
   - Framework Preset: Create React App
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`

4. **Set environment variables**:
   - `REACT_APP_API_URL`: Your Railway backend URL (e.g., `https://your-app.railway.app`)

5. **Deploy**: Vercel will automatically deploy when you push to your repository

### Alternative Backend Deployment (Render)

If you prefer Render over Railway:

1. **Create a Render account** at [render.com](https://render.com)

2. **Create a new Web Service** and connect your GitHub repository

3. **Configure the service**:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: `Node`

4. **Set environment variables**:
   - `NODE_ENV`: `production`

5. **Deploy**: Render will automatically deploy when you push to your repository

## API Endpoints

### POST `/api/recommend`

Calculate CPAP mask recommendation based on user responses.

**Request Body:**
```json
{
  "breathing": "nose_only" | "mouth_only" | "mixed",
  "nasal": "no_obstruction" | "mild_obstruction" | "severe_obstruction" | "deviated_septum" | "seasonal_allergies",
  "sleepPosition": "back" | "side" | "stomach" | "sitting",
  "sleepMovement": "none" | "some" | "all_the_time",
  "claustrophobic": true | false,
  "facialHair": true | false,
  "adjustment": true | false,
  "implant": true | false,
  "eye": true | false,
  "drug": true | false,
  "assistant": true | false,
  "skinSensitivity": true | false
}
```

**Response:**
```json
{
  "success": true,
  "recommendation": {
    "maskType": "NASAL_PILLOWS",
    "specificModels": ["ResMed AirFit P30i", ...],
    "attachment": {
      "type": "Magnetic Quick-Release",
      "score": 90,
      "reason": "..."
    },
    "accessories": [...],
    "successRate": "80-90%",
    "safetyFlags": [...],
    "modificationNotes": [...],
    "factorInfluence": {...}
  }
}
```

### GET `/health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "CPAP Mask Selector API is running"
}
```

## Algorithm Overview

The algorithm implements a 6-step decision process:

1. **Safety Check**: Validates critical safety constraints (eye/reflux, drug/vomiting, assistant, implant)
2. **Primary Mask Type**: Determines initial mask category based on breathing type and nasal status
3. **Strong Modifiers**: Applies claustrophobic, facial hair, and sleep position factors
4. **Moderate Modifiers**: Considers sleep movement, skin sensitivity, and adjustment issues
5. **Attachment Method**: Selects optimal headgear/attachment based on all factors
6. **Accessory Selection**: Recommends necessary accessories

## Technology Stack

- **Frontend**: React 18, CSS3
- **Backend**: Node.js, Express
- **Deployment**: Vercel (frontend), Railway/Render (backend)

## License

MIT

## Disclaimer

This tool is for informational purposes only. Please consult with a healthcare professional or CPAP specialist before making a final decision on CPAP mask selection. Individual results may vary.

