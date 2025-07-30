import { BASE_URL } from './baseUrl';

/**
 * API 기본 URL 설정
 */
export const API_BASE_URL = BASE_URL;

/**
 * API 엔드포인트 설정
 * 각 엔드포인트는 관리자 기능에 필요한 API 경로를 정의
 */
export const API_ENDPOINTS = {
  LOGIN: '/api/v1/admin/login',
  POSTS: '/api/v1/admin/posts',
  REPORTED_POSTS: '/api/v1/admin/posts/reported',
  REPORTED_USERS: '/api/v1/admin/users/reported',
} as const; 