import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { MESSAGES } from '../constants/messages';
import './Login.css';

/**
 * 관리자 로그인 페이지 컴포넌트
 * @returns 로그인 페이지 JSX
 */
const Login: React.FC = () => {
  // 이메일 입력 상태
  const [email, setEmail] = useState('');
  // 비밀번호 입력 상태
  const [password, setPassword] = useState('');
  // 인증 관련 훅
  const { login, error, loading } = useAuth();
  // 폼 에러 상태
  const [formError, setFormError] = useState('');

  /**
   * 로그인 폼 제출 핸들러
   * @param e 폼 이벤트
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    const success = await login(email, password);
    if (success) {
      // 로그인 성공 시 posts 페이지로 이동
      window.location.href = '/posts';
    } else {
      setFormError(MESSAGES.LOGIN.FAILED);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>관리자 로그인</h2>
        {/* 이메일 입력 필드 */}
        <input
          type="text"
          placeholder="이메일"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        {/* 비밀번호 입력 필드 */}
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {/* 에러 메시지 표시 */}
        {(formError || error) && <div className="login-error">{formError || error}</div>}
        {/* 로그인 버튼 */}
        <button type="submit" disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </form>
    </div>
  );
};

export default Login; 