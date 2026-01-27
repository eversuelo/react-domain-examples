import axios from "axios";
import { CategoriesResponseSchema, DrinksResponseSchema, FullDrinkResponseSchema, SearchRecipes } from "../utils/recipe-schema";

export async function getCategories(): Promise<ReturnType<typeof CategoriesResponseSchema.safeParse>> {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const { data } = await axios.get(url);

    return CategoriesResponseSchema.safeParse(data);
}

export async function getRecipes(filters: SearchRecipes): Promise<ReturnType<typeof DrinksResponseSchema.safeParse>> {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${filters.category ? 'c=' + filters.category : ''}${filters.category && filters.ingredient ? '&' : ''}${filters.ingredient ? 'i=' + filters.ingredient : ''}`;
    const { data } = await axios.get(url);

    return DrinksResponseSchema.safeParse(data);
}

export async function getDrinkById(id: string): Promise<ReturnType<typeof FullDrinkResponseSchema.safeParse>> {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const { data } = await axios.get(url);

    return FullDrinkResponseSchema.safeParse(data);
}
