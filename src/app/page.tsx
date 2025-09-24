import { Hero } from "@/components/home/hero";
import { Filter } from "@/components/home/filter";
import { Product } from "@/components/product";
import { Badge } from "@/components/ui/badge";
import { Products } from "@/components/home/products";
import { getProducts } from "@/actions/product";

interface HomeProps {
  searchParams: Promise<FilterItemsProps>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const products = await getProducts();
  return (
    <div className="flex flex-col gap-4">
      <Hero />
      <section className="flex flex-col gap-6 px-4 py-6 md:px-6">
        <Filter data={products} params={params} />
        <Products products={products} params={params} />
      </section>
    </div>
  );
}
