export interface login {
  email: string;
  password: string;
}

export interface register extends login{
  name: string
}