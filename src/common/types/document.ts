import { Timestamp } from "firebase/firestore";

export type Document = {
  id: string;
  uuid: string;
  name: string;
  filePath: string;
  fileLink: string;
  companyId: string;
  attributes: {};
  createdAt: Timestamp;
};
