import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipeSlice, RecipeSliceType } from "./recipeSlice";
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";
import { createArtificialIntelligentSlice, ArtificialIntelligentSliceType } from "./artificialIntelligentSlice";

export const useAppStore = create<RecipeSliceType & NotificationSliceType & ArtificialIntelligentSliceType>()(devtools((...args) => ({
    ...createRecipeSlice(...args),
    ...createNotificationSlice(...args),
    ...createArtificialIntelligentSlice(...args),
})));