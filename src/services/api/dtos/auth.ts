import {Role} from "constants/roles";

export interface UserDto {
  id: string;
  name: string;
  surname: string;
  role: Role;
  email: string;
}

export interface LoginDto {
  token: string;
  user: UserDto;
}

export interface RecoverPasswordDto {
  userId: string;
  token: string;
}
