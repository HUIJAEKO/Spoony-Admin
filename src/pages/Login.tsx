import React, { useState } from 'react';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // TODO: 실제 로그인 API 연동
    if (email === 'admin@spoony.com' && password === 'admin1234') {
      // 로그인 성공 시 토큰 저장 및 리다이렉트
      localStorage.setItem('token', 'dummy-token');
      window.location.href = '/posts';
    } else {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>관리자 로그인</h2>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="login-error">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </form>
    </div>
  );
};

export default Login; 