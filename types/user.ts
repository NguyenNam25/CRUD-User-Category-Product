export interface User {
  id:string;
  userId: number;
  fullname: string;
  email: string;
  password: string;
}

export interface UserForm {
  userId: number;
  fullname: string;
  email: string;
  password: string;
}
