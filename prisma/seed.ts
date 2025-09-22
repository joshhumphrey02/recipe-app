import prisma from "@/lib/prisma";

async function products() {
  const res = await fetch("https://dummyjson.com/products?limit=40");
  const data = await res.json();
  const products = (data?.products || []) as unknown as Product[];

  products.forEach(async (p) => {
    let category = await prisma.category.upsert({
      where: {
        name: p.category,
      },
      update: {
        name: p.category,
      },
      create: {
        name: p.category,
      },
    });
    const brand = await prisma.brand.upsert({
      where: {
        name: p.brand,
      },
      update: {
        name: p.brand,
      },
      create: {
        name: p.brand,
      },
    });
    await prisma.product.create({
      data: {
        title: p.title,
        description: p.description,
        price: p.price,
        discountPercentage: p.discountPercentage,
        stock: p.stock,
        tags: p.tags,
        rating: p.rating,
        category: {
          connect: {
            id: category.id,
          },
        },
        brand: {
          connect: {
            id: brand.id,
          },
        },
        images: {
          connectOrCreate: {
            where: {
              url: p.images[0],
            },
            create: {
              url: p.images[0],
            },
          },
        },
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
