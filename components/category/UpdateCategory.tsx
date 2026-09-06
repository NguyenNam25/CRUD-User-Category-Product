"use client"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Category, CategoryForm } from "@/types/category";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import categoryApi from "@/api/Routes/categoryApi";
import { useState } from "react";

export default function UpdateCategory({ data }: { data: Category }) {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<Category>({
    defaultValues: {
      name: data.name
    }
  });

  const queryClient = useQueryClient();

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, category }: { id: string; category: CategoryForm }) => categoryApi.updateCategory(id, category),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"]
      });
      toast.success("Category added successfully");
      setOpen(false);
    },

    onError: () => {
      toast.error("Failed to add category")
    }
  })

  const onUpdate = (formData: Category) => {
    updateCategoryMutation.mutate({
      id: data.id,
      category: {
        categoryId: data.categoryId,
        name: formData.name
      }
    })
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={"py-1 px-2 text-white bg-blue-500 rounded-md"}>
        Update
      </DialogTrigger>
      <DialogContent className="max-w-2xl!">
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
          <DialogDescription>Update information of category</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onUpdate)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Category Name</FieldLabel>
              <Input
                {...register("name")}
                id="name"
                type="text"
              />
            </Field>
            <div className="flex justify-end">
              <Button type="button" onClick={() => reset({ name: data.name })}>Reset</Button>
              <Button type="submit">Submit</Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
