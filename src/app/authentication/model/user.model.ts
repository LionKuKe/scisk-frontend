export class UserModel {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  token?: string;
  refreshToken?: string;
  authorities: Array<string>;
}
