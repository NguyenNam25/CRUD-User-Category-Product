"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type {
  PasswordUpdate,
  User,
  UserRegister,
  UserUpdate,
} from "@/types/user";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userApi from "@/api/Routes/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PasswordUpdateSchema,
  updateUserSchema,
  userSchema,
} from "@/schemas/userSchema";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type ChangePassForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePassword({
  data,
  open,
  onOpenChange,
}: {
  data: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePassForm>({
    resolver: zodResolver(PasswordUpdateSchema),
  });

  const queryClient = useQueryClient();

  const updatePassMutation = useMutation({
    mutationFn: ({ id, password }: { id: number; password: PasswordUpdate }) =>
      userApi.ChangePassword(id, password),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("Update successfully");
      onOpenChange(false);
    },
  });

  const onUpdate = (formdata: ChangePassForm) => {
    updatePassMutation.mutate({
      id: data.id,
      password: {
        currentPassword: formdata.currentPassword,
        newPassword: formdata.newPassword,
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
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="password">Currnent Password</FieldLabel>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  className="pr-10"
                  {...register("currentPassword")}
                  id="currentPassword"
                  placeholder="Enter Current Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="text-red-500 text-sm">
                  {errors.currentPassword.message}
                </p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="password">New Password</FieldLabel>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  className="pr-10"
                  {...register("newPassword")}
                  id="password"
                  placeholder="Enter Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-sm">
                  {errors.newPassword.message}
                </p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  className="pr-10"
                  {...register("confirmPassword")}
                  id="confirmPassword"
                  placeholder="Enter Password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
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
