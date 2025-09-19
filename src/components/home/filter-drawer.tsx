import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Search } from "lucide-react";
import { Badge } from "../ui/badge";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface FilterDrawerProps {
  params: FilterItemsProps;
  categories: string[];
}

export function FilterDrawer({ params, categories }: FilterDrawerProps) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<FilterItemsProps>({});
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  function FilterItems({
    name,
    category,
    sort,
    maxPrice,
    minPrice,
  }: FilterItemsProps) {
    setFilter({ name, category, sort, maxPrice, minPrice });
    const params = new URLSearchParams(searchParams);
    category ? params.set("category", category) : params.delete("category");
    name ? params.set("name", name) : params.delete("name");
    sort ? params.set("sort", sort) : params.delete("sort");
    maxPrice
      ? params.set("maxPrice", maxPrice.toString())
      : params.delete("maxPrice");
    minPrice
      ? params.set("minPrice", minPrice.toString())
      : params.delete("minPrice");
    replace(`${pathname}?${params.toString()}`);
  }
  useEffect(() => {
    if (params) {
      setFilter(params);
    }
  }, []);
  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger>
        <Button variant="outline">Filter</Button>
      </DrawerTrigger>

      <DrawerContent className="px-4 py-4 flex flex-col gap-4 md:gap-6">
        <DrawerHeader className="flex flex-row justify-between items-center border-b border-border p-0 pb-2">
          <DrawerTitle className="font-bold">Product Filter</DrawerTitle>

          <DrawerClose className="">
            <Button size={"sm"} variant="outline" aria-label="Close filters">
              X
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="space-y-1">
          <h2 className="text-sm">Search by Product:</h2>

          <div className="relative">
            <Input
              value={filter.name}
              onChange={(e) => FilterItems({ name: e.target.value })}
              type="text"
              placeholder="Product Name"
              className=""
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
        <div className="space-y-1">
          <h2 className="text-sm">Categories:</h2>
          <div className="flex gap-4 overflow-x-scroll pr-4 py-2 scroll-smooth scroll-m-1">
            {categories?.map((c) => (
              <Badge
                key={c}
                onClick={() => FilterItems({ category: c })}
                className=" py-2 px-4 capitalize"
              >
                {c}
              </Badge>
            ))}
          </div>
        </div>
        <div className="space-y-1">
          <h2 className="text-sm">Sort By:</h2>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Low to High (Price)" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Price</SelectLabel>
                <SelectItem value="low">Low to High</SelectItem>
                <SelectItem value="high">High to Low</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <PriceRangeSlider />
        <Button
          onClick={() => {
            FilterItems({});
            setFilter({
              name: "",
              category: "",
              minPrice: 0,
              maxPrice: 0,
              sort: "",
            });
            setOpen(false);
          }}
        >
          Reset All
        </Button>
      </DrawerContent>
    </Drawer>
  );
}

export function PriceRangeSlider() {
  const [range, setRange] = useState<[number, number]>([20, 140]);

  const stopProps = {
    onPointerDown: (e: React.PointerEvent) => e.stopPropagation(),
    onMouseDown: (e: React.MouseEvent) => e.stopPropagation(),
    onTouchStart: (e: React.TouchEvent) => e.stopPropagation(),
  };

  return (
    <div className="space-y-4" {...stopProps}>
      <p className="text-sm">Price Range:</p>
      <div className="px-2">
        <Slider
          defaultValue={[20, 140]}
          min={0}
          max={200}
          step={1}
          value={range}
          onValueChange={(val) => {
            setRange([val[0], val[1]] as [number, number]);
          }}
          className="w-full"
        />
      </div>
      <div className="flex justify-between text-sm font-medium text-muted-foreground mt-2">
        <span>${range[0]}</span>
        <span>${range[1]}</span>
      </div>
    </div>
  );
}
