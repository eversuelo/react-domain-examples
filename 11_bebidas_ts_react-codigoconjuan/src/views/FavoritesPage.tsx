import { useEffect, useMemo, useState } from "react";
import { useAppStore } from "../stores/useAppStore";
import DrinkCard from "../components/DrinkCard";
import RecipeModal from "../components/RecipeModal";
import { Drink } from "../utils/recipe-schema";

export default function FavoritesPage() {
    const favorites = useAppStore((state) => state.favorites);
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

    const hasFavorites = useMemo(() => favorites.length > 0, [favorites]);

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
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 mb-2">
                    ❤️ Mis Favoritos
                </h1>
                <p className="text-slate-400">
                    {hasFavorites
                        ? `Tienes ${favorites.length} ${favorites.length === 1 ? 'bebida favorita' : 'bebidas favoritas'}`
                        : 'Aún no has agregado ninguna bebida a favoritos'
                    }
                </p>
            </div>

            {hasFavorites ? (
                /* Favorites Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {favorites.map((drink, index) => (
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
            ) : (
                /* Empty State */
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
                    <div className="mb-6 relative">
                        <div className="w-32 h-32 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center border-2 border-slate-700/50">
                            <svg className="w-16 h-16 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center border-4 border-slate-800">
                            <span className="text-2xl">❤️</span>
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-300 mb-2">
                        No tienes favoritos aún
                    </h3>
                    <p className="text-slate-500 max-w-md mb-6">
                        Explora nuestro catálogo de bebidas y agrega tus favoritas haciendo clic en el corazón. ¡Así podrás encontrarlas fácilmente más tarde!
                    </p>
                    <a
                        href="/"
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span>Buscar Bebidas</span>
                    </a>
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
