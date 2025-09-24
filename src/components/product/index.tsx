import { formatMoney } from "@/lib/utils";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card } from "../ui/card";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Products } from "@/actions/product";

interface Props {
  data: Products[0];
}

export function Product({ data }: Props) {
  const router = useRouter();
  return (
    <Card
      onClick={() => {
        router.push(`/p/${data.id}`);
      }}
      style={{ backgroundImage: `url(${data.image})` }}
      className=" h-60 bg-cover text-white bg-center rounded-xl bg-no-repeat flex p-0"
    >
      <div className="bg-black/40 relative flex-1 rounded-xl flex flex-col justify-end p-4">
        <div className=" flex justify-between">
          <h4 className="text-xl font-medium">{data.name}</h4>
          <div className=" absolute top-2 right-2 p-2 bg-gray-500 rounded-full">
            <Heart />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <h2 className="text-md font-bold">{data.rating}</h2>
        </div>
      </div>
    </Card>
  );
}
