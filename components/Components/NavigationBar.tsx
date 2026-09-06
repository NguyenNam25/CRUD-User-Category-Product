"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useEffect, useState } from "react";

const menus = [
  { text: "Home", href: "/" },
  { text: "User", href: "/user" },
  { text: "Product", href: "/product" },
  { text: "Category", href: "/category" },
];

export default function NavigationBar() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading,setIsLoading] = useState(true)

  useEffect(() => {
    const user = sessionStorage.getItem("user")

    if (user) {
      setCurrentUser(JSON.parse(user))
    }

    setIsLoading(false)
  }, [])

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setCurrentUser(null);
  }

  return (
    <NavigationMenu className="w-full max-w-none px-2 ">
      <NavigationMenuList className="flex w-full">
        {menus.map((menu) => (
          <NavigationMenuItem
            key={menu.href}
          >
            <NavigationMenuLink href={menu.href} className="text-xl">
              {menu.text}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
        {!isLoading && (currentUser?(
          <NavigationMenuItem
          key={"/"}
          className="ml-auto"
        >
          <NavigationMenuLink onClick={handleLogout}  href={"/"} className="text-xl">
            Logout
          </NavigationMenuLink>
        </NavigationMenuItem>
        ):(
          <NavigationMenuItem
          key={"/login"}
          className="ml-auto"
        >
          <NavigationMenuLink href={"/login"} className="text-xl">
            Login
          </NavigationMenuLink>
        </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
