import axios from "axios";
import { User } from "../models/UserModel";

const mockApi = axios.create({
  baseURL: "https://642ada4cb11efeb759a48df5.mockapi.io"
})

const getUsers = async (): Promise<User[]> => {
  const response = await mockApi.get<User[]>('users');

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
