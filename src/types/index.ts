// 공통 타입 정의
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

export interface Menu {
  id: string;
  name: string;
}

export enum ReportType {
  PROMOTIONAL_CONTENT = '영리 목적/홍보성 리뷰',
  PROFANITY_OR_ATTACK = '욕설/인신 공격',
  ILLEGAL_INFORMATION = '불법정보',
  PERSONAL_INFORMATION_EXPOSURE = '개인 정보 노출',
  SPAM = '도배',
  OTHER = '기타'
}

export interface Report {
  id: string;
  reportType: ReportType;
  reportDetail: string;
  createdAt: Date;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  images: string[];
  location: string;
  menus: Menu[];
  createdAt: Date;
  updatedAt: Date;
  isReported: boolean;
  reportCount: number;
  reports?: Report[];
}

export interface ReportedUser {
  id: string;
  name: string;
  reportCount: number;
  reportType: ReportType;
  reportDetail: string;
  reportedAt: Date;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
}

export interface TableColumn {
  key: string;
  title: string;
  dataIndex: string;
  width?: number;
  render?: (value: any, record: any) => React.ReactNode;
}

export interface LoginCredentials {
  email: string;
  password: string;
} 