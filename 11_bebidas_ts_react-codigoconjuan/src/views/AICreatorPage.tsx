import { useState } from 'react';
import { useAppStore } from '../stores/useAppStore';

export default function AICreatorPage() {
    const [ingredients, setIngredients] = useState('');
    const generateRecipe = useAppStore((state) => state.generateRecipe);
    const generatedRecipe = useAppStore((state) => state.generatedRecipe);
    const loadingAI = useAppStore((state) => state.loadingAI);
    const errorAI = useAppStore((state) => state.errorAI);
    const addFavorite = useAppStore((state) => state.addFavorite);
    const isFavorite = useAppStore((state) => state.isFavorite);

    const handleGenerate = () => {
        if (ingredients.trim()) {
            generateRecipe(ingredients);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-black text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                AI Recipe Creator ✨
            </h1>

            <div className="max-w-2xl mx-auto bg-slate-800 rounded-lg shadow-xl p-8 mb-8 border border-slate-700">
                <div className="mb-6">
                    <label className="block text-slate-300 text-lg font-bold mb-2">
                        ¿Qué ingredientes tienes?
                    </label>
                    <textarea
                        className="w-full p-4 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500 min-h-[100px]"
                        placeholder="Ej: Vodka, jugo de naranja, granadina..."
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                    />
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={loadingAI || !ingredients.trim()}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                >
                    {loadingAI ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                            Generando Magia...
                        </>
                    ) : 'Crear Receta Única 🪄'}
                </button>

                {errorAI && (
                    <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg text-center">
                        {errorAI}
                    </div>
                )}
            </div>

            {generatedRecipe && (
                <div className="max-w-4xl mx-auto animate-fadeIn">
                    <div className="bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
                        <div className="md:flex">
                            <div className="md:w-1/3">
                                <img
                                    src={generatedRecipe.strDrinkThumb || "https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg"}
                                    alt={generatedRecipe.strDrink}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="md:w-2/3 p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h2 className="text-3xl font-bold text-white mb-2">{generatedRecipe.strDrink}</h2>
                                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm border border-purple-500/30">
                                            {generatedRecipe.strCategory}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => addFavorite({
                                            ...generatedRecipe,
                                            strDrinkThumb: generatedRecipe.strDrinkThumb || ""
                                        })}
                                        disabled={isFavorite(generatedRecipe.idDrink)}
                                        className="p-2 rounded-full hover:bg-slate-700 transition-colors"
                                    >
                                        {isFavorite(generatedRecipe.idDrink) ? '❤️' : '🤍'}
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-orange-400 mb-2">Ingredientes</h3>
                                        <ul className="space-y-1 text-slate-300">
                                            {Array.from({ length: 15 }).map((_, i) => {
                                                const ingredient = generatedRecipe[`strIngredient${i + 1}` as keyof typeof generatedRecipe];
                                                const measure = generatedRecipe[`strMeasure${i + 1}` as keyof typeof generatedRecipe];
                                                return ingredient ? (
                                                    <li key={i}>• {ingredient} {measure ? `- ${measure}` : ''}</li>
                                                ) : null;
                                            })}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-green-400 mb-2">Preparación</h3>
                                        <p className="text-slate-300 whitespace-pre-line">
                                            {generatedRecipe.strInstructionsES || generatedRecipe.strInstructions}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
