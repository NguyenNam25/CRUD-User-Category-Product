import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";
import NavigationBar from "@/components/Components/NavigationBar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NavigationBar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
