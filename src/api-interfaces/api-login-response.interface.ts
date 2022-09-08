import { ApiUser } from './api-user.interface';

export interface ApiLoginResponse {
  access_token: string;
  user: ApiUser;
}
