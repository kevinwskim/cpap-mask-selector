import React, { useState } from 'react';
import Questionnaire from './components/Questionnaire';
import Results from './components/Results';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function App() {
  const [responses, setResponses] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formResponses) => {
    setLoading(true);
    setError(null);
    setResponses(formResponses);

    try {
      const response = await fetch(`${API_URL}/api/recommend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formResponses),
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendation');
      }

      const data = await response.json();
      setRecommendation(data.recommendation);
    } catch (err) {
      console.error('Error:', err);
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
            <button onClick={handleReset} className="btn-primary">
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

