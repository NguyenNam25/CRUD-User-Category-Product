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
import type { User } from "@/types/user";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function UpdateUser({ data }: { data: User }) {
  const { register, handleSubmit, reset } = useForm<User>({
    defaultValues: {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    },
  });

  const onUpdate = (data: User) => {
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
              <FieldLabel htmlFor="fullname">Full Name</FieldLabel>
              <Input {...register("fullname")} id="fullname" type="text" />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="example@gmail.com"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                {...register("password")}
                id="password"
                type="text"
                placeholder="Enter Password"
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
