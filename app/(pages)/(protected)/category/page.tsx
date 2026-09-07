import AddCategory from "@/components/category/AddCategory";
import TableCategory from "@/components/category/TableCategory";
import ListLayout from "@/components/ui/ListLayout";
import ListHeaderLayout from "@/components/ui/ListHeaderLayout";
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

export default function Category() {
  return (
    <div className="my-6">
      <CustomBreadcrumb prop="Product"/>
      <ListLayout>
        <ListHeaderLayout content="Category" AddComponent={<AddCategory />} />
        <TableCategory />
      </ListLayout>
    </div>
  );
}
