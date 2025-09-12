"use client";
import { useMemo } from "react";
import { Product } from "../product";

interface ProductsProps {
  products: Product[];
  cusine?: string;
}

export function Products({ products, cusine }: ProductsProps) {
  const data = useMemo(() => {
    if (cusine) {
      return products.filter((p) => p.cuisine == cusine);
    } else {
      return products;
    }
  }, [products, cusine]);
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data?.map((p, i) => (
        <Product key={i} data={p} />
      ))}
    </div>
  );
}
