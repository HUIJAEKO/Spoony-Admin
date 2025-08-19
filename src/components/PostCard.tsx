import React from 'react';
import { Post } from '../types';
import { getReportTypeKorean } from '../utils/reportTypeUtils';
import { formatDate } from '../utils/dateUtils';
import './PostCard.css';

/**
 * PostCard 컴포넌트의 props 인터페이스
 */
interface PostCardProps {
  post: Post;
  onDelete?: (postId: string) => void;
  onRestore?: (postId: string) => void;
  showDeleteButton?: boolean;
  showRestoreButton?: boolean;
  showReportBadge?: boolean;
  showDeletedDate?: boolean;
  deleteButtonDisabled?: boolean;
  restoreButtonDisabled?: boolean;
  deleteButtonText?: string;
  restoreButtonText?: string;
}

/**
 * 게시글 정보를 카드 형태로 표시하는 컴포넌트
 * @param post 게시글 정보
 * @param onDelete 삭제 핸들러 함수
 * @param onRestore 복구 핸들러 함수
 * @param showDeleteButton 삭제 버튼 표시 여부 (기본값: true)
 * @param showRestoreButton 복구 버튼 표시 여부 (기본값: false)
 * @param showReportBadge 신고 배지 표시 여부 (기본값: false)
 * @param deleteButtonDisabled 삭제 버튼 비활성화 여부 (기본값: false)
 * @param restoreButtonDisabled 복구 버튼 비활성화 여부 (기본값: false)
 * @param deleteButtonText 삭제 버튼 텍스트 (기본값: "🗑️")
 * @param restoreButtonText 복구 버튼 텍스트 (기본값: "🔄")
 * @returns 게시글 카드 JSX
 */
const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  onDelete, 
  onRestore,
  showDeleteButton = true, 
  showRestoreButton = false,
  showReportBadge = false,
  showDeletedDate = false,
  deleteButtonDisabled = false,
  restoreButtonDisabled = false,
  deleteButtonText = "🗑️",
  restoreButtonText = "🔄"
}) => {

  return (
    <div className={`post-card ${post.isReported ? 'reported' : ''}`}>
      {/* 게시글 헤더 */}
      <div className="post-header">
        <div className="post-info">
          <h3 className="post-title">{post.restaurantName}</h3>
          <div className="restaurant-name">
          </div>
          <div className="post-meta">
            <span className="author">작성자: {post.authorName}</span>
            <span className="date">{formatDate(post.createdAt)}</span>
            <span className="location">📍 {post.location}</span>
            {showDeletedDate && post.deletedAt && (
              <span className="deleted-date">삭제 시간 : {formatDate(post.deletedAt)}</span>
            )}
          </div>
        </div>
        {/* 액션 버튼들 */}
        <div className="action-buttons">
          {/* 복구 버튼 */}
          {showRestoreButton && onRestore && (
            <button 
              className={`restore-button ${restoreButtonText === "🔄" ? "icon-button" : ""}`}
              onClick={() => onRestore(post.postId)}
              disabled={restoreButtonDisabled}
              title="복구"
            >
              {restoreButtonText}
            </button>
          )}
          {/* 삭제 버튼 */}
          {showDeleteButton && onDelete && (
            <button 
              className={`delete-button ${deleteButtonText === "🗑️" ? "icon-button" : ""}`}
              onClick={() => onDelete(post.postId)}
              disabled={deleteButtonDisabled}
              title="삭제"
            >
              {deleteButtonText}
            </button>
          )}
        </div>
      </div>
      
      {/* 게시글 내용 */}
      <div className="post-content">
        <p>{post.content}</p>
      </div>

      {/* 게시글 이미지 */}
      {post.imageUrls.length > 0 && (
        <div className="post-images">
          {post.imageUrls.map((image: string, index: number) => (
            <img 
              key={index} 
              src={image} 
              alt={`이미지 ${index + 1}`}
              className="post-image"
            />
          ))}
        </div>
      )}

      {/* 메뉴 정보 */}
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

      {/* 아쉬운점 섹션 */}
      <div className="disappointment-section">
        <h4>아쉬운점</h4>
        <p className="disappointment-text">{post.disappointment || '아쉬운점이 없습니다.'}</p>
      </div>

      {/* 신고 정보 */}
      {post.isReported && post.reports && post.reports.length > 0 && (
        <div className="post-reports">
          <h4>신고 정보</h4>
          <div className="report-list">
            {post.reports.map(report => (
              <div key={report.id} className="report-item">
                <div className="report-header">
                  <span className="report-type">{getReportTypeKorean(report.reportType)}</span>
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

      {/* 신고 배지 */}
      {post.isReported && showReportBadge && (
        <div className="reported-badge">
          ⚠️ 신고됨 ({post.reportCount}회)
        </div>
      )}
    </div>
  );
};

export default PostCard; 