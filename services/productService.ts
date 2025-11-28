// API base URL
const MEAL_DB_API = "https://www.themealdb.com/api/json/v1/1";

export interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  description: string;
}

export interface ProductDetails extends Product {
  price: string;
  instructions?: string;
  ingredients?: Array<{ ingredient: string; measure: string }>;
}

// Transforma dados da API TheMealDB para o formato Product
function transformMeal(meal: any): Product {
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    image: meal.strMealThumb,
    category: "Comida",
    description: meal.strInstructions || "Deliciosa receita culinária",
  };
}

// Transforma dados detalhados da API TheMealDB para ProductDetails
function transformMealDetails(meal: any): ProductDetails {
  const ingredients: Array<{ ingredient: string; measure: string }> = [];
  
  // TheMealDB tem ingredientes e medidas em campos separados (strIngredient1, strMeasure1, etc.)
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure ? measure.trim() : "",
      });
    }
  }

  return {
    id: meal.idMeal,
    name: meal.strMeal,
    image: meal.strMealThumb,
    category: "Comida",
    description: meal.strInstructions || "Deliciosa receita culinária",
    price: "", // Será preenchido pelo contexto
    instructions: meal.strInstructions,
    ingredients: ingredients.length > 0 ? ingredients : undefined,
  };
}

export class ProductService {
  // Busca produtos de comida da API TheMealDB
  static async fetchProducts(): Promise<Product[]> {
    try {
      // Buscar várias categorias de comida para ter mais variedade
      const categories = ["Dessert", "Seafood", "Vegetarian", "Chicken", "Beef"];
      const responses = await Promise.all(
        categories.map((category) =>
          fetch(`${MEAL_DB_API}/filter.php?c=${category}`)
        )
      );
      
      const dataArrays = await Promise.all(
        responses.map((res) => res.json())
      );
      
      // Combinar todos os produtos e limitar a 50 para performance
      const allMeals = dataArrays
        .flatMap((data) => data.meals || [])
        .slice(0, 50);
      
      return allMeals.map(transformMeal);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      throw error;
    }
  }

  // Busca detalhes de um produto específico
  static async fetchProductDetails(productId: string): Promise<ProductDetails | null> {
    try {
      const response = await fetch(`${MEAL_DB_API}/lookup.php?i=${productId}`);
      const result = await response.json();

      if (result.meals && result.meals.length > 0) {
        return transformMealDetails(result.meals[0]);
      }
      
      return null;
    } catch (error) {
      console.error(`Erro ao buscar detalhes do produto ${productId}:`, error);
      return null;
    }
  }
}

