import { User, UserRegister } from "@/types/user";
import axiosClient from "../axiosConfiguration";

const authApi = {
  login: async (email: string, password: string): Promise<{ user: User }> => {
    try {
      const response = await axiosClient.post("/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error(`Error login`, error);
      throw error;
    }
  },
  register: async (user: UserRegister): Promise<User> => {
    try {
      const response = await axiosClient.post("/register", user);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", user);
      throw error;
    }
  },
  logout: async (): Promise<void> => {
    try {
      const response = await axiosClient.post("/logout");
      return response.data;
    } catch (error) {
      console.error("Error logout: ", error);
      throw error;
    }
  },
  fetchMe: async (): Promise<User | null> => {
    try {
      const response = await axiosClient.get("/me");
      return response.data.user;
    } catch {
      return null;
    }
  },
};

export default authApi;
