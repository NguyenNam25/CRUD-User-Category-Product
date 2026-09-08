import TableUser from "@/components/user/TableUser";
import CustomBreadcrumb from "@/components/Components/CustomBreadcrumb";
import { columns } from "@/components/user/columns";

export default async function User() {
  return (
    <div className="my-6 px-4">
      <CustomBreadcrumb prop="User" />
      <h2 className="text-2xl my-5">List of User</h2>
      <TableUser columns={columns} />
    </div>
  );
}
