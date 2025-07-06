interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  photo: string;
}

interface LoginUserDTO {
  email: string;
  password: string;
}

interface UpdateUserDTO {
  name?: string;
  email?: string;
  photo?: string;
}

interface UpdatePasswordDTO {
  oldPassword: string;
  newPassword: string;
}

export { CreateUserDTO, LoginUserDTO, UpdateUserDTO, UpdatePasswordDTO };
