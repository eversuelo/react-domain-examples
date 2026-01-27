import { StateCreator } from "zustand";
import { getCategories, getRecipes } from "../services/RecipeService";
import { Categories, SearchRecipes } from "../types";
import { Drink } from "../utils/recipe-schema";
import { NotificationSliceType } from "./notificationSlice";

export type RecipeSliceType = {
  categories: Categories;
  recipes: Drink[];
  favorites: Drink[];
  fetchCategories: () => Promise<void>;
  searchRecipes: (filters: SearchRecipes) => Promise<void>;
  addFavorite: (drink: Drink) => void;
  removeFavorite: (drinkId: string) => void;
  isFavorite: (drinkId: string) => boolean;
  loadFavorites: () => void;
};

const FAVORITES_STORAGE_KEY = "bebidas-favorites";

export const createRecipeSlice: StateCreator<RecipeSliceType & NotificationSliceType, [], [], RecipeSliceType> = (set, get) => ({
  categories: [],
  recipes: [],
  favorites: [],

  fetchCategories: async () => {
    const response = await getCategories();
    set({ categories: response?.data?.drinks ?? [] });
  },

  searchRecipes: async (filters: SearchRecipes) => {
    const response = await getRecipes(filters);
    set({ recipes: response?.data?.drinks ?? [] });
  },

  addFavorite: (drink: Drink) => {
    const currentFavorites = get().favorites;
    const alreadyExists = currentFavorites.some((fav) => fav.idDrink === drink.idDrink);

    if (!alreadyExists) {
      const newFavorites = [...currentFavorites, drink];
      set({ favorites: newFavorites });
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
      get().showNotification({
        text: 'Se agregó a favoritos correctamente',
        error: false
      });
    } else {
      get().showNotification({
        text: 'Ya existe en favoritos',
        error: true
      });
    }
  },

  removeFavorite: (drinkId: string) => {
    const newFavorites = get().favorites.filter((fav) => fav.idDrink !== drinkId);
    set({ favorites: newFavorites });
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
    get().showNotification({
      text: 'Eliminado de favoritos',
      error: true
    });
  },

  isFavorite: (drinkId: string) => {
    return get().favorites.some((fav) => fav.idDrink === drinkId);
  },

  loadFavorites: () => {
    const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (storedFavorites) {
      try {
        const favorites = JSON.parse(storedFavorites);
        set({ favorites });
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    }
  },
});