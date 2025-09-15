"use client";
import { useMemo } from "react";
import { Product } from "../product";

interface ProductsProps {
  products: Product[];
  category?: string;
}

export function Products({ products, category }: ProductsProps) {
  const data = useMemo(() => {
    if (category) {
      return products.filter((p) => p.category == category);
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
