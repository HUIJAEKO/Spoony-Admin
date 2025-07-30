// 게시글 신고 타입을 한국어로 변환
export const getReportTypeKorean = (reportType: string): string => {
  switch (reportType) {
    case 'PROMOTIONAL_CONTENT':
      return '영리 목적/홍보성 리뷰';
    case 'PROFANITY_OR_ATTACK':
      return '욕설/인신 공격';
    case 'ILLEGAL_INFORMATION':
      return '불법정보';
    case 'PERSONAL_INFORMATION_EXPOSURE':
      return '개인 정보 노출';
    case 'SPAM':
      return '도배';
    case 'OTHER':
      return '기타';
    default:
      return reportType;
  }
};

// 유저 신고 타입을 한국어로 변환
export const getUserReportTypeKorean = (reportType: string): string => {
  switch (reportType) {
    case 'PROMOTIONAL_CONTENT':
      return '영리 목적/홍보성 후기';
    case 'INSULT':
      return '욕설/인신 공격';
    case 'DUPLICATE':
      return '도배';
    case 'REPUTATION_AND_COPYRIGHT_VIOLATION':
      return '명예 회손 및 저작권 침해';
    case 'OTHER':
      return '기타';
    default:
      return reportType;
  }
}; 