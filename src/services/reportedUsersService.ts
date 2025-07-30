import axios from 'axios';
import { ReportedUser } from '../types';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

/**
 * 로컬 스토리지에서 인증 토큰을 가져오는 함수
 * @returns 인증 토큰 또는 null
 */
const getAuthToken = () => {
  return localStorage.getItem('token');
};

/**
 * 신고된 사용자 목록 응답 인터페이스
 */
export interface ReportedUsersResponse {
  users: ReportedUser[];
  pagination: {
    page: number;
    size: number;
    total: number;
    totalPages: number;
  };
}

/**
 * 신고된 사용자 API 응답 인터페이스
 */
export interface ReportedUsersApiResponse {
  success: boolean;
  data: ReportedUsersResponse;
  error?: {
    message: string;
  };
}

/**
 * 신고된 사용자 목록 조회 파라미터 인터페이스
 */
export interface GetReportedUsersParams {
  page: number;
  size: number;
  reportCount?: number;
}

/**
 * 신고된 사용자 목록을 가져오는 API 호출
 * @param page 페이지 번호
 * @param size 페이지 크기
 * @param reportCount 신고 횟수 필터 (선택사항)
 * @returns 신고된 사용자 목록 응답 데이터
 */
export async function getReportedUsers({ page, size, reportCount }: GetReportedUsersParams): Promise<ReportedUsersApiResponse> {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('인증 토큰이 없습니다.');
  }

  const params: any = {
    page,
    size,
  };

  if (reportCount !== undefined) {
    params.reportCount = reportCount;
  }

  const response = await axios.get<ReportedUsersApiResponse>(`${API_BASE_URL}${API_ENDPOINTS.REPORTED_USERS}`, {
    params,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
} 