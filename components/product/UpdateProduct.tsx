"use client";

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
import type { Product } from "@/types/product";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import productApi from "@/api/Routes/productApi";
import CategorySelect from "./CategorySelect";

export default function UpdateProduct({ data }: { data: Product }) {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset, control } = useForm<Product>({
    defaultValues: {
      name: data.name,
      price: data.price,
      categoryId: data.categoryId,
      description: data.description
    },
  });

  const queryClient = useQueryClient();

  const updateProductMutation = useMutation({
    mutationFn: ({ id, product }: { id: number; product: Product }) => productApi.updateProduct(id, product),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"]
      });
      toast.success("Product updated successfully");
      setOpen(false);
    },

    onError: () => {
      toast.error("Failed to update category")
    }
  })

  const onUpdate = (formData: Product) => {
    console.log(formData)
    updateProductMutation.mutate({
      id: data.id,
      product: {
        id: data.id,
        name: formData.name,
        price: formData.price,
        categoryId: formData.categoryId,
        description: formData.description,
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
              <FieldLabel htmlFor="name">Product Name</FieldLabel>
              <Input {...register("name")} id="name" type="text" />
            </Field>
            <Field>
              <FieldLabel htmlFor="price">Price</FieldLabel>
              <Input
                {...register("price", {valueAsNumber:true})}
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
                placeholder="Description"
                className="h-32 max-h-32 overflow-y-auto"
              />
            </Field>
            <div className="flex justify-end">
              <Button type="button"
                onClick={() =>
                  reset({
                    name: data.name,
                    price: data.price,
                    categoryId: data.categoryId,
                    description: data.description,
                  })
                }>Reset</Button>
              <Button type="submit">Submit</Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
