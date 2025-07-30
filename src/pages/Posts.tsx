import React from 'react';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorDisplay from '../components/common/ErrorDisplay';
import Pagination from '../components/common/Pagination';
import { usePosts } from '../hooks/usePosts';
import { useDeletePost } from '../hooks/useDeletePost';
import { PAGINATION } from '../constants/pagination';
import './Posts.css';

/**
 * 전체 게시글 목록을 표시하는 페이지 컴포넌트
 * @returns 게시글 목록 페이지 JSX
 */
const Posts: React.FC = () => {
  // 게시글 목록 관련 훅
  const { posts, loading, error, pagination, fetchPosts, handlePageChange } = usePosts(PAGINATION.LARGE_PAGE_SIZE);
  // 게시글 삭제 관련 훅
  const { handleDelete } = useDeletePost();

  /**
   * 게시글 삭제 성공 후 목록 새로고침
   */
  const onDeleteSuccess = () => {
    fetchPosts(pagination.page, pagination.size);
  };

  // 로딩 중일 때 스피너 표시
  if (loading) {
    return <LoadingSpinner message="게시글을 불러오는 중..." />;
  }

  // 에러 발생 시 에러 표시
  if (error) {
    return <ErrorDisplay error={error} onRetry={() => fetchPosts()} />;
  }

  // 신고된 게시글 개수 계산
  const reportedPostsCount = posts.filter(post => post.isReported).length;

  return (
    <div className="posts-container">
      {/* 페이지 헤더 */}
      <div className="posts-header">
        <h2>전체 글 목록</h2>
        <div className="posts-stats">
          <span className="total-count">총 {pagination.total}개의 글</span>
          {reportedPostsCount > 0 && (
            <span className="reported-count">
              신고된 글 {reportedPostsCount}개
            </span>
          )}
        </div>
      </div>
      
      {/* 게시글 목록 */}
      <div className="posts-content">
        {posts.length === 0 ? (
          <p className="no-posts">글이 없습니다.</p>
        ) : (
          posts.map(post => (
            <PostCard 
              key={post.postId} 
              post={post} 
              onDelete={(postId) => handleDelete(postId, onDeleteSuccess)}
              showDeleteButton={true}
              showReportBadge={true}
            />
          ))
        )}
      </div>

      {/* 페이지네이션 */}
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
};

export default Posts; 