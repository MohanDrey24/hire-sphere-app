import dayjs from 'dayjs'

export const computeDaysAgo = (createdAt: string): string => {
  const currentDate = dayjs();
  const createdDate = dayjs(createdAt);

  const diffMinutes = currentDate.diff(createdDate, 'minute');

  if (diffMinutes < 1) {
    return "Just Now";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} ${diffMinutes === 1 ? "minute" : "minutes"} ago`;
  }

  const diffDays = currentDate.diff(createdDate, "day");

  if (diffDays < 30) {
    return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
  }

  const diffMonths = currentDate.diff(createdDate, "month");

  if (diffMonths < 12) {
    return `${diffMonths} ${diffMonths === 1 ? "month" : "months"} ago`;
  }

  const diffYears = currentDate.diff(createdDate, "year");
  return `${diffYears} ${diffYears === 1 ? "year" : "years"} ago`;
}