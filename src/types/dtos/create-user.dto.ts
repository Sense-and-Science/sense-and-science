export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  contactNo: string;
  email: string;
  password: string;
  avatar: FileList | null;
}
