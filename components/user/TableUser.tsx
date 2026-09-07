"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AlertDialogDelete from "../Components/AlertDialogDelete";
import UpdateUser from "./UpdateUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import userApi from "@/api/Routes/userApi";
import { toast } from "sonner";

export default function TableUser() {
  const {data, isLoading, isError} = useQuery({
    queryKey:["users"],
    queryFn: userApi.getAllUsers
  })

  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationFn: userApi.deleteUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"]
      });
      toast.success("Deleted succesfully")
    },

    onError: (error) => {
      toast.error("Deleted failed")
    }
  })

  const handleDeleteUser = (id: number) => {
    deleteUserMutation.mutate(id)
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Password</TableHead>
          <TableHead>Interact</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.fullname}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.password}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <UpdateUser data={user} />
                <AlertDialogDelete
                  id={user.id}
                  type="user"
                  onDelete={handleDeleteUser}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
