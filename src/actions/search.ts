"use server";

import prisma from "@/lib/prisma";

export async function getProducts(search: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            cuisine: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            mealType: {
              hasSome: [search],
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        image: true,
        cuisine: true,
        rating: true,
      },
      take: 7,
    });
    return products;
  } catch (error) {
    console.error("❌ getProducts error:", error);
    return [];
  }
}

export type SearchRecipes = Awaited<ReturnType<typeof getProducts>>;

export async function getSearchSuggested() {
  try {
    const data = await prisma.product.findMany({
      distinct: ["cuisine"],
      select: { cuisine: true },
      orderBy: {
        cuisine: "asc",
      },
      take: 10,
    });

    const data2 = await prisma.product.findMany({
      select: { mealType: true },
      take: 15,
    });
    const mealTypes = [...new Set(data2.flatMap((c) => c.mealType ?? []))];
    return {
      cuisines: data?.map((c) => c.cuisine),
      mealTypes,
    };
  } catch (error) {
    return {
      cuisines: [],
      mealTypes: [],
    };
  }
}

export type SearchSuggested = Awaited<ReturnType<typeof getSearchSuggested>>;
