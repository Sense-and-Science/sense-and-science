import { Timestamp } from 'firebase/firestore';

export enum BlogUserRole {
  ADMIN = 'ADMIN',
  READER = 'READER',
  AUTHOR = 'AUTHOR',
  REQUESTED_TO_BE_AUTHOR = 'REQUESTED_TO_BE_AUTHOR',
}

export interface BlogUser {
  firstName: string;
  lastName: string;
  contactNo: string;
  email: string;
  role: BlogUserRole;
  avatarUrl: string | undefined;
  avatarId: string | undefined;
  avatarThumbnailUrl: string | undefined;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface BlogUserCompound extends BlogUser {
  id: string
}
 