import { z } from 'zod';
import { CategoriesResponseSchema } from '../utils/recipe-schema';
import { SearchRecipesSchema } from '../utils/recipe-schema';
export type Category = z.infer<typeof CategoriesResponseSchema>['drinks'][number];
export type Categories = Category[];

export type SearchRecipes = z.infer<typeof SearchRecipesSchema>;
