"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Category = {
  id: number;
  name: string;
  slug: string;
};

type ProductFormProps = {
  categories: Category[];
  product?: {
    id: number;
    name: string;
    price: number;
    categoryId: number;
    image: string | null;
  };
};

export default function ProductForm({ categories, product }: ProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || "",
    categoryId: product?.categoryId || categories[0]?.id || "",
    image: product?.image || "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = product
        ? `/api/products/${product.id}`
        : "/api/products";
      
      const method = product ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          price: parseFloat(formData.price.toString()),
          categoryId: parseInt(formData.categoryId.toString()),
          image: formData.image || null,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el producto");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar el producto");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-slate-300 mb-2"
        >
          Nombre del Producto *
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          placeholder="Ej: Café Americano Grande"
        />
      </div>

      {/* Price Field */}
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-slate-300 mb-2"
        >
          Precio *
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            $
          </span>
          <input
            type="number"
            id="price"
            required
            min="0"
            step="0.01"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="w-full pl-8 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            placeholder="0.00"
          />
        </div>
      </div>

      {/* Category Field */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-slate-300 mb-2"
        >
          Categoría *
        </label>
        <select
          id="category"
          required
          value={formData.categoryId}
          onChange={(e) =>
            setFormData({ ...formData, categoryId: e.target.value })
          }
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Image Field */}
      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-slate-300 mb-2"
        >
          Nombre de Imagen (sin extensión)
        </label>
        <input
          type="text"
          id="image"
          value={formData.image}
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.value })
          }
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          placeholder="Ej: cafe_01"
        />
        <p className="mt-2 text-sm text-slate-400">
          El archivo debe estar en /public/products/ con extensión .jpg
        </p>
        
        {/* Image Preview */}
        {formData.image && (
          <div className="mt-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
            <p className="text-sm text-slate-300 mb-2">Vista previa:</p>
            <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-slate-700/50">
              <Image
                src={`/products/${formData.image}.jpg`}
                alt="Preview"
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting
            ? "Guardando..."
            : product
            ? "Actualizar Producto"
            : "Crear Producto"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 bg-slate-700 text-slate-300 font-semibold rounded-lg hover:bg-slate-600 transition-all duration-200"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
