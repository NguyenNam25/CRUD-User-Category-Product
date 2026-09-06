import axiosClient from "../axiosConfiguration"
import type { Product, ProductForm, ProductDisplay } from "@/types/product";
import type { Category, CategoryForm } from "@/types/category";

const productApi = {
    getAllProducts: async (): Promise<ProductDisplay[]> => {
        const resproducts = await axiosClient.get("/products");
        const rescategories = await axiosClient.get("/categories");
        const response = resproducts.data.map((product: any) => ({
            ...product,
            category: rescategories.data.find((category: CategoryForm) => category.categoryId === product.categoryId),
        }))
        return response
    },
    getProductById: async (id: string): Promise<ProductDisplay> => {
        const product = await axiosClient.get(`/products/${id}`)
        const rescategories = await axiosClient.get("/categories");
        const response = {
            ...product.data,
            productId: Number(product.data.productId),
            categoryId: Number(product.data.categoryId),
            category: rescategories.data.find((category: CategoryForm) => Number(category.categoryId) === Number(product.data.categoryId)),
        }
        return response
    },
    createProduct: async (product: ProductForm): Promise<Product> => {
        try {
            const response = await axiosClient.post("/products", product)
            return response.data;
        } catch (error) {
            console.error("Error creating product:", product);
            throw error;
        }
    },
    updateProduct: async (id: string, product: ProductForm): Promise<Product> => {
        try {
            const response = await axiosClient.put(`/products/${id}`, product)
            return response.data
        } catch (error) {
            console.error(`Error updating book with id ${id}:`, error);
            throw error;
        }
    },
    deleteProduct: async (id: string): Promise<Product> => {
        try {
            const response = await axiosClient.delete(`/products/${id}`)
            return response.data
        } catch (error) {
            console.error(`Error deleting book with id ${id}:`, error);
            throw error;
        }
    }
}
export default productApi;