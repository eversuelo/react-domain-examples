import { StateCreator } from "zustand";
import { FullDrink } from "../utils/recipe-schema";

export type ArtificialIntelligentSliceType = {
    generatedRecipe: FullDrink | null;
    loadingAI: boolean;
    errorAI: string;
    generateRecipe: (ingredients: string) => Promise<void>;
}

export const createArtificialIntelligentSlice: StateCreator<ArtificialIntelligentSliceType> = (set) => ({
    generatedRecipe: null,
    loadingAI: false,
    errorAI: '',
    generateRecipe: async (ingredients: string) => {
        set({ loadingAI: true, errorAI: '', generatedRecipe: null });

        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": window.location.origin, // Recommended by OpenRouter
                    "X-Title": "Bebidas App", // Recommended by OpenRouter
                },
                body: JSON.stringify({
                    "model": "meta-llama/llama-3.3-70b-instruct",
                    "messages": [
                        {
                            "role": "user",
                            "content": `Create a cocktail recipe using these ingredients (or similar): ${ingredients}. 
                            Reply ONLY with a JSON object following this structure exactly, no other text:
                            {
                                "idDrink": "ai-generated-${Date.now()}",
                                "strDrink": "Creative Name",
                                "strCategory": "Cocktail",
                                "strAlcoholic": "Alcoholic",
                                "strGlass": "Highball glass",
                                "strInstructions": "Step by step instructions (English)",
                                "strInstructionsES": "Instrucciones paso a paso (Español)",
                                "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg", 
                                "strIngredient1": "Ingredient 1",
                                "strMeasure1": "Measure 1",
                                "strIngredient2": "Ingredient 2",
                                "strMeasure2": "Measure 2"
                                ... (up to 15 ingredients)
                            }
                            Make sure strDrinkThumb is a valid URL (use a placeholder if needed).
                            `
                        }
                    ]
                })
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error("AI Service Error:", response.status, errorData);
                throw new Error(`AI Service Error: ${response.status} - ${errorData}`);
            }

            const data = await response.json();
            const content = data.choices?.[0]?.message?.content;

            if (content) {
                try {
                    // Try to parse JSON from the response
                    const recipe = JSON.parse(content);
                    set({ generatedRecipe: recipe, loadingAI: false });
                } catch (parseError) {
                    console.error("Error parsing AI response", parseError);
                    set({ errorAI: "Invalid response format from AI", loadingAI: false });
                }
            } else {
                set({ errorAI: "No recipes generated", loadingAI: false });
            }

        } catch (error) {
            console.error(error);
            set({ errorAI: "Error generating recipe", loadingAI: false });
        }
    }
});
