import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const menus = [
  { text: "Home", href: "/"},
  { text: "User", href: "/user" },
  { text: "Product", href: "/product" },
  { text: "Category", href: "/category" },
  { text: "Login", href: "/login" },
];

export default function NavigationBar() {
  return (
    <NavigationMenu className="w-full max-w-none px-2 ">
          <NavigationMenuList className="flex w-full">
            {menus.map((menu) => (
              <NavigationMenuItem
                key={menu.href}
                className={menu.text === "Login" ? "ml-auto" : ""}
              >
                <NavigationMenuLink href={menu.href} className="text-xl">
                  {menu.text}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
  )
}
