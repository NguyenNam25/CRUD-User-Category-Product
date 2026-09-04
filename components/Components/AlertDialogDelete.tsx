"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { toast } from "sonner";

type AlertDialogDelete = {
  id: number;
  type: "category" | "product" | "user";
  onDelete: (id: number) => void;
};

export default function AlertDialogDelete({
  id,
  type,
  onDelete,
}: AlertDialogDelete) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    try {
      onDelete(id);
      toast.success(`${type} delete successfully`);
      setOpen(false);
    } catch (error) {
      toast.error(`Failed to delete ${type}`);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className={"py-1 px-2 text-white bg-red-600 rounded-md"}>Delete</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Category</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn chắc chắn muốn xóa?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
