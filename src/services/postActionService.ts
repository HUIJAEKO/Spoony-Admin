import axios from 'axios';
import { PostActionResponse, DeletePostRequest, RestorePostRequest } from '../types';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

/**
 * 로컬 스토리지에서 인증 토큰을 가져오는 함수
 * @returns 인증 토큰 또는 null
 */
const getAuthToken = () => {
  return localStorage.getItem('token');
};

/**
 * 게시글을 논리적으로 삭제하는 API 호출
 * @param postId 삭제할 게시글 ID
 * @returns 삭제 결과 응답 데이터
 */
export async function deletePost(postId: string): Promise<PostActionResponse> {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('인증 토큰이 없습니다.');
  }

  const response = await axios.post<PostActionResponse>(
    `${API_BASE_URL}${API_ENDPOINTS.DELETE_POST.replace('{postId}', postId)}`,
    { postId } as DeletePostRequest,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
}

/**
 * 삭제된 게시글을 복구하는 API 호출
 * @param postId 복구할 게시글 ID
 * @returns 복구 결과 응답 데이터
 */
export async function restorePost(postId: string): Promise<PostActionResponse> {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('인증 토큰이 없습니다.');
  }

  const response = await axios.post<PostActionResponse>(
    `${API_BASE_URL}${API_ENDPOINTS.RESTORE_POST.replace('{postId}', postId)}`,
    { postId } as RestorePostRequest,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
}
