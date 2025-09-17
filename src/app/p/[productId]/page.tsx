import { Header } from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatMoney } from "@/lib/utils";
import { Heart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductReviews from "@/components/product/pro-reviews";

interface Props {
  params: Promise<{
    productId: string;
  }>;
}

export default async function ProductScreen({ params }: Props) {
  const { productId } = await params;
  const res = await fetch(`https://dummyjson.com/products/${productId}`);
  const data = (await res.json()) as unknown as Product;
  return (
    <div className=" flex flex-col gap-8 py-4 px-8 w-full max-w-[1250px] mx-auto">
      <Header />
      <div className=" grid md:grid-cols-2 gap-4">
        <div className="w-full h-96">
          <img src={data.images[0]} className="w-full h-full object-cover" />
        </div>
        <Card className=" border border-border p-4 flex flex-col gap-4">
          <div className=" flex justify-between items-center gap-4">
            <h1 className="text-xl md:text-2xl font-semibold">{data.title}</h1>
            <Heart className="w-4 h-4 fill-foreground" />
          </div>
          <Separator />
          <div className="flex flex-col gap-4">
            <span>{formatMoney(data.price, "NGN", 0)}</span>
          </div>
          <Separator />
          <div className="flex justify-between gap-4 items-center">
            <Button className="flex-1">Buy Now</Button>
            <Button className="flex-1">Add to Cart</Button>
          </div>
        </Card>
      </div>
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="w-full h-12 flex justify-start gap-6">
          <TabsTrigger
            className=" h-full text-base font-semibold"
            value="description"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            className=" h-full flex gap-2 items-center text-base font-semibold"
            value="reviews"
          >
            Reviews
            <span className="p-1.5 py-[2px] aspect-square text-xs rounded-full bg-primary text-white">
              {data.reviews?.length}
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <div>
            <p>{data.description}</p>
          </div>
        </TabsContent>
        <TabsContent value="reviews">
          <ProductReviews product={data} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
