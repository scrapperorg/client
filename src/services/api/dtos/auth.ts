import { Role } from "constants/roles";
import { USER_STATUS } from './'

export interface UserDto {
  id: string;
  name: string;
  surname: string;
  role: Role;
  email: string;
  sourcesOfInterest: string[];
  createdAt: Date;
  status: USER_STATUS;
}

export interface LoginDto {
  token: string;
  user: UserDto;
}

export interface RecoverPasswordDto {
  userId: string;
  token: string;
}
