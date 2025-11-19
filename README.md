# CPAP Mask Selector - Local Server App

A comprehensive web application that helps users find the perfect CPAP mask based on a 12-factor assessment algorithm. This version runs as a **single local server** that serves both the frontend and backend.

## Quick Start

### 1. Install Dependencies

```bash
# Install root dependencies (Express server)
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Build Frontend

```bash
npm run build
```

This builds the React app into `frontend/build` folder.

### 3. Start the Server

```bash
npm start
```

The app will be available at: **http://localhost:3000**

---

## One-Command Setup (First Time)

```bash
npm run setup
```

This will:
1. Install all dependencies (root + frontend)
2. Build the React frontend
3. Ready to run with `npm start`

---

## Development Mode

For development with auto-rebuild:

```bash
npm run dev
```

This will rebuild the frontend and restart the server when files change.

---

## Project Structure

```
Mask Selector/
├── server/
│   ├── index.js          # Express server (serves API + React build)
│   └── algorithm.js      # CPAP mask selection algorithm
├── frontend/
│   ├── src/              # React source code
│   └── build/            # Built React app (created after npm run build)
├── package.json          # Root package.json
└── README.md
```

---

## How It Works

1. **Express Server** (`server/index.js`):
   - Serves API endpoints at `/api/*`
   - Serves the built React app for all other routes
   - Runs on port 3000 by default

2. **API Endpoints**:
   - `GET /api/health` - Health check
   - `POST /api/recommend` - Get CPAP mask recommendation

3. **Frontend**:
   - React app built and served as static files
   - Makes API calls to the same server (relative paths)

---

## Features

- **12-Factor Assessment**: Comprehensive questionnaire covering all critical factors
- **Safety-First Algorithm**: Implements safety constraints and critical warnings
- **Visual Questionnaire**: Multi-step wizard with progress tracking
- **Detailed Recommendations**: Provides specific mask models, attachment methods, and accessories
- **Factor Explanation**: Shows how each answer influenced the recommendation
- **Single Server**: Everything runs on one local server - no complex deployment needed

---

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, set a different port:

```bash
PORT=3001 npm start
```

### Frontend Not Updating

Make sure you rebuild after making changes:

```bash
npm run build
```

### API Errors

Check the server console for error messages. The API runs on the same server, so CORS issues are eliminated.

---

## Algorithm Overview

The algorithm implements a 6-step decision process:

1. **Safety Check**: Validates critical safety constraints
2. **Primary Mask Type**: Determines initial mask category
3. **Strong Modifiers**: Applies claustrophobic, facial hair, and sleep position factors
4. **Moderate Modifiers**: Considers sleep movement, skin sensitivity, and adjustment issues
5. **Attachment Method**: Selects optimal headgear/attachment
6. **Accessory Selection**: Recommends necessary accessories

See `comprehensive-12factor-algorithm.md` for complete algorithm details.

---

## Technology Stack

- **Backend**: Node.js, Express
- **Frontend**: React 18
- **Server**: Single Express server serving both API and static files

---

## License

MIT

---

## Disclaimer

This tool is for informational purposes only. Please consult with a healthcare professional or CPAP specialist before making a final decision on CPAP mask selection. Individual results may vary.
