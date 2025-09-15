import { Hero } from "@/components/home/hero";
import { Filter } from "@/components/home/filter";
import { Product } from "@/components/product";
import { Badge } from "@/components/ui/badge";
import { Products } from "@/components/home/products";

interface HomeProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { category } = await searchParams;
  const res = await fetch("https://dummyjson.com/products?limit=30");
  const data = await res.json();
  const products = (data?.products || []) as unknown as Product[];
  return (
    <div className="flex flex-col gap-4">
      <Hero />
      <section className="flex flex-col gap-6 px-4 py-6 md:px-6">
        <Filter data={products} category={category} />
        <Products products={products} category={category} />
      </section>
    </div>
  );
}
