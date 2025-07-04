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

export { CreateUserDTO, LoginUserDTO };