import { Hero } from "@/components/home/hero";
import { Product } from "@/components/product";
import { Badge } from "@/components/ui/badge";

export default async function Home() {
  const res = await fetch("https://dummyjson.com/recipes?limit=20");
  const data = await res.json();
  const recipes = (data?.recipes || []) as unknown as Product[];
  const pills = ["Food", "Meal", "Cusine", "Fries"];
  return (
    <div className="flex flex-col gap-4">
      <Hero />
      <section className="flex flex-col gap-6 px-4 py-6 md:px-6">
        <div className=" flex gap-4">
          {pills.map((p) => (
            <Badge>{p}</Badge>
          ))}
        </div>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recipes?.map((p, i) => (
            <Product key={i} data={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
