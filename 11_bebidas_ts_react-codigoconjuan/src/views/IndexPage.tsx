import { useMemo, useState, useEffect } from "react";
import { useAppStore } from "../stores/useAppStore";
import DrinkCard from "../components/DrinkCard";
import RecipeModal from "../components/RecipeModal";
import { Drink } from "../utils/recipe-schema";

export default function IndexPage() {
    const recipes = useAppStore((state) => state.recipes);
    const addFavorite = useAppStore((state) => state.addFavorite);
    const removeFavorite = useAppStore((state) => state.removeFavorite);
    const isFavorite = useAppStore((state) => state.isFavorite);
    const loadFavorites = useAppStore((state) => state.loadFavorites);

    const [selectedDrinkId, setSelectedDrinkId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Load favorites on mount
    useEffect(() => {
        loadFavorites();
    }, [loadFavorites]);

    const hasDrinks = useMemo(() => recipes.length > 0, [recipes]);

    const handleViewRecipe = (drinkId: string) => {
        setSelectedDrinkId(drinkId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDrinkId(null);
    };

    const handleToggleFavorite = (drink: Drink) => {
        if (isFavorite(drink.idDrink)) {
            removeFavorite(drink.idDrink);
        } else {
            addFavorite(drink);
        }
    };

    // Color variants cycle
    const colorVariants: Array<"orange" | "purple" | "blue" | "green" | "pink"> = ["orange", "purple", "blue", "green", "pink"];

    return (
        <div className="container mx-auto px-5 py-12">
            {/* Results Section */}
            {hasDrinks ? (
                <>
                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-2">
                            Resultados de Búsqueda
                        </h2>
                        <p className="text-slate-400">
                            Encontramos <span className="text-orange-500 font-semibold">{recipes.length}</span> {recipes.length === 1 ? 'bebida' : 'bebidas'}
                        </p>
                    </div>

                    {/* Drinks Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {recipes.map((drink, index) => (
                            <DrinkCard
                                key={drink.idDrink}
                                drink={drink}
                                onViewRecipe={handleViewRecipe}
                                onToggleFavorite={handleToggleFavorite}
                                isFavorite={isFavorite(drink.idDrink)}
                                colorVariant={colorVariants[index % colorVariants.length]}
                            />
                        ))}
                    </div>
                </>
            ) : (
                /* Empty State */
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
                    <div className="mb-6 relative">
                        <div className="w-32 h-32 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center border-2 border-slate-700/50">
                            <svg className="w-16 h-16 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center border-4 border-slate-800">
                            <span className="text-2xl">🍹</span>
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-300 mb-2">
                        No hay bebidas para mostrar
                    </h3>
                    <p className="text-slate-500 max-w-md mb-6">
                        Utiliza el buscador de arriba para encontrar tu bebida perfecta. Puedes buscar por ingrediente o categoría.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                        <span className="text-sm text-slate-500">Intenta buscar:</span>
                        <span className="text-sm bg-slate-800/50 text-orange-400 px-3 py-1 rounded-full border border-slate-700/50">Margarita</span>
                        <span className="text-sm bg-slate-800/50 text-green-400 px-3 py-1 rounded-full border border-slate-700/50">Mojito</span>
                        <span className="text-sm bg-slate-800/50 text-yellow-400 px-3 py-1 rounded-full border border-slate-700/50">Vodka</span>
                    </div>
                </div>
            )}

            {/* Recipe Modal */}
            {selectedDrinkId && (
                <RecipeModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    drinkId={selectedDrinkId}
                />
            )}
        </div>
    );
}