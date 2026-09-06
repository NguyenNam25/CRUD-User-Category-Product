import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner"
import "@/app/globals.css";
import NavigationBar from "@/components/Components/NavigationBar";
import Providers from "./providers";
import AppContent from "@/components/Components/AppContent";

export default function RootLayout({ children }: { children: ReactNode }) {
  
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppContent>
            {children}
          </AppContent>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
