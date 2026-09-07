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
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import type { Product } from "@/types/product";
import { Textarea } from "../ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import productApi from "@/api/Routes/productApi";
import CategorySelect from "./CategorySelect";

export default function AddProduct() {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset, control } = useForm<Product>({
    defaultValues: {
      categoryId: 0,
    },
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

  const onSubmit = async (data: Product) => {
    console.log(data)
    const products = await productApi.getAllProducts();

    const exists = products.some(
      (product) => product.id === data.id,
    );

    if (exists) {
      toast.error("product ID already exists");
      return;
    }

    createProductMutation.mutate({
      id: data.id,
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
              <FieldLabel htmlFor="id">ID</FieldLabel>
              <Input
                {...register("id", {
                  valueAsNumber: true,
                  min: { value: 1, message: "value must greater than 1" },
                })}
                id="id"
                type="number"
                placeholder="id"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="name">Product Name</FieldLabel>
              <Input {...register("name")} id="name" type="text" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="price">Price</FieldLabel>
              <Input
                {...register("price", { valueAsNumber: true })}
                id="price"
                type="number"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="categoryId">Category</FieldLabel>
              <CategorySelect control={control}/>
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
