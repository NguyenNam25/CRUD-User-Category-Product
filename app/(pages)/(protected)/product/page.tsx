import ListLayout from "@/components/ui/ListLayout";
import ListHeaderLayout from "@/components/ui/ListHeaderLayout";
import AddProduct from "@/components/product/AddProduct";
import TableProduct from "@/components/product/TableProduct";
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

export default function Product() {
  return (
    <div className="my-6">
      <CustomBreadcrumb prop="Product"/>
      <ListLayout>
        <ListHeaderLayout content="Product" AddComponent={<AddProduct />} />
        <TableProduct />
      </ListLayout>
    </div>
  );
}
