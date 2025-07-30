export const MESSAGES = {
  LOGIN: {
    SUCCESS: '로그인되었습니다.',
    FAILED: '이메일 또는 비밀번호가 올바르지 않습니다.',
    ERROR: '로그인에 실패했습니다.',
  },
  POST: {
    DELETE_CONFIRM: '정말로 이 글을 삭제하시겠습니까?',
    DELETE_SUCCESS: '게시글이 삭제되었습니다.',
    DELETE_ERROR: '삭제에 실패했습니다.',
    LOAD_ERROR: '게시글을 불러오는데 실패했습니다.',
  },
  USER: {
    DELETE_CONFIRM: '정말로 이 유저를 삭제하시겠습니까?',
    LOAD_ERROR: '신고된 유저를 불러오는데 실패했습니다.',
  },
  COMMON: {
    LOADING: '로딩 중...',
    ERROR: '에러가 발생했습니다.',
    RETRY: '다시 시도',
  },
} as const; 