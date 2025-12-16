import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { notFound } from "next/navigation";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const productId = parseInt(id);

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id: productId },
    }),
    prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  if (!product) {
    notFound();
  }

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
          Editar Producto
        </h1>
        <p className="text-slate-400">
          Actualiza la información del producto: {product.name}
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-8">
        <ProductForm categories={categories} product={product} />
      </div>
    </div>
  );
}
