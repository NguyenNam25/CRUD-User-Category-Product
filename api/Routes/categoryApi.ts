import axios from "axios";
import type { Category } from "@/types/category";

const categoryApi = {
  getAllCategories: async (): Promise<Category[]> => {
    const response = await axios.get("/api/categories");
    return response.data.map((category: any) => category);
  },
  getCategoryById: async (id: number): Promise<Category> => {
    const response = await axios.get(`/api/categories/${id}`);
    return response.data;
  },
  createCategory: async (category: Category): Promise<Category> => {
    try {
      const response = await axios.post("/api/categories", category);
      return response.data;
    } catch (error) {
      console.error("Error creating category:", category);
      throw error;
    }
  },
  updateCategory: async (id: number, category: Category): Promise<Category> => {
    try {
      const response = await axios.put(`/api/categories/${id}`, category);
      return response.data;
    } catch (error) {
      console.error(`Error updating book with id ${id}:`, error);
      throw error;
    }
  },
  deleteCategory: async (id: number): Promise<Category> => {
    try {
      const response = await axios.delete(`/api/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting book with id ${id}:`, error);
      throw error;
    }
  },
};

export default categoryApi;
