const express = require('express');
const cors = require('cors');
const path = require('path');
const QRCode = require('qrcode');
const { calculateMaskRecommendation } = require('./algorithm');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CPAP Mask Selector API is running' });
});

app.post('/api/recommend', (req, res) => {
  try {
    const responses = req.body;
    
    // Validate required fields
    if (!responses) {
      return res.status(400).json({ error: 'No responses provided' });
    }
    
    // Calculate recommendation
    const recommendation = calculateMaskRecommendation(responses);
    
    res.json({
      success: true,
      recommendation
    });
  } catch (error) {
    console.error('Error calculating recommendation:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to calculate recommendation',
      message: error.message
    });
  }
});

// Serve mask images
app.use('/detail', express.static(path.join(__dirname, '../detail')));

// QR Code generation endpoint
app.get('/api/qrcode', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'URL parameter required' });
    }
    
    const qrCodeDataURL = await QRCode.toDataURL(url, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      width: 300,
      margin: 1
    });
    
    res.json({ qrCode: qrCodeDataURL });
  } catch (error) {
    console.error('QR Code generation error:', error);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

// Serve static files from React build
const buildPath = path.join(__dirname, '../frontend/build');
app.use(express.static(buildPath));

// Serve React app for all non-API routes
app.get('*', (req, res) => {
  // Don't serve index.html for API routes
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('CPAP Mask Selector - Local Server');
  console.log('='.repeat(50));
  console.log(`Server running on: http://localhost:${PORT}`);
  console.log(`API Health: http://localhost:${PORT}/api/health`);
  console.log('='.repeat(50));
});

