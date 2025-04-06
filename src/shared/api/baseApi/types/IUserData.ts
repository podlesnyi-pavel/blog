export interface IUserData {
  user: {
    bio: string;
    email: string;
    image: string;
    token: string;
    username: string;
  };
}

export type IUser = IUserData['user'];
