/**
 * 공통 타입 정의
 */

/**
 * 사용자 정보 인터페이스
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 메뉴 정보 인터페이스
 */
export interface Menu {
  id: string;
  name: string;
}

/**
 * 신고 정보 인터페이스
 */
export interface Report {
  id: string;
  reportType: string;
  reportDetail: string;
  createdAt: string;
  reporterName: string;
}

/**
 * 게시글 정보 인터페이스
 */
export interface Post {
  postId: string;
  authorId: string;
  authorName: string;
  content: string;
  restaurantName: string;
  disappointment: string;
  imageUrls: string[];
  location: string;
  menus: Menu[];
  createdAt: string;
  updatedAt: string;
  isReported: boolean;
  reportCount: number;
  reports?: Report[];
}

/**
 * 신고된 사용자 정보 인터페이스
 */
export interface ReportedUser {
  userId: string;
  userName: string;
  reportCount: number;
  reports: {
    id: string;
    reportType: string;
    reportDetail: string;
    reporterName: string;
    createdAt: string;
  }[];
}

/**
 * API 응답 공통 인터페이스
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: {
    message: string;
  };
}

/**
 * 페이지네이션 파라미터 인터페이스
 */
export interface PaginationParams {
  page: number;
  size: number;
  total: number;
  totalPages: number;
}

/**
 * 테이블 컬럼 정의 인터페이스
 */
export interface TableColumn {
  key: string;
  title: string;
  dataIndex: string;
  width?: number;
  render?: (value: any, record: any) => React.ReactNode;
}

/**
 * 로그인 인증 정보 인터페이스
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * 관리자 정보 인터페이스
 */
export interface AdminInfo {
  id: number;
  username: string;
}

/**
 * 로그인 요청 인터페이스
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * JWT 토큰 정보 인터페이스
 */
export interface AdminJwtTokenDTO {
  token: string;
}

/**
 * 로그인 응답 인터페이스
 */
export interface LoginResponse {
  success: boolean;
  data: {
    exists: boolean;
    adminId: number;
    email: string;
    adminJwtTokenDTO: string;
  };
  error: {
    message: string;
  };
}

/**
 * 게시글 목록 응답 인터페이스
 */
export interface PostsResponse {
  posts: Post[];
  pagination: PaginationParams;
}

/**
 * 게시글 API 응답 인터페이스
 */
export interface PostsApiResponse extends ApiResponse<PostsResponse> {} 