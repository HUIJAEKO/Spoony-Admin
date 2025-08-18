import { useState } from 'react';
import { deletePost, restorePost } from '../services/postActionService';
import { PostActionResponse } from '../types';

/**
 * 게시글 삭제/복구 액션을 관리하는 커스텀 훅
 * @returns 게시글 액션 관련 함수들과 상태들
 */
export const usePostActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 게시글을 논리적으로 삭제하는 함수
   * @param postId 삭제할 게시글 ID
   * @returns 삭제 성공 여부
   */
  const handleDeletePost = async (postId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response: PostActionResponse = await deletePost(postId);

      if (response.success) {
        return true;
      } else {
        setError(response.error?.message || '게시글 삭제에 실패했습니다.');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '게시글 삭제에 실패했습니다.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * 삭제된 게시글을 복구하는 함수
   * @param postId 복구할 게시글 ID
   * @returns 복구 성공 여부
   */
  const handleRestorePost = async (postId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response: PostActionResponse = await restorePost(postId);

      if (response.success) {
        return true;
      } else {
        setError(response.error?.message || '게시글 복구에 실패했습니다.');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '게시글 복구에 실패했습니다.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * 에러 상태를 초기화하는 함수
   */
  const clearError = () => {
    setError(null);
  };

  return {
    loading,
    error,
    handleDeletePost,
    handleRestorePost,
    clearError,
  };
};
