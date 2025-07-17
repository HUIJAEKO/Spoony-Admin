import React from 'react';
import { Post } from '../types';
import './PostCard.css';

interface PostCardProps {
  post: Post;
  onDelete?: (postId: string) => void;
  showDeleteButton?: boolean;
  showReportBadge?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, onDelete, showDeleteButton = true, showReportBadge = false }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // 디버깅용 로그
  console.log('Post data:', post);
  console.log('Post disappointment:', post.disappointment);
  console.log('Post title:', post.title);

  return (
    <div className={`post-card ${post.isReported ? 'reported' : ''}`}>
      <div className="post-header">
        <div className="post-info">
          <h3 className="post-title">{post.title}</h3>
          <div className="restaurant-name">
          </div>
          <div className="post-meta">
            <span className="author">작성자: {post.author}</span>
            <span className="date">{formatDate(post.createdAt)}</span>
            <span className="location">📍 {post.location}</span>
          </div>
        </div>
        {showDeleteButton && onDelete && (
          <button 
            className="delete-button"
            onClick={() => onDelete(post.id)}
            title="삭제"
          >
            🗑️
          </button>
        )}
      </div>
      
      <div className="post-content">
        <p>{post.content}</p>
      </div>

      {post.images.length > 0 && (
        <div className="post-images">
          {post.images.map((image, index) => (
            <img 
              key={index} 
              src={image} 
              alt={`이미지 ${index + 1}`}
              className="post-image"
            />
          ))}
        </div>
      )}

      {post.menus.length > 0 && (
        <div className="post-menus">
          <h4>메뉴</h4>
          <div className="menu-list">
            {post.menus.map(menu => (
              <div key={menu.id} className="menu-item">
                <span className="menu-name">{menu.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="disappointment-section">
        <h4>아쉬운점</h4>
        <p className="disappointment-text">{post.disappointment || '아쉬운점이 없습니다.'}</p>
      </div>

      {post.isReported && post.reports && post.reports.length > 0 && (
        <div className="post-reports">
          <h4>신고 정보</h4>
          <div className="report-list">
            {post.reports.map(report => (
              <div key={report.id} className="report-item">
                <div className="report-header">
                  <span className="report-type">{report.reportType}</span>
                  <span className="report-date">{formatDate(report.createdAt)}</span>
                </div>
                <div className="report-detail">
                  {report.reportDetail}
                </div>
                <div className="report-reporter">
                  <span className="reporter-label">신고자:</span>
                  <span className="reporter-name">{report.reporterName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {post.isReported && showReportBadge && (
        <div className="reported-badge">
          ⚠️ 신고됨 ({post.reportCount}회)
        </div>
      )}
    </div>
  );
};

export default PostCard; 