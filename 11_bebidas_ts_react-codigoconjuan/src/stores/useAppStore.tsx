import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipeSlice, RecipeSliceType } from "./recipeSlice";

export const useAppStore = create<RecipeSliceType>()(devtools((...args) => ({
    // Store implementation
    ...createRecipeSlice(...args),
})));