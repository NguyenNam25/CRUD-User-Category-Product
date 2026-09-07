import ListLayout from "@/components/ui/ListLayout";
import ListHeaderLayout from "@/components/ui/ListHeaderLayout";
import AddUser from "@/components/user/AddUser";
import TableUser from "@/components/user/TableUser";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import CustomBreadcrumb from "@/components/Components/CustomBreadcrumb";

export default function User() {
  return (
    <div className="my-6">
      <CustomBreadcrumb prop="User"/>
      <ListLayout>
        <ListHeaderLayout content="User" AddComponent={<AddUser />} />
        <TableUser />
      </ListLayout>
    </div>
  );
}
