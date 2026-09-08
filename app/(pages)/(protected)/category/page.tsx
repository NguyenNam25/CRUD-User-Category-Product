import TableCategory from "@/components/category/TableCategory";
import CustomBreadcrumb from "@/components/Components/CustomBreadcrumb";
import { columns } from "@/components/category/columns";

export default function Category() {
  return (
    <div className="my-6 px-4">
      <CustomBreadcrumb prop="Category" />
      <h2 className="text-2xl my-5">List of Category</h2>
      <TableCategory columns={columns} />
    </div>
  );
}
