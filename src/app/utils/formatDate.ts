import dayjs from "dayjs";

export const formatDate = (date: string | undefined, format: string) => {
  return dayjs(date).format(format);
}