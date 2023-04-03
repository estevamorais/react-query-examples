export interface User {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
}

export interface UsersList {
  users: Array<User>;
  hasMore: boolean;
}