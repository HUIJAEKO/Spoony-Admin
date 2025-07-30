import axios from 'axios';
import { PostsApiResponse } from '../types';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

/**
 * 로컬 스토리지에서 인증 토큰을 가져오는 함수
 * @returns 인증 토큰 또는 null
 */
const getAuthToken = () => {
  return localStorage.getItem('token');
};

/**
 * 사용자 정보 인터페이스
 */
export interface User {
  id: string;
  name: string;
}

/**
 * 사용자 게시글 목록 응답 인터페이스
 */
export interface UserPostsResponse {
  user: User;
  posts: any[]; // Post 타입과 동일하지만 별도로 정의
  pagination: {
    page: number;
    size: number;
    total: number;
    totalPages: number;
  };
}

/**
 * 사용자 게시글 API 응답 인터페이스
 */
export interface UserPostsApiResponse {
  success: boolean;
  data: UserPostsResponse;
  error?: {
    message: string;
  };
}

/**
 * 사용자 게시글 목록 조회 파라미터 인터페이스
 */
export interface GetUserPostsParams {
  userId: string;
  page: number;
  size: number;
}

/**
 * 특정 사용자의 게시글 목록을 가져오는 API 호출
 * @param userId 사용자 ID
 * @param page 페이지 번호
 * @param size 페이지 크기
 * @returns 사용자 게시글 목록 응답 데이터
 */
export async function getUserPosts({ userId, page, size }: GetUserPostsParams): Promise<UserPostsApiResponse> {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('인증 토큰이 없습니다.');
  }

  const response = await axios.get<UserPostsApiResponse>(`${API_BASE_URL}/api/v1/admin/users/${userId}/posts`, {
    params: {
      page,
      size,
    },
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
} 