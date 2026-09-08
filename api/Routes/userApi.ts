import axios from "axios";
import axiosClient from "../axiosConfiguration";
import type { User } from "@/types/user";

const userApi = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await axios.get("/api/users");
    return response.data.map((user: any) => user);
  },
  getUserById: async (id: number): Promise<User> => {
    const response = await axios.get(`/users/${id}`);

    return response.data;
  },
  createUser: async (user: User): Promise<User> => {
    try {
      const response = await axios.post("/api/users", user);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", user);
      throw error;
    }
  },
  updateUser: async (id: number, user: User): Promise<User> => {
    try {
      const response = await axios.put(`/api/users/${id}`, user);
      return response.data;
    } catch (error) {
      console.error(`Error updating book with id ${id}:`, error);
      throw error;
    }
  },
  deleteUser: async (id: number): Promise<User> => {
    try {
      const response = await axios.delete(`/api/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting user with id ${id}:`, error);
      throw error;
    }
  },
  login: async (email: string, password: string): Promise<User> => {
    try {
      // const response = await axiosClient.get(
      //   `/users?email=${email}&password=${password}`,
      // );
      const response = await axios.post("/api/login", {
        email,
        password,
      });

      const user = response.data[0];

      if (!user) {
        throw new Error("Email hoặc password không đúng");
      }

      return user;
    } catch (error) {
      console.error(`Error login`, error);
      throw error;
    }
  },
};

export default userApi;
