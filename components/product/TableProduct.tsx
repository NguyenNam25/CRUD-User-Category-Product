"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AlertDialogDelete from "../Components/AlertDialogDelete";
import UpdateUser from "./UpdateProduct";
import { Product } from "@/types/product";
import { categories } from "@/data/categories";

export default function TableProduct({ data }: { data: Product[] }) {
  const handleDeleteProduct = (id: number) => {
    console.log("Delete product:", id);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Interact</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>
              {
                categories.find(
                  (category) => category.id === product.categoryId,
                )?.name
              }
            </TableCell>
            <TableCell className="max-w-75 whitespace-normal wrap-break-word">
              {product.description}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <UpdateUser data={product} />
                <AlertDialogDelete
                  id={product.id}
                  type="user"
                  onDelete={handleDeleteProduct}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
