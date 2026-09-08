"use client";

import productApi from "@/api/Routes/productApi";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import categoryApi from "@/api/Routes/categoryApi";
import { useAuth } from "@/components/auth/AuthContext";
import NavigationBar from "@/components/Components/NavigationBar";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const cardItems = [
  { label: "user", route: "/user", className:"from-red-600 to-red-400"},
  { label: "product", route: "/product", className:"from-orange-600 to-orange-400"},
  { label: "category", route: "/category", className:"from-yellow-600 to-yellow-400"},
];

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-48 p-6 grid grid-cols-3 gap-4">
      {/* {cardItems.map((item) => (
        <Card
          className={`relative overflow-hidden bg-linear-to-br from-${item.color}-600 to-${item.color}-400 text-2xl text-white p-4 cursor-pointer`}
          onClick={() => router.push(item.route)}
          key={item.label}
        >
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 hover:bg-black/10" />
          <div className="flex items-center gap-3">
            <h1 className="capitalize">{item.label} Management</h1>
            <ArrowRight className="w-6 h-6" />
          </div>
        </Card>
      ))} */}
    </div>
  );
}
