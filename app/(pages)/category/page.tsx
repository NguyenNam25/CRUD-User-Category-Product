import { categories } from "@/data/categories";
import AddCategory from "@/components/category/AddCategory";
import TableCategory from "@/components/category/TableCategory";
import ListLayout from "@/components/ui/ListLayout";
import ListHeaderLayout from "@/components/ui/ListHeaderLayout";

export default function Category() {
  return (
    <ListLayout>
      <ListHeaderLayout content="Category" AddComponent={<AddCategory />}/>
      <TableCategory data={categories} />
    </ListLayout>
  );
}
