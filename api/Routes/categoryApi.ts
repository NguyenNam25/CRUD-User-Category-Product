import axiosClient from "../axiosConfiguration";
import type { Category, CategoryForm } from "@/types/category";

const categoryApi = {
    getAllCategories: async (): Promise<Category[]> => {
        const response = await axiosClient.get("/categories");
        return response.data.map((category: any) => (category))
    },
    getCategoryById: async (id: string): Promise<Category> => {
        const response = await axiosClient.get(`/categories/${id}`)

        return response.data
    },
    createCategory: async (category: CategoryForm): Promise<Category> => {
        try {
            const response = await axiosClient.post("/categories", category)
            return response.data;
        } catch (error) {
            console.error("Error creating category:", category);
            throw error;
        }
    },
    updateCategory: async (id: string, category: CategoryForm): Promise<Category> => {
        try {
            const response = await axiosClient.put(`/categories/${id}`, category)
            return response.data
        } catch (error) {
            console.error(`Error updating book with id ${id}:`, error);
            throw error;
        }
    },
    deleteCategory: async (id: string): Promise<Category> => {
        try {
            const response = await axiosClient.delete(`/categories/${id}`)
            return response.data
        } catch (error) {
            console.error(`Error deleting book with id ${id}:`, error);
            throw error;
        }
    }
}

export default categoryApi