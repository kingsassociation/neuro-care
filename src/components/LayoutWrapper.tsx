"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hide Navbar and Footer on dashboard and login pages
  const isDashboard = pathname.startsWith("/dashboard");
  const isLogin = pathname === "/login";
  const hideLayout = isDashboard || isLogin;

  return (
    <>
      {!hideLayout && <Navbar />}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      {!hideLayout && <Footer />}
    </>
  );
}
