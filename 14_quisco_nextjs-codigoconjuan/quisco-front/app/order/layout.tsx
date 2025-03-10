import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css"
import OrderSideBar from "@/components/order/OrderSideBar";
import OrderSummary from "@/components/order/OrderSummary";
import ToastNotification from "@/components/ui/ToastNotification";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quisco Next.js con App Router y Prisma",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex h-screen flex-col-reverse md:flex-row">
        <OrderSideBar />
        <main className="md:flex-1 max-h-screen md:overflow-y-scroll">
          {children}
        </main>
        <OrderSummary />
        <ToastNotification />
      </div>
    </>
  );
}