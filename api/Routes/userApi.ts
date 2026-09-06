import axiosClient from "../axiosConfiguration";
import type { User, UserForm } from "@/types/user";

const userApi = {
    getAllUsers: async (): Promise<User[]> => {
        const response = await axiosClient.get("/users");
        return response.data.map((user: any) => (user))
    },
    getUserById: async (id: string): Promise<User> => {
        const response = await axiosClient.get(`/users/${id}`)

        return response.data
    },
    createUser: async (user: UserForm): Promise<User> => {
        try {
            const response = await axiosClient.post("/users", user)
            return response.data;
        } catch (error) {
            console.error("Error creating user:", user);
            throw error;
        }
    },
    updateUser: async (id: string, user: UserForm): Promise<User> => {
        try {
            const response = await axiosClient.put(`/users/${id}`, user)
            return response.data
        } catch (error) {
            console.error(`Error updating book with id ${id}:`, error);
            throw error;
        }
    },
    deleteUser: async (id: string): Promise<User> => {
        try {
            const response = await axiosClient.delete(`/users/${id}`)
            return response.data
        } catch (error) {
            console.error(`Error deleting user with id ${id}:`, error);
            throw error;
        }
    },
    login: async (email: string, password: string): Promise<User> => {
        try {
            const response = await axiosClient.get(`/users?email=${email}`)

            const user = response.data.find(
                (user: User) => user.password === password
            )

            if (!user) {
                throw new Error("Email hoặc password không đúng");
            }

            return user;

        } catch (error) {
            console.error(`Error login`, error);
            throw error;
        }
    }
}

export default userApi