import React, { useState } from 'react';
import { ReportedUser } from '../types';
import { mockReportedUsers } from '../utils/mockData';

const ReportedUsers: React.FC = () => {
  const [users, setUsers] = useState<ReportedUser[]>(mockReportedUsers);

  const handleDelete = (userId: string) => {
    if (window.confirm('정말로 이 유저를 삭제하시겠습니까?')) {
      setUsers(users.filter(user => user.id !== userId));
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
                  <th style={{ padding: '12px', textAlign: 'center', fontWeight: 600 }}>신고 타입</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>신고 내용</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontWeight: 600 }}>신고된 날짜</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontWeight: 600 }}>작업</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '12px' }}>{user.name}</td>
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
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <span style={{ 
                        background: '#e3f2fd', 
                        color: '#1976d2', 
                        padding: '4px 8px', 
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 600
                      }}>
                        {user.reportType}
                      </span>
                    </td>
                    <td style={{ padding: '12px', fontSize: '14px', color: '#444' }}>
                      {user.reportDetail}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
                      {formatDate(user.reportedAt)}
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
    </div>
  );
};

export default ReportedUsers; 