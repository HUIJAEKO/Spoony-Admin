import axios from 'axios';
import { LoginRequest, LoginResponse } from '../types';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

/**
 * 관리자 로그인 API 호출
 * @param email 관리자 이메일
 * @param password 관리자 비밀번호
 * @returns 로그인 응답 데이터
 */
export async function login({ email, password }: LoginRequest): Promise<LoginResponse> {  
  try {
    const response = await axios.post<LoginResponse>(`${API_BASE_URL}${API_ENDPOINTS.LOGIN}`, {
      email,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
} 