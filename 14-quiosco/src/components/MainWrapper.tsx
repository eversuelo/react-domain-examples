"use client";

import { usePathname } from "next/navigation";

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <main
      className={`min-h-screen ${
        isAdminRoute
          ? "md:ml-72 xl:ml-60" // Solo margen izquierdo en admin
          : "md:ml-72 xl:ml-60 lg:mr-96 xl:mr-80" // Márgenes ambos lados en orden
      }`}
    >
      {children}
    </main>
  );
}
