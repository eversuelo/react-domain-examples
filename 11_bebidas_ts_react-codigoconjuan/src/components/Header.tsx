import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { useAppStore } from "../stores/useAppStore";
import type { Category } from "../types";

export default function Header() {
    const [searchFilters, setSearchFilters] = useState({
        ingredient: "",
        category: "",
    });
    const [searchLoading, setSearchLoading] = useState(false);
    const searchRecipes = useAppStore((state) => state.searchRecipes);
    const location = useLocation();
    const isHome = useMemo(() => location.pathname === "/", [location]);

    const fetchCategories = useAppStore((state) => state.fetchCategories);
    const categories: Category[] = useAppStore((state) => state.categories);
    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value,
        });
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!searchFilters.ingredient && !searchFilters.category) return;

        setSearchLoading(true);
        await searchRecipes(searchFilters);
        setSearchLoading(false);
    };

    const handleReset = () => {
        setSearchFilters({
            ingredient: "",
            category: "",
        });
    };
    return (
        <header className={`bg-slate-800 ${isHome ? "bg-header bg-cover bg-center bg-no-repeat" : ""} shadow-lg relative`}>
            {/* Loading Spinner Overlay */}
            {searchLoading && (
                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
                        <p className="text-orange-400 font-semibold text-lg animate-pulse">Buscando bebidas...</p>
                    </div>
                </div>
            )}

            <div className="container mx-auto px-5 py-16">
                <div className="flex items-center justify-between">
                    <div>
                        <img className="w-32" src="/logo.svg" alt="logotipo" />
                    </div>
                    <nav className="flex gap-4">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-orange-500 uppercase font-bold"
                                    : "text-white uppercase font-bold"
                            }
                        >
                            Inicio
                        </NavLink>
                        <NavLink
                            to="/favorites"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-orange-500 uppercase font-bold"
                                    : "text-white uppercase font-bold"
                            }
                        >
                            Favoritos
                        </NavLink>
                        <NavLink
                            to="/ai-creator"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-orange-500 uppercase font-bold"
                                    : "text-white uppercase font-bold"
                            }
                        >
                            Crear con IA
                        </NavLink>
                    </nav>
                </div>
                {isHome && (
                    <form className="mt-12" onSubmit={handleSubmit}>
                        <div className="max-w-4xl mx-auto">
                            {/* Main Card */}
                            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-700/50 backdrop-blur-sm">
                                {/* Title Section */}
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-2">
                                        🍹 Encuentra tu Bebida Perfecta
                                    </h2>
                                    <p className="text-slate-400 text-sm">Busca entre miles de recetas de cócteles</p>
                                </div>

                                {/* Search Input Section */}
                                <div className="mb-6">
                                    <label htmlFor="ingredient" className="block text-slate-300 font-semibold text-sm mb-3 ml-1">
                                        Ingredientes
                                    </label>
                                    <div className="relative group">
                                        <input
                                            className="w-full rounded-xl border-2 border-slate-700 bg-slate-950/50 px-5 py-4 text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all duration-300 group-hover:border-slate-600"
                                            type="text"
                                            name="ingredient"
                                            id="ingredient"
                                            placeholder="Ej: Margarita, Vodka, Mojito..."
                                            value={searchFilters.ingredient}
                                            onChange={handleChange}
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                    </div>
                                </div>

                                {/* category Filter Section */}
                                <div className="mb-6">
                                    <label htmlFor="category" className="block text-slate-300 font-semibold text-sm mb-3 ml-1">
                                        Categoría Principal
                                    </label>
                                    <div className="relative group">
                                        <select
                                            id="category"
                                            name="category"
                                            value={searchFilters.category}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border-2 border-slate-700 bg-slate-950/50 px-5 py-4 text-white focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all duration-300 appearance-none cursor-pointer group-hover:border-slate-600"
                                        >
                                            <option value="">-- Selecciona una categoría --</option>
                                            {categories.map((category: Category) => (
                                                <option key={category.strCategory} value={category.strCategory}>
                                                    {category.strCategory}
                                                </option>
                                            ))}
                                        </select>
                                        {/* Custom dropdown arrow */}
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <svg className="w-5 h-5 text-slate-400 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <button
                                        type="submit"
                                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 active:scale-95 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 uppercase shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        Buscar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="bg-slate-700/50 hover:bg-slate-600/50 active:scale-95 text-slate-300 font-bold px-8 py-4 rounded-xl transition-all duration-200 uppercase border border-slate-600/50 hover:border-slate-500 flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Limpiar
                                    </button>
                                </div>


                            </div>
                        </div>
                    </form>
                )}
            </div>
        </header>
    )
}   