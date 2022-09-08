export interface ApiUser {
  id: number;
  displayName: string;
  profile: {
    id: number;
    picture: string;
  };
}
