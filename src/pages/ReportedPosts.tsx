import React from 'react';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorDisplay from '../components/common/ErrorDisplay';
import Pagination from '../components/common/Pagination';
import { useReportedPosts, usePostActions } from '../hooks';
import { PAGINATION } from '../constants/pagination';
import './ReportedPosts.css';

/**
 * 신고된 게시글 목록을 표시하는 페이지 컴포넌트
 * @returns 신고된 게시글 목록 페이지 JSX
 */
const ReportedPosts: React.FC = () => {
  // 신고된 게시글 목록 관련 훅
  const { posts, loading, error, pagination, fetchReportedPosts, handlePageChange } = useReportedPosts(PAGINATION.LARGE_PAGE_SIZE);
  // 게시글 액션 관련 훅 (논리적 삭제)
  const { handleDeletePost, loading: actionLoading, error: actionError } = usePostActions();

  /**
   * 게시글 논리적 삭제 처리
   */
  const handleDelete = async (postId: string) => {
    if (window.confirm('이 게시글을 삭제하시겠습니까? 삭제된 글은 삭제된 글 목록에서 확인할 수 있습니다.')) {
      const success = await handleDeletePost(postId);
      if (success) {
        fetchReportedPosts(pagination.page, pagination.size);
      }
    }
  };

  // 로딩 중일 때 스피너 표시
  if (loading) {
    return <LoadingSpinner message="신고된 글을 불러오는 중..." />;
  }

  // 에러 발생 시 에러 표시
  if (error) {
    return <ErrorDisplay error={error} onRetry={() => fetchReportedPosts()} />;
  }

  return (
    <div className="reported-posts-container">
      {/* 페이지 헤더 */}
      <div className="reported-posts-header">
        <h2>신고된 글 목록</h2>
        <span className="reported-count">총 {posts.length}개의 신고된 글</span>
      </div>
      
      {/* 신고된 게시글 목록 */}
      <div className="reported-posts-content">
        {posts.length === 0 ? (
          <p className="no-posts">신고된 글이 없습니다.</p>
        ) : (
          posts.map(post => (
            <PostCard 
              key={post.postId} 
              post={post} 
              onDelete={handleDelete}
              showDeleteButton={true}
              showReportBadge={true}
              deleteButtonDisabled={actionLoading}
            />
          ))
        )}
      </div>

      {/* 페이지네이션 */}
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
};

export default ReportedPosts; 