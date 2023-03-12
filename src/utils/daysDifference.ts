import { Timestamp } from "firebase/firestore";

export const isDayTenToday = (createdAt: Timestamp, getDate = false) => {
  const todayDate = new Date().valueOf();
  const _createdAt = createdAt.toDate();
  const createdDate = new Date(_createdAt).valueOf();

  const totalSeconds = (todayDate - createdDate) / 1000;
  const daysDifference = Math.floor(totalSeconds / (60 * 60 * 24));

  if (getDate) return daysDifference;

  return daysDifference >= 10;
};
