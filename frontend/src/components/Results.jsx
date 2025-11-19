import React, { useRef } from 'react';
import MaskCard from './MaskCard';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Results.css';

function Results({ recommendation, responses, onReset }) {
  const resultsRef = useRef(null);

  const getMaskTypeLabel = (type) => {
    const labels = {
      'NASAL_MASK': 'Nasal Mask',
      'NASAL_PILLOWS': 'Nasal Pillows',
      'FULL_FACE': 'Full Face Mask'
    };
    return labels[type] || type;
  };

  // Helper to find mask by name in specificModels
  const findMaskByName = (modelName) => {
    if (!recommendation.maskExamples) return null;
    
    // Try to find in maskExamples
    const allMasks = [
      ...(recommendation.maskExamples.resmed || []),
      ...(recommendation.maskExamples.philips || [])
    ];
    
    // Extract base name (remove accessories like "+ Fabric Liners")
    const baseName = modelName.split('+')[0].trim();
    
    return allMasks.find(mask => 
      mask.name.includes(baseName) || 
      mask.model === baseName ||
      baseName.includes(mask.model)
    );
  };

  const exportToPDF = async () => {
    if (!resultsRef.current) {
      alert('Error: Results content not found');
      return;
    }

    try {
      // Show loading state
      const exportButton = document.querySelector('.btn-export');
      const originalText = exportButton?.textContent;
      if (exportButton) {
        exportButton.textContent = '⏳ Generating PDF...';
        exportButton.disabled = true;
      }

      // Ensure element is visible
      const element = resultsRef.current;
      if (!element || element.offsetWidth === 0 || element.offsetHeight === 0) {
        throw new Error('Results content is not visible');
      }

      // Wait for all images to load
      const images = element.querySelectorAll('img');
      const imagePromises = Array.from(images).map((img) => {
        if (img.complete && img.naturalHeight !== 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          const timeout = setTimeout(resolve, 3000); // 3 second timeout
          img.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          img.onerror = () => {
            clearTimeout(timeout);
            resolve(); // Continue even if image fails
          };
        });
      });
      await Promise.all(imagePromises);

      // Scroll to top to ensure all content is visible
      window.scrollTo(0, 0);
      await new Promise(resolve => setTimeout(resolve, 300));

      // Get actual dimensions
      const width = element.scrollWidth || element.offsetWidth;
      const height = element.scrollHeight || element.offsetHeight;

      if (width === 0 || height === 0) {
        throw new Error('Content has zero dimensions');
      }

      // Capture with html2canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
        backgroundColor: '#ffffff',
        width: width,
        height: height,
        windowWidth: width,
        windowHeight: height,
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc) => {
          // Ensure all styles are applied in the cloned document
          const clonedElement = clonedDoc.querySelector('.results-container');
          if (clonedElement) {
            clonedElement.style.visibility = 'visible';
            clonedElement.style.display = 'block';
          }
        }
      });

      // Check if canvas has content
      if (!canvas || canvas.width === 0 || canvas.height === 0) {
        throw new Error('Canvas capture failed - canvas is empty');
      }

      const imgData = canvas.toDataURL('image/png', 1.0);
      
      // Check if image data is valid
      if (!imgData || imgData === 'data:,') {
        throw new Error('Failed to generate image data from canvas');
      }

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm
      const margin = 10; // 10mm margin
      const contentWidth = pdfWidth - (margin * 2);
      const contentHeight = pdfHeight - (margin * 2);
      
      // Calculate image dimensions to fit within margins
      const imgWidth = contentWidth;
      const imgHeight = (canvas.height * contentWidth) / canvas.width;
      
      let position = margin;
      let remainingHeight = imgHeight;

      // Add first page
      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      remainingHeight -= contentHeight;

      // Add additional pages if needed
      while (remainingHeight > 0) {
        position = margin - (imgHeight - remainingHeight);
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        remainingHeight -= contentHeight;
      }

      const fileName = `CPAP_Mask_Recommendation_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

      // Restore button
      if (exportButton) {
        exportButton.textContent = originalText || '📄 Export PDF';
        exportButton.disabled = false;
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        element: resultsRef.current,
        elementWidth: resultsRef.current?.offsetWidth,
        elementHeight: resultsRef.current?.offsetHeight
      });
      alert(`Failed to generate PDF: ${error.message}\n\nPlease check the browser console for more details.`);
      
      // Restore button
      const exportButton = document.querySelector('.btn-export');
      if (exportButton) {
        exportButton.textContent = '📄 Export PDF';
        exportButton.disabled = false;
      }
    }
  };

  return (
    <div className="results-container" ref={resultsRef}>
      <div className="results-header">
        <h2>Your CPAP Mask Recommendation</h2>
        <div className="header-buttons">
          <button onClick={exportToPDF} className="btn-export">
            📄 Export PDF
          </button>
          <button onClick={onReset} className="btn-secondary">
            Start Over
          </button>
        </div>
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
          <h4>{recommendation.maskTypeLabel || getMaskTypeLabel(recommendation.maskType)}</h4>
          <div className="success-rate">
            Expected Success Rate: <strong>{recommendation.successRate}</strong>
          </div>
        </div>
      </div>

      {/* Specific ResMed and Philips Examples */}
      {recommendation.maskExamples && (
        <div className="recommendation-section">
          <h3>Recommended Mask Models</h3>
          
          {recommendation.maskExamples.resmed && recommendation.maskExamples.resmed.length > 0 && (
            <div className="brand-section">
              <h4 className="brand-header">ResMed Masks</h4>
              <div className="mask-examples-list">
                {recommendation.maskExamples.resmed.map((mask, index) => (
                  <MaskCard 
                    key={index} 
                    mask={mask} 
                    isTopChoice={index === 0}
                  />
                ))}
              </div>
            </div>
          )}

          {recommendation.maskExamples.philips && recommendation.maskExamples.philips.length > 0 && (
            <div className="brand-section">
              <h4 className="brand-header">Philips Masks</h4>
              <div className="mask-examples-list">
                {recommendation.maskExamples.philips.map((mask, index) => (
                  <MaskCard 
                    key={index} 
                    mask={mask} 
                    isTopChoice={index === 0 && (!recommendation.maskExamples.resmed || recommendation.maskExamples.resmed.length === 0)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Specific Models - Convert to MaskCards if possible */}
      {recommendation.specificModels && recommendation.specificModels.length > 0 && 
       (!recommendation.maskExamples || 
        (recommendation.maskExamples.resmed.length === 0 && recommendation.maskExamples.philips.length === 0)) && (
        <div className="recommendation-section">
          <h3>Recommended Models</h3>
          <div className="mask-examples-list">
            {recommendation.specificModels.map((modelName, index) => {
              const mask = findMaskByName(modelName);
              if (mask) {
                return (
                  <MaskCard 
                    key={index} 
                    mask={mask} 
                    isTopChoice={index === 0}
                  />
                );
              }
              // Fallback to text if mask not found
              return (
                <div key={index} className="mask-card">
                  <div className="mask-card-header">
                    <h5>
                      {index === 0 && <span className="top-choice">Top Choice</span>}
                      {modelName}
                    </h5>
                  </div>
                </div>
              );
            })}
          </div>
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

      {/* Detailed Factor Influence Summary */}
      {recommendation.factorInfluence && recommendation.factorInfluence.details && (
        <div className="recommendation-section">
          <h3>Factor Influence Summary</h3>
          
          {recommendation.factorInfluence.details.maskType && recommendation.factorInfluence.details.maskType.length > 0 && (
            <div className="factor-category">
              <h4>Mask Type Factors ({recommendation.factorInfluence.maskType})</h4>
              <div className="factor-details-list">
                {recommendation.factorInfluence.details.maskType.map((factor, index) => (
                  <div key={index} className="factor-detail-item">
                    <div className="factor-detail-header">
                      <strong>{factor.factor}</strong>
                      <span className="factor-value">{factor.value}</span>
                    </div>
                    <p className="factor-reason">{factor.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {recommendation.factorInfluence.details.attachment && recommendation.factorInfluence.details.attachment.length > 0 && (
            <div className="factor-category">
              <h4>Attachment Factors ({recommendation.factorInfluence.attachment})</h4>
              <div className="factor-details-list">
                {recommendation.factorInfluence.details.attachment.map((factor, index) => (
                  <div key={index} className="factor-detail-item">
                    <div className="factor-detail-header">
                      <strong>{factor.factor}</strong>
                      <span className="factor-value">{factor.value}</span>
                    </div>
                    <p className="factor-reason">{factor.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {recommendation.factorInfluence.details.accessories && recommendation.factorInfluence.details.accessories.length > 0 && (
            <div className="factor-category">
              <h4>Accessory Factors ({recommendation.factorInfluence.accessories})</h4>
              <div className="factor-details-list">
                {recommendation.factorInfluence.details.accessories.map((factor, index) => (
                  <div key={index} className="factor-detail-item">
                    <div className="factor-detail-header">
                      <strong>{factor.factor}</strong>
                      <span className="factor-value">{factor.value}</span>
                    </div>
                    <p className="factor-reason">{factor.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
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

