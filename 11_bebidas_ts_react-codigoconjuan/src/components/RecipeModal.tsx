import { useEffect, useState } from "react";
import { FullDrink } from "../utils/recipe-schema";
import { getDrinkById } from "../services/RecipeService";

type RecipeModalProps = {
    isOpen: boolean;
    onClose: () => void;
    drinkId: string;
};

export default function RecipeModal({ isOpen, onClose, drinkId }: RecipeModalProps) {
    const [recipe, setRecipe] = useState<FullDrink | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && drinkId) {
            setLoading(true);
            getDrinkById(drinkId).then((response) => {
                if (response.success && response.data?.drinks?.[0]) {
                    setRecipe(response.data.drinks[0]);
                }
                setLoading(false);
            });
        }
    }, [isOpen, drinkId]);

    // Helper function to get ingredients list
    const getIngredients = () => {
        if (!recipe) return [];
        const ingredients = [];
        for (let i = 1; i <= 15; i++) {
            const ingredient = recipe[`strIngredient${i}` as keyof FullDrink];
            const measure = recipe[`strMeasure${i}` as keyof FullDrink];
            if (ingredient && ingredient.trim()) {
                ingredients.push({
                    name: ingredient,
                    measure: measure || "",
                });
            }
        }
        return ingredients;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            {/* Modal Container */}
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden animate-slideUp">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 hover:border-orange-500 hover:bg-orange-500/20 transition-all duration-200"
                >
                    <svg className="w-6 h-6 text-slate-300 hover:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {loading ? (
                    /* Loading State */
                    <div className="flex items-center justify-center h-96">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
                            <p className="text-slate-400">Cargando receta...</p>
                        </div>
                    </div>
                ) : recipe ? (
                    /* Content */
                    <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
                        {/* Header with Image */}
                        <div className="relative h-64 md:h-80">
                            <img
                                src={recipe.strDrinkThumb || ""}
                                alt={recipe.strDrink}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                    {recipe.strDrink}
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {recipe.strCategory && (
                                        <span className="px-3 py-1 bg-orange-500/20 border border-orange-500/50 text-orange-400 rounded-full text-sm font-medium">
                                            {recipe.strCategory}
                                        </span>
                                    )}
                                    {recipe.strAlcoholic && (
                                        <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 text-purple-400 rounded-full text-sm font-medium">
                                            {recipe.strAlcoholic}
                                        </span>
                                    )}
                                    {recipe.strGlass && (
                                        <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/50 text-blue-400 rounded-full text-sm font-medium">
                                            🥃 {recipe.strGlass}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-6 md:p-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Ingredients */}
                                <div>
                                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-4">
                                        📝 Ingredientes
                                    </h3>
                                    <ul className="space-y-3">
                                        {getIngredients().map((item, index) => (
                                            <li
                                                key={index}
                                                className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/30 hover:border-orange-500/30 transition-colors"
                                            >
                                                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-orange-500/20 text-orange-400 rounded-full text-sm font-bold">
                                                    {index + 1}
                                                </span>
                                                <div className="flex-1">
                                                    <span className="text-white font-medium">{item.name}</span>
                                                    {item.measure && (
                                                        <span className="text-slate-400 text-sm ml-2">
                                                            - {item.measure}
                                                        </span>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Instructions */}
                                <div>
                                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 mb-4">
                                        👨‍🍳 Instrucciones
                                    </h3>
                                    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/30">
                                        <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                                            {recipe.strInstructionsES || recipe.strInstructions || "No hay instrucciones disponibles"}
                                        </p>
                                    </div>

                                    {/* Tags if available */}
                                    {recipe.strTags && (
                                        <div className="mt-6">
                                            <h4 className="text-sm font-semibold text-slate-400 mb-2">Etiquetas</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {recipe.strTags.split(',').map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-xs"
                                                    >
                                                        #{tag.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Error State */
                    <div className="flex items-center justify-center h-96">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-slate-400">No se pudo cargar la receta</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
