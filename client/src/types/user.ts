export interface Data {
  token: string;
}

export type User = {
  id: number;
  email: string;
  role: "ADMIN" | "USER";
};

export interface InitialUser {
  isAuth: boolean;
  user: Partial<User>;
}
