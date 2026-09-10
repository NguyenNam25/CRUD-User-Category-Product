"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "../auth/AuthContext";

const menus = [
  { text: "Home", href: "/" },
  { text: "User", href: "/user" },
  { text: "Product", href: "/product" },
  { text: "Category", href: "/category" },
];

export default function NavigationBar() {
  const { currentUser, isLoading, logout } = useAuth();

  if(isLoading){
    return null;
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
        {currentUser ? (
          <NavigationMenuItem
            key={"/"}
            className="ml-auto"
          >
            <DropdownMenu>
              <DropdownMenuTrigger className="text-xl">
                {currentUser.fullname}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={logout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </NavigationMenuItem>
        ) : (
          <NavigationMenuItem
            key={"/login"}
            className="ml-auto"
          >
            <NavigationMenuLink href={"/login"} className="text-xl">
              Login
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
