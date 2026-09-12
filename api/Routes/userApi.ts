import axios from "axios";
import axiosClient from "../axiosConfiguration";
import type { User, UserRegister } from "@/types/user";

const userApi = { 
  getAllUsers: async (): Promise<User[]> => {
    const response = await axiosClient.get("/users");
    return response.data.map((user: any) => user);
  },
  getUserById: async (id: number): Promise<User> => {
    const response = await axiosClient.get(`/users/${id}`);

    return response.data;
  },
  createUser: async (user: User): Promise<User> => {
    try {
      const response = await axiosClient.post("/users", user);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", user);
      throw error;
    }
  },
  updateUser: async (id: number, user: UserRegister): Promise<User> => {
    try {
      const response = await axiosClient.put(`/users/${id}`, user);
      return response.data;
    } catch (error) {
      console.error(`Error updating book with id ${id}:`, error);
      throw error;
    }
  },
  deleteUser: async (id: number): Promise<User> => {
    try {
      const response = await axiosClient.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting user with id ${id}:`, error);
      throw error;
    }
  },
};

export default userApi;