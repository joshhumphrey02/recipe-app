"use server";

import prisma from "@/lib/prisma";
import { ProductFormInput, ProductFormSchema } from "@/lib/validators/product";
import { revalidatePath } from "next/cache";

export async function getProducts(filters: FilterItemsProps = {}) {
  try {
    const { meal, cuisine, level, prepRange, cookRange, search } = filters;
    const products = await prisma.product.findMany({
      where: {
        ...(search?.length
          ? {
              name: {
                contains: search[0],
                mode: "insensitive",
              },
            }
          : {}),
        ...(meal?.length
          ? {
              mealType: {
                hasSome: meal,
              },
            }
          : {}),
        ...(cuisine?.length
          ? {
              cuisine: { in: cuisine },
            }
          : {}),
        ...(level?.length
          ? {
              difficulty: { in: level },
            }
          : {}),
        ...(prepRange?.length === 2
          ? {
              prepTimeMinutes: {
                gte: prepRange[0],
                lte: prepRange[1],
              },
            }
          : {}),
        ...(cookRange?.length === 2
          ? {
              cookTimeMinutes: {
                gte: cookRange[0],
                lte: cookRange[1],
              },
            }
          : {}),
      },
      select: {
        id: true,
        name: true,
        image: true,
        cuisine: true,
        rating: true,
      },
      take: 20,
    });

    return products;
  } catch (error) {
    console.error("❌ getProducts error:", error);
    return [];
  }
}

export type Products = Awaited<ReturnType<typeof getProducts>>;

export async function getProduct(productId: string) {
  try {
    return await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
  } catch (error) {
    return null;
  }
}

export type Product = Awaited<ReturnType<typeof getProduct>>;

export async function getFilterData() {
  try {
    const data = await prisma.product.findMany({
      distinct: ["cuisine"],
      select: { cuisine: true },
      orderBy: {
        cuisine: "asc",
      },
    });

    const data2 = await prisma.product.findMany({
      select: { mealType: true },
    });
    const mealTypes = [...new Set(data2.flatMap((c) => c.mealType ?? []))];
    const range = await prisma.product.aggregate({
      _min: {
        cookTimeMinutes: true,
        prepTimeMinutes: true,
      },
      _max: {
        cookTimeMinutes: true,
        prepTimeMinutes: true,
      },
    });
    return {
      cuisines: data?.map((c) => c.cuisine),
      mealTypes,
      prepRange: [
        range._min?.prepTimeMinutes || 0,
        range._max?.prepTimeMinutes || 0,
      ],
      cookRange: [
        range._min?.cookTimeMinutes || 0,
        range._max?.cookTimeMinutes || 0,
      ],
    };
  } catch (error) {
    return {
      cuisines: [],
      mealTypes: [],
      prepRange: [],
      cookRange: [],
    };
  }
}

export type FilterData = Awaited<ReturnType<typeof getFilterData>>;

export async function getRelatedProducts(cuisine: string) {
  try {
    return await prisma.product.findMany({
      where: {
        cuisine,
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
  } catch (error) {
    return [];
  }
}

export type RelatedProducts = Awaited<ReturnType<typeof getRelatedProducts>>;

export async function createProduct(
  _: any,
  data: ProductFormInput
): Promise<ActionResponse<ProductFormInput>> {
  try {
    const parsed = ProductFormSchema.safeParse(data);
    if (!parsed.success) {
      const err = parsed.error.flatten();
      return {
        fieldError: {
          name: err.fieldErrors.name?.[0],
          cuisine: err.fieldErrors.cuisine?.[0],
          tags: err.fieldErrors.tags?.[0],
          ingredients: err.fieldErrors.ingredients?.[0],
          instructions: err.fieldErrors.instructions?.[0],
          difficulty: err.fieldErrors.difficulty?.[0],
          images: err.fieldErrors.images?.[0],
        },
      };
    }
    const {
      name,
      cuisine,
      ingredients,
      instructions,
      tags,
      images,
      difficulty,
    } = data;
    await prisma.$transaction(async (tx) => {
      await tx.product.create({
        data: {
          name,
          cuisine,
          tags,
          image: images[0].url,
          difficulty,
          ingredients,
          instructions,
        },
      });
    });
    revalidatePath("/");
    return {
      data: true,
    };
  } catch (error) {
    console.log(error);
    return {
      formError: "Error occurred",
    };
  }
}
