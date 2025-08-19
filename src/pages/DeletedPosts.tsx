import React from 'react';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorDisplay from '../components/common/ErrorDisplay';
import Pagination from '../components/common/Pagination';
import { useDeletedPosts, usePostActions, usePermanentDelete } from '../hooks';
import { PAGINATION } from '../constants/pagination';
import { showSuccessAlert, showErrorAlert } from '../utils/alertUtils';
import './DeletedPosts.css';

/**
 * 삭제된 게시글 목록을 표시하는 페이지 컴포넌트
 * @returns 삭제된 게시글 목록 페이지 JSX
 */
const DeletedPosts: React.FC = () => {
  // 삭제된 게시글 목록 관련 훅
  const { posts, loading, error, pagination, handlePageChange, refreshPosts } = useDeletedPosts();
  // 게시글 액션 관련 훅 (복구)
  const { handleRestorePost, loading: actionLoading, error: actionError } = usePostActions();
  // 물리적 삭제 관련 훅
  const { handlePermanentDelete, loading: permanentDeleteLoading, error: permanentDeleteError } = usePermanentDelete();

  /**
   * 게시글 복구 처리
   */
  const handleRestore = async (postId: string) => {
    if (window.confirm('이 게시글을 복구하시겠습니까?')) {
      const success = await handleRestorePost(postId);
      if (success) {
        showSuccessAlert('게시글이 복구되었습니다.');
        refreshPosts();
      } else {
        showErrorAlert(actionError || '게시글 복구에 실패했습니다.');
      }
    }
  };

  /**
   * 게시글 물리적 삭제 처리
   */
  const handlePermanentDeleteAction = async (postId: string) => {
    if (window.confirm('이 게시글을 영구적으로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      const success = await handlePermanentDelete(postId);
      if (success) {
        showSuccessAlert('게시글이 영구적으로 삭제되었습니다.');
        refreshPosts();
      } else {
        showErrorAlert(permanentDeleteError || '게시글 영구 삭제에 실패했습니다.');
      }
    }
  };

  // 로딩 중일 때 스피너 표시
  if (loading) {
    return <LoadingSpinner message="삭제된 글을 불러오는 중..." />;
  }

  // 에러 발생 시 에러 표시
  if (error) {
    return <ErrorDisplay error={error} onRetry={refreshPosts} />;
  }

  return (
    <div className="deleted-posts-container">
      {/* 페이지 헤더 */}
      <div className="deleted-posts-header">
        <h2>삭제된 글 목록</h2>
        <span className="deleted-count">총 {posts.length}개의 삭제된 글</span>
      </div>
      
      {/* 삭제된 게시글 목록 */}
      <div className="deleted-posts-content">
        {posts.length === 0 ? (
          <p className="no-posts">삭제된 글이 없습니다.</p>
        ) : (
          posts.map(post => (
            <PostCard 
              key={post.postId} 
              post={post} 
              onDelete={handlePermanentDeleteAction}
              onRestore={handleRestore}
              showDeleteButton={true}
              showRestoreButton={true}
              showReportBadge={false}
              showDeletedDate={true}
              deleteButtonDisabled={permanentDeleteLoading}
              restoreButtonDisabled={actionLoading}
              deleteButtonText="영구삭제"
              restoreButtonText="복구"
            />
          ))
        )}
      </div>

      {/* 페이지네이션 */}
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
};

export default DeletedPosts;
