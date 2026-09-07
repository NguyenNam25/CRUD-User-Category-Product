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
import type { User } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userApi from "@/api/Routes/userApi";

export default function AddUser() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>();

  const queryClient = useQueryClient();

  const addUserMutation = useMutation({
    mutationFn: userApi.createUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("Create succesfully");
      reset();
      setOpen(false);
    },

    onError: (error) => {
      toast.error("Create failed");
    },
  });

  const onSubmit = async (data: User) => {
    console.log(data);
    const users = await userApi.getAllUsers();

    const exists = users.some((user) => user.id === data.id);

    if (exists) {
      toast.error("User ID already exists");
      return;
    }

    addUserMutation.mutate({
      id: data.id,
      fullname: data.fullname,
      email: data.email,
      password: data.password,
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
          <DialogTitle>New User</DialogTitle>
          <DialogDescription>Add new user</DialogDescription>
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
              <FieldLabel htmlFor="fullname">Full Name</FieldLabel>
              <Input
                {...register("fullname", {
                  minLength: {
                    value: 1,
                    message: "Full Name must contain at least 1 character",
                  },
                })}
                id="fullname"
                type="text"
                placeholder="Enter Full Name"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...register("email", {
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "invalid email ",
                  },
                })}
                id="email"
                type="email"
                placeholder="example@gmail.com"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                {...register("password", {
                  minLength: {
                    value: 6,
                    message: "Password must contain at least 6 character",
                  },
                  pattern: {
                    value: /[A-Za-z]/,
                    message: "Password must contain at least 1 character",
                  },
                })}
                id="password"
                type="text"
                placeholder="Enter Password"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
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
