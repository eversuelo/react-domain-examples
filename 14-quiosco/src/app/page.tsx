export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-slate-800 mb-4">
        Bienvenido a Quiosco
      </h1>
      <p className="text-slate-600">
        Usa el menú lateral para navegar por la aplicación.
      </p>

      {/* Demo content */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="p-6 rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow duration-300 border border-slate-200"
          >
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              Card {item}
            </h3>
            <p className="text-slate-600">
              Contenido de ejemplo para demostrar el layout con sidebar.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
