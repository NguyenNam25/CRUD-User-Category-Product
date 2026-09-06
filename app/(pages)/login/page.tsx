"use client";

import userApi from "@/api/Routes/userApi";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
  } = useForm<LoginForm>()

  const loginMutation = useMutation({
    mutationFn: ({email, password}: {email: string, password: string}) => userApi.login(email, password),

    onSuccess: (user) => {
      console.log(`data from server: `,user)

      sessionStorage.setItem("user", JSON.stringify(user));

      toast.success("Login succesfully")

      router.push("/")
    },

    onError: () => {
      toast.error("Failed to login")
    }
  })

  const router = useRouter()

  const onSubmit = (data:LoginForm) => {
    loginMutation.mutate({
      email: data.email,
      password: data.password,
    })
    // router.push('/')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 space-y-12">
      <div className="w-full max-w-md border rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="email@example.com"
                // required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                {...register("password")}
                id="password"
                type="password"
                placeholder="Enter your password"
                // required
              />
            </Field>

            <Button type="submit">Login</Button>
          </FieldGroup>
        </form>
      </div>
    </main>
  );
}
