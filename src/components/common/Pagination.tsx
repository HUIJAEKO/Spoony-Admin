import React from 'react';
import { PaginationParams } from '../../types';
import './Pagination.css';

interface PaginationProps {
  pagination: PaginationParams;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pagination, onPageChange }) => {
  if (pagination.totalPages <= 1) return null;

  return (
    <div className="pagination-container">
      <button 
        className="pagination-button"
        onClick={() => onPageChange(pagination.page - 1)}
        disabled={pagination.page === 0}
      >
        이전
      </button>
      
      {Array.from({ length: pagination.totalPages }, (_, i) => (
        <button
          key={i}
          className={`pagination-button ${pagination.page === i ? 'active' : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i + 1}
        </button>
      ))}
      
      <button 
        className="pagination-button"
        onClick={() => onPageChange(pagination.page + 1)}
        disabled={pagination.page >= pagination.totalPages - 1}
      >
        다음
      </button>
    </div>
  );
};

export default Pagination; 