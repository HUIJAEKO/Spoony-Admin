import { useState } from 'react';
import { login as loginApi } from '../services/authService';
import { AdminInfo } from '../types';

export function useAuth() {
  const [user, setUser] = useState<AdminInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginApi({ username, password });
      if (res.success) {
        localStorage.setItem('token', res.data.accessToken);
        setUser(res.data.adminInfo);
        return true;
      } else {
        setError(res.message);
        return false;
      }
    } catch (e: any) {
      setError(e.response?.data?.message || '로그인 실패');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const isAuthenticated = () => !!localStorage.getItem('token');

  return { user, loading, error, login, logout, isAuthenticated };
} 