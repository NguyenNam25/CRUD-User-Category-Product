"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Category, CategoryForm } from "@/types/category";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import categoryApi from "@/api/Routes/categoryApi";

export default function UpdateCategory({
  data,
  open,
  onOpenChange,
}: {
  data: Category;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { register, handleSubmit, reset } = useForm<CategoryForm>({
    defaultValues: {
      name: data.name
    }
  });

  const queryClient = useQueryClient();

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, category }: { id: number; category: CategoryForm }) => categoryApi.updateCategory(id, category),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"]
      });
      toast.success("Category added successfully");
      onOpenChange(false);
    },

    onError: () => {
      toast.error("Failed to add category")
    }
  })

  const onUpdate = (formData: CategoryForm) => {
    updateCategoryMutation.mutate({
      id: data.id,
      category: {
        name: formData.name
      }
    })
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
