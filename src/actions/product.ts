"use server";

import prisma from "@/lib/prisma";

export async function getProducts(take?: number) {
  try {
    const products = await prisma.product.findMany({
      where: {
        cuisine: {
          mode: "insensitive",
          equals: "mexican",
        },
      },
      select: {
        id: true,
        name: true,
        image: true,
        cuisine: true,
        rating: true,
      },
      take: take || 4,
    });
    return products;
  } catch (error) {
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
