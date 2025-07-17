import { Post, ReportedUser, ReportType } from '../types';

export const mockPosts: Post[] = [
  {
    id: '1',
    title: '맛있는 피자집',
    content: '정말 맛있는 피자를 먹었어요! 도우가 쫄깃하고 토핑이 풍성해요.',
    author: '김철수',
    images: [
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400'
    ],
    location: '서울시 강남구',
    menus: [
      { id: '1', name: '마르게리타 피자' },
      { id: '2', name: '페퍼로니 피자' },
      { id: '3', name: '콤비네이션 피자' }
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    isReported: false,
    reportCount: 0
  },
  {
    id: '2',
    title: '분위기 좋은 카페',
    content: '조용하고 아늑한 분위기의 카페입니다. 커피도 맛있어요.',
    author: '이영희',
    images: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400',
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400'
    ],
    location: '서울시 홍대입구',
    menus: [
      { id: '4', name: '아메리카노' },
      { id: '5', name: '카페라떼' },
      { id: '6', name: '카푸치노' }
    ],
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
    isReported: true,
    reportCount: 3,
    reports: [
      {
        id: '1',
        reportType: ReportType.PROMOTIONAL_CONTENT,
        reportDetail: '영리 목적의 홍보성 리뷰로 판단됩니다.',
        createdAt: new Date('2024-01-14T10:30:00')
      },
      {
        id: '2',
        reportType: ReportType.SPAM,
        reportDetail: '도배성 내용으로 판단됩니다.',
        createdAt: new Date('2024-01-14T14:20:00')
      },
      {
        id: '3',
        reportType: ReportType.PROFANITY_OR_ATTACK,
        reportDetail: '다른 사용자를 공격하는 내용입니다.',
        createdAt: new Date('2024-01-14T16:45:00')
      }
    ]
  },
  {
    id: '3',
    title: '신선한 회사랑',
    content: '신선한 회와 함께하는 맛있는 한상차림!',
    author: '박민수',
    images: [
      'https://images.unsplash.com/photo-1579584425555-c3d17c4fca56?w=400',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400'
    ],
    location: '부산시 해운대구',
    menus: [
      { id: '7', name: '모듬회' },
      { id: '8', name: '회덮밥' },
      { id: '9', name: '해물탕' }
    ],
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13'),
    isReported: false,
    reportCount: 0
  },
  {
    id: '4',
    title: '불량 음식점',
    content: '음식이 너무 맛없고 위생 상태도 좋지 않아요.',
    author: '최지영',
    images: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400'
    ],
    location: '서울시 마포구',
    menus: [
      { id: '10', name: '김치찌개' },
      { id: '11', name: '된장찌개' }
    ],
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
    isReported: true,
    reportCount: 5,
    reports: [
      {
        id: '4',
        reportType: ReportType.PROMOTIONAL_CONTENT,
        reportDetail: '영리 목적의 홍보성 리뷰로 판단됩니다.',
        createdAt: new Date('2024-01-12T09:15:00')
      },
      {
        id: '5',
        reportType: ReportType.ILLEGAL_INFORMATION,
        reportDetail: '불법 정보가 포함되어 있습니다.',
        createdAt: new Date('2024-01-12T11:30:00')
      },
      {
        id: '6',
        reportType: ReportType.PROFANITY_OR_ATTACK,
        reportDetail: '특정 업체를 비방하는 내용입니다.',
        createdAt: new Date('2024-01-12T13:45:00')
      },
      {
        id: '7',
        reportType: ReportType.SPAM,
        reportDetail: '반복적인 부정적 리뷰입니다.',
        createdAt: new Date('2024-01-12T15:20:00')
      },
      {
        id: '8',
        reportType: ReportType.PERSONAL_INFORMATION_EXPOSURE,
        reportDetail: '개인 정보가 노출되어 있습니다.',
        createdAt: new Date('2024-01-12T17:10:00')
      }
    ]
  }
];

export const mockReportedUsers: ReportedUser[] = [
  {
    id: '1',
    name: '김철수',
    reportCount: 3,
    reportType: ReportType.PROFANITY_OR_ATTACK,
    reportDetail: '다른 사용자에게 욕설을 사용했습니다.',
    reportedAt: new Date('2024-01-15T09:00:00')
  },
  {
    id: '2',
    name: '이영희',
    reportCount: 5,
    reportType: ReportType.SPAM,
    reportDetail: '반복적으로 도배성 글을 작성했습니다.',
    reportedAt: new Date('2024-01-14T09:00:00')
  },
  {
    id: '3',
    name: '박민수',
    reportCount: 2,
    reportType: ReportType.PROMOTIONAL_CONTENT,
    reportDetail: '영리 목적의 홍보성 리뷰를 작성했습니다.',
    reportedAt: new Date('2024-01-13T09:00:00')
  }
]; 