import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

/* import components for layout */
import ProductCard from "./ProductCard";
import GridContainer from "./GridContainer";

//  import axios
import { useGetProducts } from "@/lib/products/requests";

/* import custom axios config */

/* schema check and type */
// import { z } from "zod";
// import { productCardSchema } from "../utils/types.d";
import { Skeleton } from "@/components/ui/skeleton";

const links = [
  {
    path: "New Arrivals",
    link: "new-arrivals",
  },
  {
    path: "Bestsellers",
    link: "bestsellers",
  },
];

function ProductsGrid() {
  const [currentLink, setCurrentLink] = useState<string>("new-arrivals");

  const handleLinkClick = (path: string, link: string) => {
    console.log(path);
    setCurrentLink(link);
  };

  const {
    data: product,
    isSuccess,
    isLoading,
    refetch,
  } = useGetProducts(`?q=${currentLink}`);

  /* fetch data from the backend */
  useEffect(() => {
    refetch();
  }, [currentLink, refetch]);

  return (
    <section className="w-5/6 mx-auto pt-10 my-10">
      <div className=" mx-[50px]">
        <ul className="flex gap-5 w-full">
          {links.map(({ path, link }) => {
            return (
              <li
                key={path}
                onClick={() => handleLinkClick(path, link)}
                className={`${
                  currentLink === link
                    ? "text-black font-semibold"
                    : "text-gray-400"
                } cursor-pointer poppins-regular `}
              >
                {path}
              </li>
            );
          })}
        </ul>
      </div>
      <GridContainer>
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full sm:w-[300px] md:w-[240px]"
              >
                <Skeleton />
              </div>
            ))
          : isSuccess &&
            product &&
            product?.data?.map((item) => (
              <ProductCard {...item} key={item.id} />
            ))}
      </GridContainer>
    </section>
  );
}

export default ProductsGrid;
