import React from 'react';
import './ErrorDisplay.css';

interface ErrorDisplayProps {
  error: string;
  onRetry?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry }) => {
  return (
    <div className="error-container">
      <p className="error-message">에러: {error}</p>
      {onRetry && (
        <button className="retry-button" onClick={onRetry}>
          다시 시도
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay; 