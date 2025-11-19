import React, { useState } from 'react';
import QuestionStep from './QuestionStep';
import ProgressBar from './ProgressBar';
import './Questionnaire.css';

const QUESTIONS = [
  {
    id: 'breathing',
    question: 'How do you primarily breathe during sleep?',
    type: 'radio',
    options: [
      { value: 'nose_only', label: 'Nose only' },
      { value: 'mouth_only', label: 'Mouth only' },
      { value: 'mixed', label: 'Mixed (both nose and mouth)' }
    ],
    required: true
  },
  {
    id: 'nasal',
    question: 'Do you have any nasal obstruction or issues?',
    type: 'radio',
    options: [
      { value: 'no_obstruction', label: 'No obstruction' },
      { value: 'mild_obstruction', label: 'Mild obstruction' },
      { value: 'severe_obstruction', label: 'Severe obstruction' },
      { value: 'deviated_septum', label: 'Deviated septum' },
      { value: 'seasonal_allergies', label: 'Seasonal allergies' }
    ],
    required: true
  },
  {
    id: 'sleepPosition',
    question: 'What is your primary sleep position?',
    type: 'radio',
    options: [
      { value: 'back', label: 'Back' },
      { value: 'side', label: 'Side' },
      { value: 'stomach', label: 'Stomach' },
      { value: 'sitting', label: 'Sitting upright' }
    ],
    required: true
  },
  {
    id: 'sleepMovement',
    question: 'How much do you move during sleep?',
    type: 'radio',
    options: [
      { value: 'none', label: 'Very little movement' },
      { value: 'some', label: 'Some movement' },
      { value: 'all_the_time', label: 'Move all the time' }
    ],
    required: true
  },
  {
    id: 'claustrophobic',
    question: 'Do you experience claustrophobia or discomfort with things covering your face?',
    type: 'radio',
    options: [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' }
    ],
    required: true
  },
  {
    id: 'facialHair',
    question: 'Do you have facial hair (beard, mustache)?',
    type: 'radio',
    options: [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' }
    ],
    required: true
  },
  {
    id: 'adjustment',
    question: 'Do you have difficulty adjusting straps or headgear (arthritis, dexterity issues)?',
    type: 'radio',
    options: [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' }
    ],
    required: true
  },
  {
    id: 'implant',
    question: 'Do you have any medical implants (pacemaker, defibrillator, etc.)?',
    type: 'radio',
    options: [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' }
    ],
    required: true
  },
  {
    id: 'eye',
    question: 'Do you have eye issues or severe acid reflux that could cause aspiration?',
    type: 'radio',
    options: [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' }
    ],
    required: true,
    warning: 'This is a safety-critical question'
  },
  {
    id: 'drug',
    question: 'Do you take medications that cause vomiting or nausea?',
    type: 'radio',
    options: [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' }
    ],
    required: true,
    warning: 'This is a safety-critical question'
  },
  {
    id: 'assistant',
    question: 'Do you require assistance to remove the mask in an emergency?',
    type: 'radio',
    options: [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' }
    ],
    required: true,
    warning: 'This is a safety-critical question'
  },
  {
    id: 'skinSensitivity',
    question: 'Do you have sensitive skin or allergies to silicone/materials?',
    type: 'radio',
    options: [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' }
    ],
    required: true
  }
];

function Questionnaire({ onSubmit }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [errors, setErrors] = useState({});

  const handleAnswer = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
    // Clear error for this question
    if (errors[questionId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const handleNext = () => {
    const currentQuestion = QUESTIONS[currentStep];
    
    // Validate current question
    if (currentQuestion.required && responses[currentQuestion.id] === undefined) {
      setErrors(prev => ({
        ...prev,
        [currentQuestion.id]: 'Please answer this question to continue'
      }));
      return;
    }

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Last question - submit
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Final validation
    const missing = QUESTIONS.filter(q => q.required && responses[q.id] === undefined);
    if (missing.length > 0) {
      const newErrors = {};
      missing.forEach(q => {
        newErrors[q.id] = 'This question is required';
      });
      setErrors(newErrors);
      // Go to first missing question
      const firstMissingIndex = QUESTIONS.findIndex(q => q.id === missing[0].id);
      setCurrentStep(firstMissingIndex);
      return;
    }

    onSubmit(responses);
  };

  const currentQuestion = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  return (
    <div className="questionnaire-container">
      <ProgressBar progress={progress} current={currentStep + 1} total={QUESTIONS.length} />
      
      <div className="question-wrapper">
        <QuestionStep
          question={currentQuestion}
          value={responses[currentQuestion.id]}
          onChange={(value) => handleAnswer(currentQuestion.id, value)}
          error={errors[currentQuestion.id]}
        />
      </div>

      <div className="questionnaire-navigation">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="btn-secondary"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="btn-primary"
        >
          {currentStep === QUESTIONS.length - 1 ? 'Get Recommendation' : 'Next'}
        </button>
      </div>
    </div>
  );
}

export default Questionnaire;

