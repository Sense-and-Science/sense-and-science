import { Timestamp } from 'firebase/firestore';

export enum BlogAuthorApplicationStatus {
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
  PENDING = "PENDING"
}

export interface BlogAuthorApplication {
  reason: string;
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  status?: BlogAuthorApplicationStatus;
}

export interface BlogAuthorApplicationCompund extends BlogAuthorApplication {
  name: string;
  contactNo: string;
  id: string
}
