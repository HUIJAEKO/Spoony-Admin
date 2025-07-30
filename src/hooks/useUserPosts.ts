import { useState } from 'react';
import { Post } from '../types';
import { getUserPosts, GetUserPostsParams } from '../services/userPostsService';
import { PAGINATION } from '../constants/pagination';

/**
 * 특정 사용자의 게시글 목록을 관리하는 커스텀 훅
 * @returns 사용자 게시글 목록과 관련 상태 및 함수들
 */
export const useUserPosts = () => {
  // 선택된 사용자의 게시글 목록
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  // 현재 선택된 사용자 이름
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  /**
   * 사용자 클릭 핸들러 - 사용자의 게시글을 가져오거나 선택 해제
   * @param userName 사용자 이름
   * @param userId 사용자 ID
   */
  const handleUserClick = async (userName: string, userId: string) => {
    if (selectedUser === userName) {
      // 같은 유저를 다시 클릭하면 선택 해제
      setSelectedUser(null);
      setUserPosts([]);
    } else {
      // 다른 유저를 클릭하면 해당 유저의 글을 가져오기
      setSelectedUser(userName);
      try {
        const params: GetUserPostsParams = { userId, page: 0, size: PAGINATION.LARGE_PAGE_SIZE };
        const response = await getUserPosts(params);
        
        if (response.success) {
          setUserPosts(response.data.posts);
        }
      } catch (err) {
        console.error('유저 글을 불러오는데 실패했습니다:', err);
      }
    }
  };

  /**
   * 게시글 삭제 핸들러 - 로컬 상태에서 게시글 제거
   * @param postId 삭제된 게시글 ID
   */
  const handleDeletePost = (postId: string) => {
    setUserPosts(userPosts.filter(post => post.postId !== postId));
  };

  return {
    userPosts,
    selectedUser,
    handleUserClick,
    handleDeletePost,
  };
}; 