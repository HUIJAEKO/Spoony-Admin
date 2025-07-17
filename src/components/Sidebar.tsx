import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">SPOONY ADMIN</div>
      <nav className="sidebar-nav">
        <NavLink to="/posts" className={({isActive}) => isActive ? 'active' : ''}>전체글 목록</NavLink>
        <NavLink to="/reported-posts" className={({isActive}) => isActive ? 'active' : ''}>신고된 글</NavLink>
        <NavLink to="/reported-users" className={({isActive}) => isActive ? 'active' : ''}>신고된 유저</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar; 