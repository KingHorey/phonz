import { Button } from "@/components/ui/button";

import { HeartIcon } from "lucide-react";

//  react router
import { Link } from "react-router-dom";

/* import react hooks */

/* import schema and type checking (zod) */
// import { z } from "zod";
// import { productCardSchema } from "@/utils/types";

// data: z.infer<typeof productCardSchema>;
const ProductCard = () => {
  return (
    <div className="flex flex-col  min-w-[160px] w-[268px] h-[380px] bg-[#F6F6F6] rounded-lg py-6 px-4">
      <div className="h-full text-center flex flex-col gap-4">
        <div className="p-2 self-end">
          {/* {data.favorite ? "red" : "white"} */}
          <HeartIcon size={24} />
        </div>
        <div className="flex flex-col gap-5">
          <Link to="/s">
            <div className="w-full h-[160px]">
              <img
                src="/images/Iphone 14 pro 1.png"
                alt=""
                className="object-contain h-full w-full"
              >
                {/* {data.image} */}
              </img>
            </div>
          </Link>

          <div className="flex flex-col gap-2">
            <Link to="/s">
              <p className="sf-pro-display-regular font-semibold text-sm">
                Apple iPhone 14 Pro Max 128GB Deep Purple (MQ9T3RX/A)
              </p>
            </Link>
            <p></p>
            <Button
              variant="outline"
              className="bg-black/80 rounded-lg text-white hover:bg-black hover:text-white duration-200 transition-all w-4/5 mx-auto border-black/80 hover:border-black"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
