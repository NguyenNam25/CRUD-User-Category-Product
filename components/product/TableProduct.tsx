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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import productApi from "@/api/Routes/productApi";
import { toast } from "sonner";

export default function TableProduct() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: productApi.getAllProducts,
  })

  const queryClient = useQueryClient();
  
  const deleteProductMutation = useMutation ({
    mutationFn: productApi.deleteProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("Delete successfully")
    },

    onError: (error) => {
      toast.error("Delete failed")
    }
  })

  const handleDeleteProduct = (id: string) => {
    deleteProductMutation.mutate(id)
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
        {data?.map((product) => (
          <TableRow key={product.productId}>
            <TableCell>{product.productId}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>
              {product.category?.name}
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
