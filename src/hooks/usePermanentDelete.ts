import { useState } from 'react';
import { deletePostPermanently } from '../services/deletePostService';
import { DeletePostResponse } from '../services/deletePostService';

/**
 * 게시글 물리적 삭제를 관리하는 커스텀 훅
 * @returns 게시글 물리적 삭제 관련 함수들과 상태들
 */
export const usePermanentDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 게시글을 물리적으로 삭제하는 함수
   * @param postId 삭제할 게시글 ID
   * @returns 삭제 성공 여부
   */
  const handlePermanentDelete = async (postId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response: DeletePostResponse = await deletePostPermanently(postId);

      if (response.success) {
        return true;
      } else {
        setError(response.error?.message || '게시글 영구 삭제에 실패했습니다.');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '게시글 영구 삭제에 실패했습니다.');
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
    handlePermanentDelete,
    clearError,
  };
};
