import { Rating } from "@/components/ui/rating";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { CircleCheckBig } from "lucide-react";

export default function ProductReviews({ product }: { product: Product }) {
  return (
    <div className=" flex flex-col gap-4 py-3">
      <div className="flex justify-between items-center">
        <h2 className="text-base sm:text-lg font-semibold">
          Customer Feedback
        </h2>
      </div>
      <Separator />
      <div className="space-y-3">
        <div className=" flex flex-col gap-3">
          {product.reviews?.map((i) => (
            <div
              key={i.date}
              className="flex flex-col gap-2 pb-2 border-b border-border"
            >
              <Rating value={i.rating} readOnly />
              <span className="text-sm font-bold">{i.comment}</span>
              <span className="text-sm text-foreground/90">
                {i?.comment || ""}
              </span>
              <div className="flex justify-between items-start">
                <span className="font-mono text-sm text-foreground/60">
                  {format(new Date(i.date), "dd, MMM yyyy")} by {i.reviewerName}
                </span>
                <span className="text-sm text-primary flex gap-2 items-center">
                  <CircleCheckBig className="w-4 h-4" /> Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
