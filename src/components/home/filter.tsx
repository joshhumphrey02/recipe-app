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

interface FilterProps {
  data: Product[];
  category?: string;
}

export function Filter({ data, category }: FilterProps) {
  const pills = ["Food", "Meal", "category", "Fries"];
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const categorys = useMemo(() => {
    const newD: string[] = [];
    data?.forEach((d) => {
      if (!newD.includes(d.category)) newD.push(d.category);
    });
    return newD;
  }, [data]);
  function handleSelect(c: string) {
    const params = new URLSearchParams(searchParams);
    params.set("category", c);
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
        <Select value={category} onValueChange={handleSelect}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Caegories</SelectLabel>
              {categorys?.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <FilterDrawer />
      </div>
    </div>
  );
}

export function FilterDrawer() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline">Filter</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm md:max-w-md">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0"></div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
