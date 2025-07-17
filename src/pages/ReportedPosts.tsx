import React, { useState } from 'react';
import PostCard from '../components/PostCard';
import { Post } from '../types';
import { mockPosts } from '../utils/mockData';

const ReportedPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts.filter(post => post.isReported));

  const handleDelete = (postId: string) => {
    if (window.confirm('정말로 이 글을 삭제하시겠습니까?')) {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2>신고된 글 목록</h2>
        <span style={{ color: '#666', fontSize: 14 }}>총 {posts.length}개의 신고된 글</span>
      </div>
      
      <div style={{ background: '#f8f9fa', borderRadius: 8, padding: 24 }}>
        {posts.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>신고된 글이 없습니다.</p>
        ) : (
          posts.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              onDelete={handleDelete}
              showDeleteButton={true}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ReportedPosts; 