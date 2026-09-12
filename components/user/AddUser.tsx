"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import type { User, UserRegister } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userSchema } from "@/schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import authApi from "@/api/Routes/authApi";
import UserField from "./UserField";

export default function AddUser() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserRegister>({
    resolver: zodResolver(userSchema),
  });

  const queryClient = useQueryClient();

  const addUserMutation = useMutation({
    mutationFn: authApi.register,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("Create succesfully");
      reset();
      setOpen(false);
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);

        toast.error(error.response?.data || "Đăng ký thất bại");
      }
    },
  });

  const onSubmit = async (data: UserRegister) => {
    addUserMutation.mutate({
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
          <UserField register={register} errors={errors} reset={reset}/>
        </form>
      </DialogContent>
    </Dialog>
  );
}
