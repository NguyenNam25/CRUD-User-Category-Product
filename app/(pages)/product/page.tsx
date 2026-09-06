import { products } from "@/data/products";
import ListLayout from "@/components/ui/ListLayout";
import ListHeaderLayout from "@/components/ui/ListHeaderLayout";
import AddProduct from "@/components/product/AddProduct";
import TableProduct from "@/components/product/TableProduct";

export default function Product() {
  return (
    <ListLayout>
      <ListHeaderLayout content="Product" AddComponent={<AddProduct />} />
      <TableProduct />
    </ListLayout>
  );
}
