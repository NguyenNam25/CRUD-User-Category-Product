"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import type { Category } from "@/types/category";

export default function AddCategory() {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<Category>();

  const onSubmit = (data: Category) => {
    try {
      console.log(data);
      toast.success("Category added successfully");
      reset();
      setOpen(false);
    } catch (error) {
      toast.error("Failed to add category");
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
          <DialogTitle>New User</DialogTitle>
          <DialogDescription>Add new user</DialogDescription>
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
              <FieldLabel htmlFor="name">Category Name</FieldLabel>
              <Input
                {...register("name")}
                id="name"
                type="text"
                placeholder="name"
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
