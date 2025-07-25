import React, { useState } from 'react';
import PostCard from '../components/PostCard';
import { Post } from '../types';
import { mockPosts } from '../utils/mockData';

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const handleDelete = (postId: string) => {
    if (window.confirm('정말로 이 글을 삭제하시겠습니까?')) {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2>전체 글 목록</h2>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span style={{ color: '#666', fontSize: 14 }}>총 {posts.length}개의 글</span>
          {posts.filter(post => post.isReported).length > 0 && (
            <span style={{ 
              color: '#d32f2f', 
              fontSize: 14, 
              fontWeight: 600,
              background: '#ffebee',
              padding: '4px 8px',
              borderRadius: '12px'
            }}>
              신고된 글 {posts.filter(post => post.isReported).length}개
            </span>
          )}
        </div>
      </div>
      
      <div style={{ background: '#f8f9fa', borderRadius: 8, padding: 24 }}>
        {posts.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>글이 없습니다.</p>
        ) : (
          posts.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              onDelete={handleDelete}
              showDeleteButton={true}
              showReportBadge={true}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Posts; 