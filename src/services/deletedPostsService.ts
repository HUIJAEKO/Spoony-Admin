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
 * 삭제된 게시글 목록 조회 파라미터 인터페이스
 */
export interface GetDeletedPostsParams {
  page: number;
  size: number;
}

/**
 * 삭제된 게시글 목록을 가져오는 API 호출
 * @param page 페이지 번호
 * @param size 페이지 크기
 * @returns 삭제된 게시글 목록 응답 데이터
 */
export async function getDeletedPosts({ page, size }: GetDeletedPostsParams): Promise<PostsApiResponse> {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('인증 토큰이 없습니다.');
  }

  const response = await axios.get<PostsApiResponse>(`${API_BASE_URL}${API_ENDPOINTS.DELETED_POSTS}`, {
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
