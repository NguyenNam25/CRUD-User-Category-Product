import axios from "axios";
import type { Product, ProductDisplay } from "@/types/product";
import type { Category } from "@/types/category";

const productApi = {
    getAllProducts: async (): Promise<ProductDisplay[]> => {
        const resproducts = await axios.get("/api/products");
        const rescategories = await axios.get("/api/categories");
        const response = resproducts.data.map((product: any) => ({
            ...product,
            category: rescategories.data.find((category: Category) => category.id === product.categoryId),
        }))
        return response
    },
    getProductById: async (id: number): Promise<ProductDisplay> => {
        const product = await axios.get(`/api/products/${id}`)
        const rescategories = await axios.get("/api/categories");
        const response = {
            ...product.data,
            category: rescategories.data.find((category: Category) => category.id === product.data.categoryId),
        }
        return response
    },
    createProduct: async (product: Product): Promise<Product> => {
        try {
            const response = await axios.post("/api/products", product)
            return response.data;
        } catch (error) {
            console.error("Error creating product:", product);
            throw error;
        }
    },
    updateProduct: async (id: number, product: Product): Promise<Product> => {
        try {
            const response = await axios.put(`/api/products/${id}`, product)
            return response.data
        } catch (error) {
            console.error(`Error updating book with id ${id}:`, error);
            throw error;
        }
    },
    deleteProduct: async (id: number): Promise<Product> => {
        try {
            const response = await axios.delete(`/api/products/${id}`)
            return response.data
        } catch (error) {
            console.error(`Error deleting book with id ${id}:`, error);
            throw error;
        }
    }
}
export default productApi;