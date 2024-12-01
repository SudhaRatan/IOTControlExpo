export default interface auth {
  token: string;
  user: User
}

export interface User {
  name: string;
  email: string;
  _id: string
}