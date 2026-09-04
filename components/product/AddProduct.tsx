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
import type { Product } from "@/types/product";
import { Textarea } from "../ui/textarea";

export default function AddProduct() {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<Product>();

  const onSubmit = (data: Product) => {
    try {
      console.log(data);
      toast.success("User added successfully");
      reset();
      setOpen(false);
    } catch (error) {
      toast.error("Failed to add user");
    }
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
                {...register("id")}
                id="id"
                type="number"
                placeholder="id"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="name">Product Name</FieldLabel>
              <Input {...register("name")} id="name" type="text" />
            </Field>
            <Field>
              <FieldLabel htmlFor="price">Price</FieldLabel>
              <Input
                {...register("price")}
                id="price"
                type="number"
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
                placeholder="Enter Description"
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
