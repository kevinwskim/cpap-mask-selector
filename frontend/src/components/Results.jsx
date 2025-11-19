import React from 'react';
import './Results.css';

function Results({ recommendation, responses, onReset }) {
  const getMaskTypeLabel = (type) => {
    const labels = {
      'NASAL_MASK': 'Nasal Mask',
      'NASAL_PILLOWS': 'Nasal Pillows',
      'FULL_FACE': 'Full Face Mask'
    };
    return labels[type] || type;
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>Your CPAP Mask Recommendation</h2>
        <button onClick={onReset} className="btn-secondary">
          Start Over
        </button>
      </div>

      {/* Safety Warnings */}
      {recommendation.safetyFlags && recommendation.safetyFlags.length > 0 && (
        <div className="safety-warnings">
          <h3>⚠️ Safety Warnings</h3>
          {recommendation.safetyFlags.map((flag, index) => (
            <div key={index} className={`safety-flag ${flag.severity.toLowerCase()}`}>
              <strong>{flag.severity}:</strong> {flag.message}
            </div>
          ))}
        </div>
      )}

      {/* Primary Recommendation */}
      <div className="recommendation-section">
        <h3>Recommended Mask Type</h3>
        <div className="mask-type-card">
          <h4>{getMaskTypeLabel(recommendation.maskType)}</h4>
          <div className="success-rate">
            Expected Success Rate: <strong>{recommendation.successRate}</strong>
          </div>
        </div>
      </div>

      {/* Specific Models */}
      {recommendation.specificModels && recommendation.specificModels.length > 0 && (
        <div className="recommendation-section">
          <h3>Recommended Models</h3>
          <ul className="models-list">
            {recommendation.specificModels.map((model, index) => (
              <li key={index} className="model-item">
                {index === 0 && <span className="top-choice">Top Choice</span>}
                {model}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Alternative Models */}
      {recommendation.alternativeModels && recommendation.alternativeModels.length > 0 && (
        <div className="recommendation-section">
          <h3>Alternative Options</h3>
          <ul className="models-list">
            {recommendation.alternativeModels.map((model, index) => (
              <li key={index} className="model-item alternative">
                {model}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Attachment Method */}
      {recommendation.attachment && (
        <div className="recommendation-section">
          <h3>Attachment Method</h3>
          <div className="attachment-card">
            <h4>{recommendation.attachment.type}</h4>
            <p className="attachment-reason">{recommendation.attachment.reason}</p>
            {recommendation.attachment.score >= 90 && (
              <span className="high-priority">High Priority</span>
            )}
          </div>

          {recommendation.attachmentAlternatives && recommendation.attachmentAlternatives.length > 0 && (
            <div className="alternatives">
              <h4>Alternative Attachments:</h4>
              <ul>
                {recommendation.attachmentAlternatives.map((alt, index) => (
                  <li key={index}>
                    <strong>{alt.type}</strong> - {alt.reason}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Accessories */}
      {recommendation.accessories && recommendation.accessories.length > 0 && (
        <div className="recommendation-section">
          <h3>Recommended Accessories</h3>
          <div className="accessories-list">
            {recommendation.accessories.map((accessory, index) => (
              <div key={index} className={`accessory-item ${accessory.priority?.toLowerCase().replace(' ', '-')}`}>
                <div className="accessory-header">
                  <h4>{accessory.item}</h4>
                  {accessory.priority && (
                    <span className={`priority-badge ${accessory.priority.toLowerCase().replace(' ', '-')}`}>
                      {accessory.priority}
                    </span>
                  )}
                </div>
                <p className="accessory-reason">{accessory.reason}</p>
                {accessory.safetyNote && (
                  <p className="safety-note">⚠️ {accessory.safetyNote}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Factor Influence Summary */}
      {recommendation.modificationNotes && recommendation.modificationNotes.length > 0 && (
        <div className="recommendation-section">
          <h3>How Your Answers Influenced This Recommendation</h3>
          <div className="factor-summary">
            {recommendation.modificationNotes.map((note, index) => (
              <div key={index} className="factor-note">
                <div className="factor-header">
                  <strong>{note.factor}</strong>
                  {note.weight && <span className="weight-badge">Weight: {note.weight}</span>}
                </div>
                {note.change && <p><strong>Change:</strong> {note.change}</p>}
                {note.rationale && <p><strong>Reason:</strong> {note.rationale}</p>}
                {note.warning && <p className="warning-text">⚠️ {note.warning}</p>}
                {note.contraindication && (
                  <p className="contraindication">❌ {note.contraindication}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Factor Count Summary */}
      {recommendation.factorInfluence && (
        <div className="recommendation-section">
          <h3>Factor Influence Summary</h3>
          <div className="factor-count">
            <p>
              <strong>{recommendation.factorInfluence.maskType}</strong> factors influenced mask type selection
            </p>
            <p>
              <strong>{recommendation.factorInfluence.attachment}</strong> factors influenced attachment selection
            </p>
            <p>
              <strong>{recommendation.factorInfluence.accessories}</strong> factors influenced accessory requirements
            </p>
          </div>
        </div>
      )}

      <div className="results-footer">
        <p className="disclaimer">
          <strong>Disclaimer:</strong> This recommendation is based on the information you provided. 
          Please consult with a healthcare professional or CPAP specialist before making a final decision. 
          Individual results may vary.
        </p>
      </div>
    </div>
  );
}

export default Results;

