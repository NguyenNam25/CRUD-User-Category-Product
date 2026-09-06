import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";
import NavigationBar from "@/components/Components/NavigationBar";
import Providers from "./providers";

export default function RootLayout({ children }: { children: ReactNode }) {
  
  return (
    <html lang="en">
      <body>
        <Providers>
          <NavigationBar />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
