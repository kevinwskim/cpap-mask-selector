import React from 'react';
import './QuestionStep.css';

function QuestionStep({ question, value, onChange, error }) {
  const handleChange = (optionValue) => {
    onChange(optionValue);
  };

  return (
    <div className="question-step">
      <div className="question-header">
        <h2 className="question-text">{question.question}</h2>
        {question.warning && (
          <div className="warning-badge">Safety Critical</div>
        )}
      </div>

      {error && (
        <div className="error-message">{error}</div>
      )}

      <div className="options-container">
        {question.options.map((option) => {
          const isSelected = value === option.value;
          return (
            <label
              key={option.value}
              className={`option-label ${isSelected ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name={question.id}
                value={option.value}
                checked={isSelected}
                onChange={() => handleChange(option.value)}
                className="option-input"
              />
              <span className="option-text">{option.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default QuestionStep;

