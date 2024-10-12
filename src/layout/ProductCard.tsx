import { Button } from "@/components/ui/button";

import { HeartIcon } from "lucide-react";

//  react router
import { Link } from "react-router-dom";

/* import react hooks */

/* import schema and type checking (zod) */
import { z } from "zod";
import { productCardSchema } from "@/utils/types";

//  format currency
import { formatter } from "@/lib/utils";

// data: z.infer<typeof productCardSchema>;
const ProductCard = (data: z.infer<typeof productCardSchema>) => {
  return (
    <div className="flex flex-col  min-w-[160px] w-[268px] h-[380px] bg-[#F6F6F6] rounded-lg py-6 px-4">
      <div className="h-full text-center flex flex-col gap-4">
        <div className="p-2 self-end">
          {/* {data.favorite ? "red" : "white"} */}
          <HeartIcon size={24} />
        </div>
        <div className="flex flex-col gap-5">
          <Link
            to={`/shop/product/${data.link}`}
            state={{ productId: data.id }}
          >
            <div className="w-full h-[160px]">
              <img
                src={data.images[0].image}
                alt={data.name}
                className="object-contain h-full w-full"
              ></img>
            </div>
          </Link>

          <div className="flex flex-col gap-2">
            <Link
              to={`/shop/product/${data.link}`}
              state={{ productId: data.id }}
            >
              <p className="sf-pro-display-regular font-semibold text-sm">
                {data.name}
              </p>
            </Link>
            {/* <p className="text-sm">{data.variants.length} storage variants</p> */}
            <p>
              <span className="font-semibold text-sm">
                {formatter.format(data.variants[0].price as unknown as number)}{" "}
                -{" "}
                {formatter.format(
                  data.variants[data.variants.length - 1]
                    .price as unknown as number
                )}
              </span>{" "}
            </p>
            <Button
              variant="outline"
              className="bg-black/80 rounded-lg text-white hover:bg-black hover:text-white duration-200 transition-all w-4/5 mx-auto border-black/80 hover:border-black"
              asChild
              // Add onClick handler here
            >
              <Link
                to={`/shop/product/${data.link}`}
                state={{ productId: data.id }}
              >
                Buy Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
