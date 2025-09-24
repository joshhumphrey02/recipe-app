"use client";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterDrawer } from "./filter-drawer";
import { Products } from "@/actions/product";

interface FilterProps {
  data: Products;
  params: FilterItemsProps;
}

export function Filter({ data, params }: FilterProps) {
  const pills = ["Food", "Meal", "cuisine", "Fries"];
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const categories = useMemo(() => {
    const newD: string[] = [];
    data?.forEach((d) => {
      if (!newD.includes(d.cuisine)) newD.push(d.cuisine);
    });
    return newD;
  }, [data]);
  function handleSelect(c: string) {
    const params = new URLSearchParams(searchParams);
    params.set("cuisine", c);
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <div className=" flex justify-between items-center">
      <div className=" hidden md:flex gap-4">
        {pills.map((p) => (
          <Badge key={p} variant={"outline"}>
            {p}
          </Badge>
        ))}
      </div>
      <div className="w-full md:w-fit justify-between flex gap-4 items-center">
        <Select value={params?.cuisine} onValueChange={handleSelect}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a cuisine" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Caegories</SelectLabel>
              {categories?.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <FilterDrawer params={params} categories={categories} />
      </div>
    </div>
  );
}
