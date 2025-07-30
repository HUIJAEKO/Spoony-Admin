import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Posts from './pages/Posts';
import ReportedPosts from './pages/ReportedPosts';
import ReportedUsers from './pages/ReportedUsers';
import Sidebar from './components/Sidebar';
import './App.css';
import { useAuth } from './hooks/useAuth';

/**
 * 인증이 필요한 라우트를 보호하는 컴포넌트
 * @param children 보호할 컴포넌트
 * @returns 인증된 경우 자식 컴포넌트, 아닌 경우 로그인 페이지로 리다이렉트
 */
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />;
};

/**
 * 메인 애플리케이션 컴포넌트
 * 라우팅 설정과 인증 상태에 따른 페이지 렌더링을 담당
 * @returns 애플리케이션 JSX
 */
function App() {
  const { isAuthenticated } = useAuth();
  return (
    <Router>
      <Routes>
        {/* 로그인 페이지 */}
        <Route path="/login" element={<Login />} />
        {/* 전체 게시글 목록 페이지 */}
        <Route path="/posts" element={<PrivateRoute><div style={{ display: 'flex' }}><Sidebar /><div style={{ marginLeft: 220, width: '100%' }}><Posts /></div></div></PrivateRoute>} />
        {/* 신고된 게시글 목록 페이지 */}
        <Route path="/reported-posts" element={<PrivateRoute><div style={{ display: 'flex' }}><Sidebar /><div style={{ marginLeft: 220, width: '100%' }}><ReportedPosts /></div></div></PrivateRoute>} />
        {/* 신고된 사용자 목록 페이지 */}
        <Route path="/reported-users" element={<PrivateRoute><div style={{ display: 'flex' }}><Sidebar /><div style={{ marginLeft: 220, width: '100%' }}><ReportedUsers /></div></div></PrivateRoute>} />
        {/* 기본 경로는 로그인 페이지로 리다이렉트 */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* 잘못된 경로는 로그인 페이지로 리다이렉트 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
