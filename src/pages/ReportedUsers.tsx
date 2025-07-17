import React, { useState } from 'react';
import { ReportedUser, Post } from '../types';
import { mockReportedUsers, mockPosts } from '../utils/mockData';
import PostCard from '../components/PostCard';

const ReportedUsers: React.FC = () => {
  const [users, setUsers] = useState<ReportedUser[]>(mockReportedUsers);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  const handleDelete = (userId: string) => {
    if (window.confirm('정말로 이 유저를 삭제하시겠습니까?')) {
      setUsers(users.filter(user => user.id !== userId));
      if (selectedUser === userId) {
        setSelectedUser(null);
        setUserPosts([]);
      }
    }
  };

  const handleUserClick = (userName: string) => {
    if (selectedUser === userName) {
      // 같은 유저를 다시 클릭하면 선택 해제
      setSelectedUser(null);
      setUserPosts([]);
    } else {
      // 다른 유저를 클릭하면 해당 유저의 글을 필터링
      setSelectedUser(userName);
      const filteredPosts = mockPosts.filter(post => post.author === userName);
      setUserPosts(filteredPosts);
    }
  };

  const handleDeletePost = (postId: string) => {
    if (window.confirm('정말로 이 글을 삭제하시겠습니까?')) {
      setUserPosts(userPosts.filter(post => post.id !== postId));
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2>신고된 유저 목록</h2>
        <span style={{ color: '#666', fontSize: 14 }}>총 {users.length}명의 신고된 유저</span>
      </div>
      
      <div style={{ background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        {users.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>신고된 유저가 없습니다.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f0f0f0' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>이름</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontWeight: 600 }}>신고 횟수</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>신고 정보</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontWeight: 600 }}>작업</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '12px' }}>
                      <button
                        onClick={() => handleUserClick(user.name)}
                        style={{
                          background: 'none',
                          border: 'none',
                          fontSize: '16px',
                          fontWeight: selectedUser === user.name ? '600' : '400',
                          color: selectedUser === user.name ? '#1976d2' : '#222',
                          cursor: 'pointer',
                          textDecoration: selectedUser === user.name ? 'underline' : 'none',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = '#f5f5f5'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        {user.name}
                      </button>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <span style={{ 
                        background: '#ffebee', 
                        color: '#d32f2f', 
                        padding: '4px 8px', 
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 600
                      }}>
                        {user.reportCount}회
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {user.reports.map((report, index) => (
                          <div key={index} style={{ 
                            background: '#f8f9fa', 
                            padding: '8px', 
                            borderRadius: '6px',
                            border: '1px solid #e9ecef'
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                              <span style={{ 
                                background: '#e3f2fd', 
                                color: '#1976d2', 
                                padding: '2px 6px', 
                                borderRadius: '8px',
                                fontSize: '11px',
                                fontWeight: 600
                              }}>
                                {report.reportType}
                              </span>
                              <span style={{ 
                                background: '#f3e5f5', 
                                color: '#7b1fa2', 
                                padding: '2px 6px', 
                                borderRadius: '8px',
                                fontSize: '11px',
                                fontWeight: 600
                              }}>
                                {report.reporterName}
                              </span>
                            </div>
                            <div style={{ fontSize: '13px', color: '#444', marginBottom: '4px' }}>
                              {report.reportDetail}
                            </div>
                            <div style={{ fontSize: '11px', color: '#666' }}>
                              {formatDate(report.reportedAt)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          fontSize: '16px',
                          cursor: 'pointer',
                          padding: '8px',
                          borderRadius: '6px',
                          transition: 'background 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = '#ffebee'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                        title="삭제"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 선택된 유저의 글 목록 */}
      {selectedUser && (
        <div style={{ marginTop: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h3 style={{ margin: 0, color: '#1976d2' }}>{selectedUser}의 글 목록</h3>
            <span style={{ color: '#666', fontSize: 14 }}>총 {userPosts.length}개의 글</span>
          </div>
          
          <div style={{ background: '#f8f9fa', borderRadius: 8, padding: 24 }}>
            {userPosts.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#666' }}>글이 없습니다.</p>
            ) : (
              userPosts.map(post => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  onDelete={handleDeletePost}
                  showDeleteButton={true}
                  showReportBadge={true}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportedUsers; 