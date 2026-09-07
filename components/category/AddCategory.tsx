"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import type { Category } from "@/types/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import categoryApi from "@/api/Routes/categoryApi";
import { categorySchema } from "@/schemas/categoryShema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AddCategory() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Category>({
    resolver: zodResolver(categorySchema),
  });

  const queryClient = useQueryClient();

  const createCategoryMutation = useMutation({
    mutationFn: categoryApi.createCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      toast.success("Category added successfully");
      reset();
      setOpen(false);
    },

    onError: () => {
      toast.error("Failed to add category");
    },
  });

  const onSubmit = async (data: Category) => {
    const categories = await categoryApi.getAllCategories();

    const exists = categories.some((category) => category.id === data.id);

    if (exists) {
      toast.error("Category ID already exists");
      return;
    }

    createCategoryMutation.mutate({
      id: data.id,
      name: data.name,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={"border py-1 px-2 rounded-lg text-white bg-black"}
      >
        Add
      </DialogTrigger>
      <DialogContent className="max-w-2xl!">
        <DialogHeader>
          <DialogTitle>New Category</DialogTitle>
          <DialogDescription>Add new category</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="id">ID</FieldLabel>
              <Input
                {...register("id", { valueAsNumber: true })}
                id="id"
                type="number"
                placeholder="id"
              />
              {errors.id && (
                <p className="text-red-500 text-sm">{errors.id.message}</p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="name">Category Name</FieldLabel>
              <Input
                {...register("name")}
                id="name"
                type="text"
                placeholder="name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </Field>
            <div className="flex justify-end">
              <Button type="button" onClick={() => reset()}>
                Reset
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
