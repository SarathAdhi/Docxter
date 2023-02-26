import { Timestamp } from "firebase/firestore";

export const isDayTenToday = (createdAt: Timestamp) => {
  const todayDate = new Date().valueOf();
  const _createdAt = createdAt.toDate();
  const createdDate = new Date(_createdAt).valueOf();

  const totalSeconds = (todayDate - createdDate) / 1000;
  const daysDifference = Math.floor(totalSeconds / (60 * 60 * 24));
  return daysDifference >= 10;
};
