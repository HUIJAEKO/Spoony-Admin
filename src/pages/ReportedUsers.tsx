import React from 'react';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorDisplay from '../components/common/ErrorDisplay';
import Pagination from '../components/common/Pagination';
import { useReportedUsers, useUserPosts, usePostActions } from '../hooks';
import { getUserReportTypeKorean } from '../utils/reportTypeUtils';
import { formatDate } from '../utils/dateUtils';
import { showConfirmDialog } from '../utils/alertUtils';
import { MESSAGES } from '../constants/messages';
import { PAGINATION } from '../constants/pagination';
import './ReportedUsers.css';

/**
 * 신고된 사용자 목록을 표시하는 페이지 컴포넌트
 * @returns 신고된 사용자 목록 페이지 JSX
 */
const ReportedUsers: React.FC = () => {
  // 신고된 사용자 목록 관련 훅
  const { users, loading, error, pagination, fetchReportedUsers, handlePageChange } = useReportedUsers(PAGINATION.LARGE_PAGE_SIZE);
  // 사용자 게시글 관련 훅
  const { userPosts, selectedUser, handleUserClick, handleDeletePost } = useUserPosts();
  // 게시글 액션 관련 훅 (논리적 삭제)
  const { handleDeletePost: handlePostDelete, loading: actionLoading, error: actionError } = usePostActions();

  /**
   * 사용자 삭제 핸들러
   * @param userId 삭제할 사용자 ID
   */
  const handleUserDelete = (userId: string) => {
    if (showConfirmDialog(MESSAGES.USER.DELETE_CONFIRM)) {
      // 실제 유저 삭제 API 호출 로직 추가 필요
      console.log('유저 삭제:', userId);
    }
  };

  /**
   * 게시글 삭제 성공 후 로컬 상태 업데이트
   * @param postId 삭제된 게시글 ID
   */
  const onDeletePostSuccess = (postId: string) => {
    handleDeletePost(postId);
  };

  // 로딩 중일 때 스피너 표시
  if (loading) {
    return <LoadingSpinner message="신고된 유저를 불러오는 중..." />;
  }

  // 에러 발생 시 에러 표시
  if (error) {
    return <ErrorDisplay error={error} onRetry={() => fetchReportedUsers()} />;
  }

  return (
    <div className="reported-users-container">
      {/* 페이지 헤더 */}
      <div className="reported-users-header">
        <h2>신고된 유저 목록</h2>
        <span className="user-count">총 {users.length}명의 신고된 유저</span>
      </div>
      
      {/* 사용자 테이블 */}
      <div className="users-table-container">
        {users.length === 0 ? (
          <p className="no-users">신고된 유저가 없습니다.</p>
        ) : (
          <div className="table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>이름</th>
                  <th>신고 횟수</th>
                  <th>신고 정보</th>
                  <th>작업</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.userId}>
                    <td>
                      <button
                        className={`user-name-button ${selectedUser === user.userName ? 'selected' : ''}`}
                        onClick={() => handleUserClick(user.userName, user.userId)}
                      >
                        {user.userName}
                      </button>
                    </td>
                    <td className="report-count-cell">
                      <span className="report-count-badge">
                        {user.reportCount}회
                      </span>
                    </td>
                    <td>
                      <div className="reports-container">
                        {user.reports.map((report, index) => (
                          <div key={index} className="report-item">
                            <div className="report-header">
                              <span className="report-type-badge">
                                {getUserReportTypeKorean(report.reportType)}
                              </span>
                              <span className="reporter-name">
                                신고자: {report.reporterName}
                              </span>
                            </div>
                            <div className="report-detail">
                              {report.reportDetail}
                            </div>
                            <div className="report-date">
                              {formatDate(report.createdAt)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="action-cell">
                      <button 
                        className="delete-button"
                        onClick={() => handleUserDelete(user.userId)}
                        title="삭제"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 선택된 유저의 글 목록 */}
      {selectedUser && (
        <div className="user-posts-section">
          <div className="user-posts-header">
            <h3>{selectedUser}의 글 목록</h3>
            <span className="posts-count">총 {userPosts.length}개의 글</span>
          </div>
          
          <div className="user-posts-content">
            {userPosts.length === 0 ? (
              <p className="no-posts">글이 없습니다.</p>
            ) : (
              userPosts.map(post => (
                <PostCard 
                  key={post.postId} 
                  post={post} 
                  onDelete={async (postId) => {
                    if (window.confirm('이 게시글을 삭제하시겠습니까? 삭제된 글은 삭제된 글 목록에서 확인할 수 있습니다.')) {
                      const success = await handlePostDelete(postId);
                      if (success) {
                        onDeletePostSuccess(postId);
                      }
                    }
                  }}
                  showDeleteButton={true}
                  showReportBadge={true}
                  deleteButtonDisabled={actionLoading}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* 페이지네이션 */}
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
};

export default ReportedUsers; 