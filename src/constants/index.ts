export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  POSTS: '/posts',
  REPORTED_POSTS: '/reported-posts',
  REPORTED_USERS: '/reported-users',
} as const;

export const USER_STATUS = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  BANNED: 'banned',
} as const;

export const TABLE_PAGE_SIZE = 10;
export const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss'; 