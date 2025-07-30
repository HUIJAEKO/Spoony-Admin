import axios from 'axios';
import { API_BASE_URL } from '../config/api';

/**
 * 로컬 스토리지에서 인증 토큰을 가져오는 함수
 * @returns 인증 토큰 또는 null
 */
const getAuthToken = () => {
  return localStorage.getItem('token');
};

/**
 * 게시글 삭제 응답 인터페이스
 */
export interface DeletePostResponse {
  success: boolean;
  data: {};
  error?: {
    message: string;
  };
}

/**
 * 게시글을 삭제하는 API 호출
 * @param postId 삭제할 게시글 ID
 * @returns 삭제 응답 데이터
 */
export async function deletePost(postId: string): Promise<DeletePostResponse> {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('인증 토큰이 없습니다.');
  }

  const response = await axios.delete<DeletePostResponse>(`${API_BASE_URL}/api/v1/admin/posts/${postId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
} 