export interface User {
  id: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  firstName: string;
  lastName: string;
  email: string;
  profileId: string;

  isActive: boolean;
}
