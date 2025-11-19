import React, { useState, useEffect } from 'react';
import './MaskCard.css';

function MaskCard({ mask, isTopChoice }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [loadingQR, setLoadingQR] = useState(false);

  useEffect(() => {
    if (isExpanded && mask.address && !qrCode) {
      loadQRCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded, mask.address]);

  const loadQRCode = async () => {
    if (!mask.address) return;
    
    setLoadingQR(true);
    try {
      const response = await fetch(`/api/qrcode?url=${encodeURIComponent(mask.address)}`);
      const data = await response.json();
      setQrCode(data.qrCode);
    } catch (error) {
      console.error('Failed to load QR code:', error);
    } finally {
      setLoadingQR(false);
    }
  };

  return (
    <div className="mask-card">
      <div className="mask-card-header">
        <div className="mask-title-section">
          {mask.imagePath ? (
            <img 
              src={encodeURI(mask.imagePath)} 
              alt={mask.name || mask.model || 'CPAP Mask'}
              className="mask-image"
              onError={(e) => {
                console.error('Image failed to load:', mask.imagePath);
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <div className="mask-image-placeholder">
              <span>No Image</span>
            </div>
          )}
          <div className="mask-title-info">
            <h5>{mask.name}</h5>
            {isTopChoice && <span className="top-choice">Top Choice</span>}
          </div>
        </div>
      </div>

      <p className="mask-description">
        {mask.description || mask.design ? `${mask.design || ''} ${mask.type || 'mask'}`.trim() : `${mask.name || mask.model || 'CPAP Mask'}`}
      </p>

      {mask.keyFeatures && mask.keyFeatures.length > 0 && (
        <div className="mask-features">
          <strong>Key Features:</strong>
          <ul>
            {mask.keyFeatures.slice(0, 3).map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        className="expand-button"
        onClick={() => setIsExpanded(!isExpanded)}
        type="button"
      >
        {isExpanded ? '▼ Hide Details' : '▶ Why This Mask? (Click for Details)'}
      </button>

      {isExpanded && (
        <div className="mask-details-expanded">
          <div className="selection-explanation">
            <strong>Why this mask was selected:</strong>
            <p>{mask.selectionReason || mask.selectionExplanation || 'This mask matches your specific needs based on your questionnaire responses.'}</p>
          </div>

          {mask.bestFor && mask.bestFor.length > 0 && (
            <div className="best-for-section">
              <strong>Best For:</strong>
              <ul>
                {mask.bestFor.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {mask.address && (
            <div className="qr-code-section">
              <strong>Scan QR code for more details:</strong>
              <div className="qr-code-container">
                {loadingQR ? (
                  <div className="qr-loading">Loading QR code...</div>
                ) : qrCode ? (
                  <img src={qrCode} alt="QR Code" className="qr-code-image" />
                ) : (
                  <div className="qr-error">QR code unavailable</div>
                )}
              </div>
              <a 
                href={mask.address} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mask-link"
              >
                View Full Details →
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MaskCard;

