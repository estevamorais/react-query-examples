import axios from "axios";
import { User, UsersList } from "../models/UserModel";

const mockApi = axios.create({
  baseURL: "https://642ada4cb11efeb759a48df5.mockapi.io"
})

const getUsers = async (page = 1): Promise<UsersList> => {
  const usersPerPage = 10;
  const totalPages = 100 / Math.ceil(usersPerPage);

  const response = await mockApi.get('users', {
    params: {
      page,
      limit: usersPerPage
    },
    transformResponse: [(data) => {
			return {
        users: JSON.parse(data),
        hasMore: page < (totalPages - 1) 
      }
		}]
  });

  return response.data;
}

const updateUserName = async (userId: string, name: string): Promise<User> => {
  const response = await mockApi.put<User>(`users/${userId}`, { name });

  return response.data;
}

export const api = {
  getUsers,
  updateUserName,
};
