"use client";
import { useMemo } from "react";
import { Product } from "../product";

interface ProductsProps {
  products: Product[];
  params: FilterItemsProps;
}

export function Products({ products, params }: ProductsProps) {
  const { name, category, sort, maxPrice, minPrice } = params;
  const data = useMemo(() => {
    if (category) {
      return products.filter((p) => p.category == category);
    }
    if (name) {
      const reg = new RegExp(name, "ig");
      return products.filter((p) => reg.test(p.title));
    } else {
      return products;
    }
  }, [products, category]);
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data?.map((p, i) => (
        <Product key={i} data={p} />
      ))}
    </div>
  );
}
