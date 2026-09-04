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

export default function UpdateProduct({ data }: { data: Product }) {
  const { register, handleSubmit, reset } = useForm<Product>({
    defaultValues: {
      name: data.name,
      price: data.price,
      categoryId: data.categoryId,
      description: data.description
    },
  });

  const onUpdate = (data: Product) => {
    try {
      console.log(data);
      toast.success("User updated succesfully");
    } catch (error) {
      toast.error("Failed to update User");
    }
  };

  return (
    <Dialog>
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
                {...register("price")}
                id="price"
                type="price"
                placeholder="example@gmail.com"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="categoryId">Category</FieldLabel>
              <Input
                {...register("categoryId")}
                id="categoryId"
                type="text"
                placeholder="Enter Password"
              />
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
              <Button type="reset">Reset</Button>
              <Button type="submit">Submit</Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
