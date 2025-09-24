"use client";
import { useMemo } from "react";
import { Product } from "../product";
import { Products as D } from "@/actions/product";

interface ProductsProps {
  products: D;
  params: FilterItemsProps;
}

export function Products({ products, params }: ProductsProps) {
  const { name, cuisine, sort, maxPrice, minPrice } = params;
  const data = useMemo(() => {
    if (cuisine) {
      return products.filter((p) => p.cuisine == cuisine);
    }
    if (name) {
      const reg = new RegExp(name, "ig");
      return products.filter((p) => reg.test(p.name));
    } else {
      return products;
    }
  }, [products, cuisine]);
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data?.map((p, i) => (
        <Product key={i} data={p} />
      ))}
    </div>
  );
}
