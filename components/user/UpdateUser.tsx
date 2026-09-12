"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { User, UserRegister } from "@/types/user";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userApi from "@/api/Routes/userApi";
import UserField from "./UserField";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/schemas/userSchema";

export default function UpdateUser({
  data,
  open,
  onOpenChange,
}: {
  data: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserRegister>({
    defaultValues: {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    },
    resolver: zodResolver(userSchema),
  });

  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationFn: ({ id, user }: { id: number; user: UserRegister }) =>
      userApi.updateUser(id, user),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("Update successfully");
      onOpenChange(false);
    },
  });

  const onUpdate = (formdata: UserRegister) => {
    updateUserMutation.mutate({
      id: data.id,
      user: {
        fullname: formdata.fullname,
        email: formdata.email,
        password: formdata.password,
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl!">
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
          <DialogDescription>Update information of user</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onUpdate)}>
          <UserField register={register} errors={errors} reset={reset} />
        </form>
      </DialogContent>
    </Dialog>
  );
}
