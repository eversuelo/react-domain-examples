import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Administración de Productos
          </h1>
          <p className="text-slate-400">
            Gestiona el catálogo de productos del quiosco
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
        >
          + Nuevo Producto
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-linear-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg p-6">
          <p className="text-slate-400 text-sm mb-1">Total Productos</p>
          <p className="text-3xl font-bold text-white">{products.length}</p>
        </div>
        <div className="bg-linear-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-lg p-6">
          <p className="text-slate-400 text-sm mb-1">Categorías</p>
          <p className="text-3xl font-bold text-white">
            {new Set(products.map((p) => p.categoryId)).size}
          </p>
        </div>
        <div className="bg-linear-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-lg p-6">
          <p className="text-slate-400 text-sm mb-1">Precio Promedio</p>
          <p className="text-3xl font-bold text-white">
            $
            {products.length > 0
              ? (
                  products.reduce((sum, p) => sum + p.price, 0) /
                  products.length
                ).toFixed(2)
              : 0}
          </p>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-slate-700/30 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-700/50 flex-shrink-0">
                        {product.image ? (
                          <Image
                            src={`/products/${product.image}.jpg`}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-500">
                            📦
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {product.name}
                        </p>
                        <p className="text-slate-400 text-sm">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-600/20 text-purple-300 border border-purple-500/30">
                      {product.category.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-white font-semibold">
                      ${product.price.toFixed(2)}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-400 text-sm">
                      {new Date(product.createdAt).toLocaleDateString("es-MX")}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="px-4 py-2 bg-blue-600/20 text-blue-300 border border-blue-500/30 rounded-lg text-sm font-medium hover:bg-blue-600/30 transition-all duration-200"
                      >
                        Editar
                      </Link>
                      <DeleteProductButton
                        productId={product.id}
                        productName={product.name}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg mb-4">
              No hay productos registrados
            </p>
            <Link
              href="/admin/products/new"
              className="inline-block px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
            >
              Crear Primer Producto
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
