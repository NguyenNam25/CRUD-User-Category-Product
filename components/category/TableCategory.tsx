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
import type { Category } from "@/types/category";

export default function TableCategory({ data }: { data: Category[] }) {
  const handleDeleteCategory = (id: number) => {
    console.log("Delete category:", id);
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
        {data.map((category) => (
          <TableRow key={category.id}>
            <TableCell>{category.id}</TableCell>
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
