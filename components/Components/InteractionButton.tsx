import React from "react";
import UpdateCategory from "../category/UpdateCategory";
import AlertDialogDelete from "./AlertDialogDelete";

type ActionProps<T> = {
  item: T;
  type: "category" | "product" | "user";
  onDelete: (id: number) => void;
};

export default function InteractionButton<T extends { id: number }>({
  item,
  type,
  onDelete,
}: ActionProps<T>) {
  return (
    // <div className="flex gap-2">
    //   <UpdateCategory data={item} />
    //   <AlertDialogDelete
    //     id={item.id}
    //     type={type}
    //     onDelete={onDelete}
    //   />
    // </div>
    <></>
  );
}
