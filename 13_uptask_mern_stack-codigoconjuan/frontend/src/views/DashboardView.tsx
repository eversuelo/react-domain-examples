import { Link } from "react-router-dom"

export default function DashboardView() {
  return (
    <>
      <h1 className="text-5xl font-black">Mis Proyectos</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">Maneja y administra tus proyectos</p>
      <nav className="mt-6">
      <Link to="/projects/create" className="bg-blue-500 text-white p-3 rounded mt-5 hover:bg-blue-600 cursor-pointer transition-colors font-semibold">Crear Proyecto</Link>
      </nav>
    </>
  )
}
