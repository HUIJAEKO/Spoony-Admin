import { useState } from 'react';
import { login as loginApi } from '../services/authService';
import { LoginResponse } from '../types';

/**
 * 인증 관련 상태와 함수들을 관리하는 커스텀 훅
 * @returns 사용자 정보, 로딩 상태, 에러 상태 및 인증 관련 함수들
 */
export function useAuth() {
  // 현재 로그인한 사용자 정보
  const [user, setUser] = useState<LoginResponse['data'] | null>(null);
  // 로딩 상태
  const [loading, setLoading] = useState(false);
  // 에러 상태
  const [error, setError] = useState<string | null>(null);

  /**
   * 로그인 함수
   * @param email 이메일
   * @param password 비밀번호
   * @returns 로그인 성공 여부
   */
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginApi({ email, password });
      if (res.success && res.data.exists) {
        localStorage.setItem('token', res.data.adminJwtTokenDTO);
        setUser(res.data);
        return true;
      } else {
        setError(res.error?.message || '로그인 실패');
        return false;
      }
    } catch (e: any) {
      setError(e.response?.data?.error?.message || '로그인 실패');
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * 로그아웃 함수
   */
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  /**
   * 인증 상태 확인 함수
   * @returns 인증 여부
   */
  const isAuthenticated = () => !!localStorage.getItem('token');

  return { user, loading, error, login, logout, isAuthenticated };
} 