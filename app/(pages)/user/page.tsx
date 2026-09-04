import { users } from "@/data/users";
import ListLayout from "@/components/ui/ListLayout";
import ListHeaderLayout from "@/components/ui/ListHeaderLayout";
import AddUser from "@/components/user/AddUser";
import TableUser from "@/components/user/TableUser";

export default function User() {
  return (
    <ListLayout>
      <ListHeaderLayout content="User" AddComponent={<AddUser />} />
      <TableUser data={users} />
    </ListLayout>
  );
}
