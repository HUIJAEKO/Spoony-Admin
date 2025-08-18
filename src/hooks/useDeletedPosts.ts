import { useState, useEffect } from 'react';
import { getDeletedPosts } from '../services/deletedPostsService';
import { Post, PostsApiResponse } from '../types';
import { TABLE_PAGE_SIZE } from '../constants';

/**
 * 삭제된 게시글 목록을 관리하는 커스텀 훅
 * @returns 삭제된 게시글 목록과 관련 상태들
 */
export const useDeletedPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    size: TABLE_PAGE_SIZE,
    total: 0,
    totalPages: 0,
  });

  /**
   * 삭제된 게시글 목록을 가져오는 함수
   */
  const fetchDeletedPosts = async (page: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      const response: PostsApiResponse = await getDeletedPosts({
        page,
        size: TABLE_PAGE_SIZE,
      });

      if (response.success) {
        setPosts(response.data.posts);
        setPagination(response.data.pagination);
      } else {
        setError(response.error?.message || '삭제된 게시글을 불러오는데 실패했습니다.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '삭제된 게시글을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 페이지 변경 시 게시글 목록을 다시 가져오는 함수
   */
  const handlePageChange = (page: number) => {
    fetchDeletedPosts(page);
  };

  /**
   * 게시글 목록을 새로고침하는 함수
   */
  const refreshPosts = () => {
    fetchDeletedPosts(pagination.page);
  };

  // 컴포넌트 마운트 시 게시글 목록 가져오기
  useEffect(() => {
    fetchDeletedPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    pagination,
    fetchDeletedPosts,
    handlePageChange,
    refreshPosts,
  };
};
