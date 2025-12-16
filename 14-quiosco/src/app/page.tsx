import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4 md:p-6 xl:p-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-8 xl:mb-12">
        <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold bg-linear-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-3 xl:mb-4">
          Bienvenido a Quiosco
        </h1>
        <p className="text-sm md:text-base xl:text-xl text-slate-600 mb-6 xl:mb-8">
          El mejor lugar para disfrutar de comida deliciosa
        </p>
        <Link
          href="/order/cafe"
          className="inline-block px-5 py-2.5 xl:px-8 xl:py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white text-sm xl:text-base font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          Comenzar a Ordenar
        </Link>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xl:gap-8 mb-8 xl:mb-12">
        <div className="text-center p-3 xl:p-6 bg-white rounded-lg shadow-sm">
          <div className="text-3xl xl:text-6xl mb-2 xl:mb-4">🍔</div>
          <h3 className="text-base xl:text-xl font-bold text-slate-800 mb-1.5 xl:mb-2">
            Menú Variado
          </h3>
          <p className="text-xs xl:text-base text-slate-600 leading-relaxed">
            Cafés, hamburguesas, pizzas, donas, pasteles y galletas
          </p>
        </div>
        <div className="text-center p-3 xl:p-6 bg-white rounded-lg shadow-sm">
          <div className="text-3xl xl:text-6xl mb-2 xl:mb-4">⚡</div>
          <h3 className="text-base xl:text-xl font-bold text-slate-800 mb-1.5 xl:mb-2">
            Rápido y Fácil
          </h3>
          <p className="text-xs xl:text-base text-slate-600 leading-relaxed">
            Ordena en minutos y recibe notificaciones cuando esté listo
          </p>
        </div>
        <div className="text-center p-3 xl:p-6 bg-white rounded-lg shadow-sm">
          <div className="text-3xl xl:text-6xl mb-2 xl:mb-4">💳</div>
          <h3 className="text-base xl:text-xl font-bold text-slate-800 mb-1.5 xl:mb-2">
            Pago Seguro
          </h3>
          <p className="text-xs xl:text-base text-slate-600 leading-relaxed">
            Realiza tus pedidos de forma segura y confiable
          </p>
        </div>
      </div>

      {/* Categories Preview */}
      <div className="mt-8 xl:mt-12">
        <h2 className="text-xl xl:text-3xl font-bold text-slate-800 mb-4 xl:mb-6 text-center">
          Nuestras Categorías
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 xl:gap-6">
          {[
            { name: "Café", slug: "cafe", emoji: "☕" },
            { name: "Hamburguesas", slug: "hamburguesa", emoji: "🍔" },
            { name: "Pizzas", slug: "pizza", emoji: "🍕" },
            { name: "Donas", slug: "dona", emoji: "🍩" },
            { name: "Pasteles", slug: "pastel", emoji: "🍰" },
            { name: "Galletas", slug: "galletas", emoji: "🍪" },
          ].map((category) => (
            <Link
              key={category.slug}
              href={`/order/${category.slug}`}
              className="p-3 xl:p-6 rounded-lg xl:rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 border border-purple-100 hover:border-purple-300 text-center group"
            >
              <div className="text-2xl xl:text-5xl mb-1.5 xl:mb-3">{category.emoji}</div>
              <h3 className="text-xs xl:text-lg font-semibold text-slate-800 group-hover:text-purple-600 transition-colors leading-tight">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
