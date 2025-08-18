import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

/**
 * 관리자 페이지의 사이드바 네비게이션 컴포넌트
 * @returns 사이드바 JSX
 */
const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      {/* 사이드바 제목 */}
      <div className="sidebar-title">SPOONY ADMIN</div>
      {/* 네비게이션 메뉴 */}
      <nav className="sidebar-nav">
        <NavLink to="/posts" className={({isActive}) => isActive ? 'active' : ''}>전체글 목록</NavLink>
        <NavLink to="/reported-posts" className={({isActive}) => isActive ? 'active' : ''}>신고된 글</NavLink>
        <NavLink to="/reported-users" className={({isActive}) => isActive ? 'active' : ''}>신고된 유저</NavLink>
        <NavLink to="/deleted-posts" className={({isActive}) => isActive ? 'active' : ''}>삭제된 글</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar; 