"use client";

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
import type { Product, ProductForm } from "@/types/product";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import productApi from "@/api/Routes/productApi";
import CategorySelect from "./CategorySelect";

export default function UpdateProduct({
  data,
  open,
  onOpenChange,
}: {
  data: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { register, handleSubmit, reset, control } = useForm<ProductForm>({
    defaultValues: {
      name: data.name,
      price: data.price,
      categoryId: data.categoryId,
      description: data.description,
    },
  });

  const queryClient = useQueryClient();

  const updateProductMutation = useMutation({
    mutationFn: ({ id, product }: { id: number; product: ProductForm }) =>
      productApi.updateProduct(id, product),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("Product updated successfully");
      onOpenChange(false);
    },

    onError: () => {
      toast.error("Failed to update category");
    },
  });

  const onUpdate = (formData: ProductForm) => {
    console.log(formData);
    updateProductMutation.mutate({
      id: data.id,
      product: {
        name: formData.name,
        price: formData.price,
        categoryId: formData.categoryId,
        description: formData.description,
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl!">
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
          <DialogDescription>Update information of product</DialogDescription>
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
                {...register("price", { valueAsNumber: true })}
                id="price"
                type="number"
              />
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
                placeholder="Description"
                className="h-32 max-h-32 overflow-y-auto"
              />
            </Field>
            <div className="flex justify-end">
              <Button
                type="button"
                onClick={() =>
                  reset({
                    name: data.name,
                    price: data.price,
                    categoryId: data.categoryId,
                    description: data.description,
                  })
                }
              >
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
