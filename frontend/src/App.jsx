import React, { useState } from 'react';
import Questionnaire from './components/Questionnaire';
import Results from './components/Results';
import './App.css';

function App() {
  const [responses, setResponses] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  const handleSubmit = async (formResponses) => {
    setLoading(true);
    setError(null);
    setResponses(formResponses);

    try {
      // Check if API URL is configured
      if (apiUrl.includes('localhost')) {
        throw new Error('Backend API URL not configured. Please set REACT_APP_API_URL environment variable in Vercel.');
      }

      const response = await fetch(`${apiUrl}/api/recommend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formResponses),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to get recommendation: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      setRecommendation(data.recommendation);
    } catch (err) {
      console.error('Error:', err);
      console.error('API URL:', apiUrl);
      setError(err.message || 'Failed to calculate recommendation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResponses(null);
    setRecommendation(null);
    setError(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>CPAP Mask Selector</h1>
        <p>Find the perfect CPAP mask for your needs</p>
      </header>

      <main className="App-main">
        {!recommendation && !loading && (
          <Questionnaire onSubmit={handleSubmit} />
        )}

        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Analyzing your responses...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <h2>Error</h2>
            <p>{error}</p>
            {apiUrl.includes('localhost') && (
              <div style={{ marginTop: '1rem', padding: '1rem', background: '#fff3cd', borderRadius: '5px' }}>
                <strong>Configuration Issue:</strong>
                <p style={{ marginTop: '0.5rem' }}>
                  The backend API URL is not configured. Please:
                </p>
                <ol style={{ textAlign: 'left', marginTop: '0.5rem' }}>
                  <li>Deploy your backend to Railway or Render</li>
                  <li>In Vercel, go to Settings → Environment Variables</li>
                  <li>Add: <code>REACT_APP_API_URL</code> = your backend URL</li>
                  <li>Redeploy the frontend</li>
                </ol>
              </div>
            )}
            <button onClick={handleReset} className="btn-primary" style={{ marginTop: '1rem' }}>
              Try Again
            </button>
          </div>
        )}

        {recommendation && !loading && (
          <Results 
            recommendation={recommendation} 
            responses={responses}
            onReset={handleReset}
          />
        )}
      </main>

      <footer className="App-footer">
        <p>This tool is for informational purposes only. Please consult with a healthcare professional.</p>
      </footer>
    </div>
  );
}

export default App;

