import { useState, useEffect } from 'react';
import { Post, PaginationParams } from '../types';
import { getPosts, GetPostsParams } from '../services/postsService';
import { MESSAGES } from '../constants/messages';
import { PAGINATION } from '../constants/pagination';

/**
 * 게시글 목록을 관리하는 커스텀 훅
 * @param initialPageSize 초기 페이지 크기 (기본값: PAGINATION.LARGE_PAGE_SIZE)
 * @returns 게시글 목록과 관련 상태 및 함수들
 */
export const usePosts = (initialPageSize: number = PAGINATION.LARGE_PAGE_SIZE) => {
  // 게시글 목록 상태
  const [posts, setPosts] = useState<Post[]>([]);
  // 로딩 상태
  const [loading, setLoading] = useState(true);
  // 에러 상태
  const [error, setError] = useState<string | null>(null);
  // 페이지네이션 정보
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 0,
    size: initialPageSize,
    total: 0,
    totalPages: 0,
  });

  /**
   * 게시글 목록을 가져오는 함수
   * @param page 페이지 번호 (기본값: 0)
   * @param size 페이지 크기 (기본값: initialPageSize)
   */
  const fetchPosts = async (page: number = 0, size: number = initialPageSize) => {
    try {
      setLoading(true);
      setError(null);
      
      const params: GetPostsParams = { page, size };
      const response = await getPosts(params);
      
      if (response.success) {
        setPosts(response.data.posts);
        setPagination(response.data.pagination);
      } else {
        setError(response.error?.message || MESSAGES.POST.LOAD_ERROR);
      }
    } catch (err: any) {
      setError(err.message || MESSAGES.POST.LOAD_ERROR);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 페이지 변경 핸들러
   * @param newPage 새로운 페이지 번호
   */
  const handlePageChange = (newPage: number) => {
    fetchPosts(newPage, pagination.size);
  };

  // 컴포넌트 마운트 시 게시글 목록 로드
  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    pagination,
    fetchPosts,
    handlePageChange,
  };
}; 