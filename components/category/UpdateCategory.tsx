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
import type { Category } from "@/types/category";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function UpdateCategory({data}: {data:Category}) {
  const { register, handleSubmit, reset } = useForm<Category>({
    defaultValues: {
        name: data.name
    }
  });

  const onUpdate = (data: Category) => {
    try {
      console.log(data);
      toast.success("Category updated succesfully")
    } catch (error) {
        toast.error("Failed to update category")
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
              <FieldLabel htmlFor="name">Category Name</FieldLabel>
              <Input
                {...register("name")}
                id="name"
                type="text"
              />
            </Field>
            <div className="flex justify-end">
              <Button type="button" onClick={() => reset({name:data.name})}>Reset</Button>
              <Button type="submit">Submit</Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
