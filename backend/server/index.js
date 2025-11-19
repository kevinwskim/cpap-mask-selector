const express = require('express');
const cors = require('cors');
const { calculateMaskRecommendation } = require('./algorithm');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'CPAP Mask Selector API is running' });
});

// Main recommendation endpoint
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

// Start server
app.listen(PORT, () => {
  console.log(`CPAP Mask Selector API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

