import dayjs from "dayjs";

export const formatDate = (date: string | undefined, format: string) => {
  if (date) {
    return dayjs(date).format(format);
  } else {
    return null
  }
}