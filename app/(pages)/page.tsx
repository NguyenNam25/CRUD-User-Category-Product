"use client";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";

const cardItems = [
  {
    label: "user",
    route: "/user",
    className: "bg-linear-to-br from-red-600 to-red-400",
  },
  {
    label: "product",
    route: "/product",
    className: "bg-linear-to-br from-orange-600 to-orange-400",
  },
  {
    label: "category",
    route: "/category",
    className: "bg-linear-to-br from-yellow-600 to-yellow-400",
  },
];

export default function Home() {
  const router = useRouter();

  const {currentUser} = useAuth();

  console.log(currentUser)
  return (
    <div className="h-48 p-6 grid grid-cols-3 gap-4">
      {cardItems.map((item) => (
        <Card
          className={`relative overflow-hidden text-2xl ${item.className} text-white p-4 cursor-pointer`}
          onClick={() => router.push(item.route)}
          key={item.label}
        >
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 hover:bg-black/10" />
          <div className="flex items-center gap-3">
            <h1 className="capitalize">{item.label} Management</h1>
            <ArrowRight className="w-6 h-6" />
          </div>
        </Card>
      ))}
      <p>password: t123456</p>
    </div>
  );
}
