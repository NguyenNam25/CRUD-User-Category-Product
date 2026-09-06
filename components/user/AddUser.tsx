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
import type { User, UserForm } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userApi from "@/api/Routes/userApi";

export default function AddUser() {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<User>();

  const queryClient = useQueryClient();

  const addUserMutation = useMutation({
    mutationFn: userApi.createUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:["users"]
      })
      toast.success("Create succesfully")
      reset();
      setOpen(false)
    },

    onError: (error) => {
      toast.error("Create failed")
    }
  })

  const onSubmit = (data: UserForm) => {
    addUserMutation.mutate({
      userId: data.userId,
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    })
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
              <FieldLabel htmlFor="userId">ID</FieldLabel>
              <Input
                {...register("userId", {valueAsNumber:true})}
                id="userId"
                type="number"
                placeholder="id"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="fullname">Full Name</FieldLabel>
              <Input
                {...register("fullname")}
                id="fullname"
                type="text"
                placeholder="Enter Full Name"
              />
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
