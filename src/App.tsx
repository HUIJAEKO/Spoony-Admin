import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Posts from './pages/Posts';
import ReportedPosts from './pages/ReportedPosts';
import ReportedUsers from './pages/ReportedUsers';
import Sidebar from './components/Sidebar';
import './App.css';
import { useAuth } from './hooks/useAuth';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {isAuthenticated() && <Sidebar />}
        <div style={{ marginLeft: isAuthenticated() ? 220 : 0, width: '100%' }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/posts" element={<PrivateRoute><Posts /></PrivateRoute>} />
            <Route path="/reported-posts" element={<PrivateRoute><ReportedPosts /></PrivateRoute>} />
            <Route path="/reported-users" element={<PrivateRoute><ReportedUsers /></PrivateRoute>} />
            <Route path="*" element={<Navigate to={isAuthenticated() ? "/posts" : "/login"} replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
