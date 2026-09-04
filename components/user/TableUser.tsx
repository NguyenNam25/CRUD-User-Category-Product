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
import type { User } from "@/types/user";
import AlertDialogDelete from "../Components/AlertDialogDelete";
import UpdateUser from "./UpdateUser";

export default function TableUser({ data }: { data: User[] }) {
  const handleDeleteUser = (id: number) => {
    console.log("Delete user:", id);
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
        {data.map((user) => (
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
