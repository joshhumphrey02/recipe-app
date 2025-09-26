"use server";

import prisma from "@/lib/prisma";

export async function getHomeProducts() {
  try {
    const trending = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        cuisine: true,
        rating: true,
      },
      take: 10,
    });
    const cuisines = await prisma.product.groupBy({
      by: ["cuisine"],
      _count: { cuisine: true },
      orderBy: { _count: { cuisine: "desc" } },
      take: 4,
    });

    // Fetch a product per cuisine
    const featured = await Promise.all(
      cuisines.map((c) =>
        prisma.product.findFirst({
          where: { cuisine: c.cuisine },
          select: { id: true, image: true, cuisine: true },
        })
      )
    );
    return {
      featured: featured?.filter((f) => !!f) || [],
      trending,
    };
  } catch (error) {
    return {
      featured: [],
      trending: [],
    };
  }
}

export type HomeData = Awaited<ReturnType<typeof getHomeProducts>>;
