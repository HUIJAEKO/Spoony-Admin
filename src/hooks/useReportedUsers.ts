import { useState, useEffect } from 'react';
import { ReportedUser, PaginationParams } from '../types';
import { getReportedUsers, GetReportedUsersParams } from '../services/reportedUsersService';
import { MESSAGES } from '../constants/messages';
import { PAGINATION } from '../constants/pagination';

/**
 * 신고된 사용자 목록을 관리하는 커스텀 훅
 * @param initialPageSize 초기 페이지 크기 (기본값: PAGINATION.LARGE_PAGE_SIZE)
 * @returns 신고된 사용자 목록과 관련 상태 및 함수들
 */
export const useReportedUsers = (initialPageSize: number = PAGINATION.LARGE_PAGE_SIZE) => {
  // 신고된 사용자 목록 상태
  const [users, setUsers] = useState<ReportedUser[]>([]);
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
   * 신고된 사용자 목록을 가져오는 함수
   * @param page 페이지 번호 (기본값: 0)
   * @param size 페이지 크기 (기본값: initialPageSize)
   */
  const fetchReportedUsers = async (page: number = 0, size: number = initialPageSize) => {
    try {
      setLoading(true);
      setError(null);
      
      const params: GetReportedUsersParams = { page, size };
      const response = await getReportedUsers(params);
      
      if (response.success) {
        setUsers(response.data.users);
        setPagination(response.data.pagination);
      } else {
        setError(response.error?.message || MESSAGES.USER.LOAD_ERROR);
      }
    } catch (err: any) {
      setError(err.message || MESSAGES.USER.LOAD_ERROR);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 페이지 변경 핸들러
   * @param newPage 새로운 페이지 번호
   */
  const handlePageChange = (newPage: number) => {
    fetchReportedUsers(newPage, pagination.size);
  };

  // 컴포넌트 마운트 시 신고된 사용자 목록 로드
  useEffect(() => {
    fetchReportedUsers();
  }, []);

  return {
    users,
    loading,
    error,
    pagination,
    fetchReportedUsers,
    handlePageChange,
  };
}; 