export interface IUserData {
  user: {
    bio: string;
    email: string;
    image: string;
    token: string;
    username: string;
  };
}

export interface IUserDataWithPassword extends IUserData {
  password: string;
}

export type IUser = IUserData['user'];

export type RequestUpdateCurrentUser = Omit<IUser, 'token' | 'bio'>;
