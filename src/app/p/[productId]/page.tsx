import { Card } from "@/components/ui/card";
import { formatMoney } from "@/lib/utils";
import { Heart } from "lucide-react";

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
    <div className=" flex w-full h-dvh justify-center items-center">
      <Card
        style={{ backgroundImage: `url(${data.images[0]})` }}
        className=" h-[70dvh] w-[80dvw] mx-auto bg-cover text-white bg-center rounded-xl bg-no-repeat flex p-0"
      >
        <div className="bg-black/40 relative flex-1 rounded-xl flex flex-col justify-end p-4">
          <div className=" flex justify-between">
            <h4 className="text-xl font-medium">{data.title}</h4>
            <div className=" absolute top-2 right-2 p-2 bg-gray-500 rounded-full">
              <Heart />
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <h2 className="text-md font-bold">
              {formatMoney(data.price, "NGN", 0)}
            </h2>
            <h2 className="text-xs line-through">
              {formatMoney(
                data.price - (data.price * data.discountPercentage) / 100,
                "NGN",
                0
              )}
            </h2>
          </div>
          <p>{data.description}</p>
        </div>
      </Card>
    </div>
  );
}
