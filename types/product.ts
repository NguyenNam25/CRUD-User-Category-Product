import { CategoryForm } from "./category";

export interface Product {
  id:string;
  productId: number,
  name: string,
  price: number,
  categoryId: number,
  description: string
}

export interface ProductForm {
  productId: number,
  name: string,
  price: number,
  categoryId: number,
  description: string
}

export interface ProductDisplay {
  id:string;
  productId: number,
  name: string,
  price: number,
  categoryId: number,
  description: string
  category: CategoryForm
}