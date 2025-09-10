import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card } from "../ui/card";

interface Props {
  data: Product;
}

export function Product({ data }: Props) {
  return (
    <Card
      style={{ backgroundImage: `url(${data.image})` }}
      className=" h-60 bg-cover text-white bg-center bg-no-repeat flex p-0"
    >
      <div className="bg-black/40 flex-1 flex flex-col justify-end p-4">
        <h4 className="text-xl font-medium">{data.name}</h4>
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarFallback className="text-black">JH</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h5 className="text-sm font-medium">Humphrey Joshua</h5>
            <p className="text-xs font-light">Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
