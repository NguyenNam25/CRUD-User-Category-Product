"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UpdateCategory from "./UpdateCategory";
import AlertDialogDelete from "../Components/AlertDialogDelete";
import categoryApi from "@/api/Routes/categoryApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function TableCategory() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryApi.getAllCategories,
  })

  const queryClient = useQueryClient();

  const deleteCategoryMutation = useMutation({
    mutationFn: categoryApi.deleteCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      toast.success("Delete successfully")
    },

    onError: (error) => {
      toast.error("Delete failed")
    }
  })

  const handleDeleteCategory = (id: string) => {
    deleteCategoryMutation.mutate(id)
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Interact</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((category) => (
          <TableRow key={category.categoryId}>
            <TableCell>{category.categoryId}</TableCell>
            <TableCell>{category.name}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <UpdateCategory data={category} />
                <AlertDialogDelete
                  id={category.id}
                  type="category"
                  onDelete={handleDeleteCategory}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
