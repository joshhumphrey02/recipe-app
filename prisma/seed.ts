import prisma from "@/lib/prisma";

async function products() {
  const res = await fetch("https://dummyjson.com/recipes?limit=40");
  const data = await res.json();
  const products = (data?.recipes || []) as unknown as Product[];

  products.forEach(async (p) => {
    await prisma.product.create({
      data: {
        name: p.name,
        ingredients: p.ingredients,
        instructions: p.instructions,
        mealType: p.mealType,
        prepTimeMinutes: p.prepTimeMinutes,
        cookTimeMinutes: p.cookTimeMinutes,
        tags: p.tags,
        rating: p.rating,
        servings: p.servings,
        reviewCount: p.reviewCount,
        caloriesPerServing: p.caloriesPerServing,
        difficulty: p.difficulty,
        cuisine: p.cuisine,
        image: p.image,
      },
    });
  });
}

try {
  await prisma.$connect();
  await products();
} catch (error) {
  await prisma.$disconnect();
  console.log(error);
}
