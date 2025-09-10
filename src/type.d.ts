interface Product {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  difficulty: "Easy" | "Hard";
  cuisine: string;
  tags: string[];
  userId: string;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}
