import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipeSlice, RecipeSliceType } from "./recipeSlice";
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";

export const useAppStore = create<RecipeSliceType & NotificationSliceType>()(devtools((...args) => ({
    ...createRecipeSlice(...args),
    ...createNotificationSlice(...args),
})));