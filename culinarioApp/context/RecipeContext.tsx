import React, { createContext, useState, ReactNode } from "react";

export type RecipeType = {
  id?: string;
  name: string;
  image: string | null;
  ovensettings?: string;
  source?: string;
  ingredients: IngredientType[];
  preparationSteps: PreparationStepType[];
};

export type IngredientType = {
  image: string | null;
  name: string;
  amount: number;
  unit: string;
};

export type PreparationStepType = {
  stepNumber: number;
  description: string;
  ingredients: IngredientType[];
};

type RecipeContextType = {
  recipes: RecipeType[];
  addRecipe: (recipe: RecipeType) => void;
};

export const RecipeContext = createContext<RecipeContextType>({
  recipes: [],
  addRecipe: () => {},
});

interface RecipeProviderProps {
  children: ReactNode;
}

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  const addRecipe = (recipe: RecipeType) => {
    const newRecipe = { ...recipe, id: Date.now().toString() };
    setRecipes((currentRecipes) => [...currentRecipes, newRecipe]);
  };

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};