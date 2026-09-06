"use client"

import productApi from "@/api/Routes/productApi";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import categoryApi from "@/api/Routes/categoryApi";

export default function Home() {
  const {data, isLoading, isError} = useQuery({
    queryKey: ["categories"],
    queryFn: categoryApi.getAllCategories,
  })

  return (
    <div>
      Home
    </div>
  );
}
