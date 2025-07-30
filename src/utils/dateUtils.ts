/**
 * 날짜 문자열을 한국어 형식으로 포맷팅하는 함수
 * @param dateString 포맷팅할 날짜 문자열
 * @returns 한국어 형식의 날짜 문자열 (YYYY.MM.DD HH:MM)
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}; 