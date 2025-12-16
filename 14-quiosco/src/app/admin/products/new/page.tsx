import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/products"
          className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-200 mb-4"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Volver a Productos
        </Link>
        <h1 className="text-3xl font-bold text-white mb-2">
          Crear Nuevo Producto
        </h1>
        <p className="text-slate-400">
          Agrega un nuevo producto al catálogo del quiosco
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-8">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}
