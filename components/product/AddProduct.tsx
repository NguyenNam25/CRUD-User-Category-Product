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
import type { ProductForm } from "@/types/product";
import { Textarea } from "../ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import productApi from "@/api/Routes/productApi";
import CategorySelect from "./CategorySelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/schemas/productSchema";

export default function AddProduct() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ProductForm>({
    defaultValues: {
      categoryId: 0,
    },
    resolver: zodResolver(productSchema),
  });

  const queryClient = useQueryClient();

  const createProductMutation = useMutation({
    mutationFn: productApi.createProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("Product add succesfully");
      reset();
      setOpen(false);
    },

    onError: (error) => {
      toast.error("Failed to add new product");
    },
  });

  const onSubmit = async (data: ProductForm) => {
    createProductMutation.mutate({
      name: data.name,
      price: data.price,
      categoryId: data.categoryId,
      description: data.description,
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
          <DialogTitle>New Product</DialogTitle>
          <DialogDescription>Add new product</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Product Name</FieldLabel>
              <Input {...register("name")} id="name" type="text" required />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="price">Price</FieldLabel>
              <Input
                {...register("price", { valueAsNumber: true })}
                id="price"
                type="number"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="categoryId">Category</FieldLabel>
              <CategorySelect control={control} />
            </Field>
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                {...register("description")}
                id="description"
                placeholder="Enter Description"
                className="h-32 max-h-32 overflow-y-auto"
              />
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
