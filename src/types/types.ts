export interface CreateUserDto {
  user_id: string;
  email: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}
