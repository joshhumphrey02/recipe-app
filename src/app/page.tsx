import { Hero } from "@/components/home/hero";
import { Filter } from "@/components/home/filter";
import { Product } from "@/components/product";
import { Badge } from "@/components/ui/badge";
import { Products } from "@/components/home/products";

interface HomeProps {
  searchParams: Promise<{
    cusine?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { cusine } = await searchParams;
  const res = await fetch("https://dummyjson.com/recipes?limit=20");
  const data = await res.json();
  const recipes = (data?.recipes || []) as unknown as Product[];
  return (
    <div className="flex flex-col gap-4">
      <Hero />
      <section className="flex flex-col gap-6 px-4 py-6 md:px-6">
        <Filter data={recipes} cusine={cusine} />
        <Products products={recipes} cusine={cusine} />
      </section>
    </div>
  );
}
