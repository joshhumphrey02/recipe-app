import { Header } from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatMoney } from "@/lib/utils";
import { Heart } from "lucide-react";
import { getProduct } from "@/actions/product";

interface Props {
  params: Promise<{
    productId: string;
  }>;
}

export default async function ProductScreen({ params }: Props) {
  const { productId } = await params;
  const data = await getProduct(productId);
  if (!data)
    return (
      <div className="flex justify-center items-center min-h-dvh">
        <p className=" text-2xl animate-bounce text-red-500">
          Product Not Found
        </p>
      </div>
    );
  return (
    <div className=" flex flex-col gap-8 py-4 px-8 w-full max-w-[1250px] mx-auto">
      <Header />
      <div className=" grid md:grid-cols-2 gap-4">
        <div className="w-full h-96">
          <img src={data.image} className="w-full h-full object-cover" />
        </div>
        <Card className=" border border-border p-4 flex flex-col gap-4">
          <div className=" flex justify-between items-center gap-4">
            <h1 className="text-xl md:text-2xl font-semibold">{data.name}</h1>
            <Heart className="w-4 h-4 fill-foreground" />
          </div>
          <Separator />
          <div className="flex flex-col gap-4">
            <span>{data.rating}</span>
          </div>
          <Separator />
          <div className="flex justify-between gap-4 items-center">
            <Button className="flex-1">Buy Now</Button>
            <Button className="flex-1">Add to Cart</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
