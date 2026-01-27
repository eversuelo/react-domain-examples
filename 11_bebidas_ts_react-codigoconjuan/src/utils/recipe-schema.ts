import { z } from 'zod';

export const RecpeSchema = z.object({
    id: z.string(),
    name: z.string(),
    ingredients: z.array(z.string()),
    instructions: z.string(),
});

export const CategoriesResponseSchema = z.object({
    drinks: z.array(
        z.object({
            strCategory: z.string(),
        })
    ),
});
export type Recpe = z.infer<typeof RecpeSchema>;


export const SearchRecipesSchema = z.object({
    ingredient: z.string(),
    category: z.string(),
});
export type SearchRecipes = z.infer<typeof SearchRecipesSchema>;

// Schema for drink/recipe from TheCocktailDB API
export const DrinkSchema = z.object({
    idDrink: z.string(),
    strDrink: z.string(),
    strDrinkThumb: z.string(),
});

export const DrinksResponseSchema = z.object({
    drinks: z.array(DrinkSchema),
});

export type Drink = z.infer<typeof DrinkSchema>;
export type DrinksResponse = z.infer<typeof DrinksResponseSchema>;

// Schema for ingredient from TheCocktailDB API
export const IngredientSchema = z.object({
    idIngredient: z.string(),
    strIngredient: z.string(),
    strDescription: z.string().nullable(),
    strType: z.string().nullable(),
    strAlcohol: z.string().nullable(),
    strABV: z.string().nullable(),
});

export const IngredientsResponseSchema = z.object({
    ingredients: z.array(IngredientSchema),
});

export type Ingredient = z.infer<typeof IngredientSchema>;
export type IngredientsResponse = z.infer<typeof IngredientsResponseSchema>;

// Schema for full drink/recipe details from TheCocktailDB API (lookup.php endpoint)
export const FullDrinkSchema = z.object({
    idDrink: z.string(),
    strDrink: z.string(),
    strDrinkAlternate: z.string().nullable(),
    strTags: z.string().nullable(),
    strVideo: z.string().nullable(),
    strCategory: z.string().nullable(),
    strIBA: z.string().nullable(),
    strAlcoholic: z.string().nullable(),
    strGlass: z.string().nullable(),
    strInstructions: z.string().nullable(),
    strInstructionsES: z.string().nullable(),
    strInstructionsDE: z.string().nullable(),
    strInstructionsFR: z.string().nullable(),
    strInstructionsIT: z.string().nullable(),
    strDrinkThumb: z.string().nullable(),
    strIngredient1: z.string().nullable(),
    strIngredient2: z.string().nullable(),
    strIngredient3: z.string().nullable(),
    strIngredient4: z.string().nullable(),
    strIngredient5: z.string().nullable(),
    strIngredient6: z.string().nullable(),
    strIngredient7: z.string().nullable(),
    strIngredient8: z.string().nullable(),
    strIngredient9: z.string().nullable(),
    strIngredient10: z.string().nullable(),
    strIngredient11: z.string().nullable(),
    strIngredient12: z.string().nullable(),
    strIngredient13: z.string().nullable(),
    strIngredient14: z.string().nullable(),
    strIngredient15: z.string().nullable(),
    strMeasure1: z.string().nullable(),
    strMeasure2: z.string().nullable(),
    strMeasure3: z.string().nullable(),
    strMeasure4: z.string().nullable(),
    strMeasure5: z.string().nullable(),
    strMeasure6: z.string().nullable(),
    strMeasure7: z.string().nullable(),
    strMeasure8: z.string().nullable(),
    strMeasure9: z.string().nullable(),
    strMeasure10: z.string().nullable(),
    strMeasure11: z.string().nullable(),
    strMeasure12: z.string().nullable(),
    strMeasure13: z.string().nullable(),
    strMeasure14: z.string().nullable(),
    strMeasure15: z.string().nullable(),
    strImageSource: z.string().nullable(),
    strImageAttribution: z.string().nullable(),
    strCreativeCommonsConfirmed: z.string().nullable(),
    dateModified: z.string().nullable(),
});

export const FullDrinkResponseSchema = z.object({
    drinks: z.array(FullDrinkSchema).nullable(),
});

export type FullDrink = z.infer<typeof FullDrinkSchema>;
export type FullDrinkResponse = z.infer<typeof FullDrinkResponseSchema>;