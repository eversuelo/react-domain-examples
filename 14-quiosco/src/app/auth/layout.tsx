import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import ToastNotification from "@/components/ui/ToastNotification";

export const metadata: Metadata = {
  title: "Autenticación - Quiosco",
  description: "Login y registro",
};

const font = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={font.className + " antialiased bg-slate-50"}>
        <ToastNotification />
        {children}
      </body>
    </html>
  );
}
