import { deletePost } from '../services/deletePostService';
import { showConfirmDialog, showSuccessAlert, showErrorAlert } from '../utils/alertUtils';
import { MESSAGES } from '../constants/messages';

/**
 * 게시글 삭제 기능을 관리하는 커스텀 훅
 * @returns 게시글 삭제 핸들러 함수
 */
export const useDeletePost = () => {
  /**
   * 게시글 삭제 핸들러
   * @param postId 삭제할 게시글 ID
   * @param onSuccess 삭제 성공 시 실행할 콜백 함수
   */
  const handleDelete = async (postId: string, onSuccess?: () => void) => {
    if (showConfirmDialog(MESSAGES.POST.DELETE_CONFIRM)) {
      try {
        const response = await deletePost(postId);
        if (response.success) {
          showSuccessAlert(MESSAGES.POST.DELETE_SUCCESS);
          onSuccess?.();
        } else {
          showErrorAlert(response.error?.message || MESSAGES.POST.DELETE_ERROR);
        }
      } catch (err: any) {
        showErrorAlert(err.message || MESSAGES.POST.DELETE_ERROR);
      }
    }
  };

  return { handleDelete };
}; 