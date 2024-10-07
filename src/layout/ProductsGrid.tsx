import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

/* import components for layout */
import ProductCard from "./ProductCard";
import GridContainer from "./GridContainer";

/* import custom axios config */
import myAxios from "../utils/axiosConfig";

/* schema check and type */
import { z } from "zod";
import { productCardSchema } from "../utils/types.d";

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
  const [currentLink, setCurrentLink] = useState<string>("New Arrivals");
  const [productData, setProductData] = useState<
    z.infer<typeof productCardSchema>[]
  >([]);

  const handleLinkClick = (path: string, link: string) => {
    console.log(path, link);
    setCurrentLink(link);
  };

  /* fetch data from the backend */
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await myAxios.get(`/{currentLink}`);
        if (data.status === 200) {
          const verifyData = productCardSchema.array().parse(data.data);
          setProductData(verifyData);
        }
      } catch (err: any) {
        console.error(err.message);
      }
    };
    getData();
  }, [currentLink]);

  return (
    <section className="w-full pt-10">
      <div className="lg:mx-[160px]">
        <ul className="flex gap-5 ml-10">
          {links.map(({ path, link }) => {
            return (
              <li
                key={path}
                onClick={() => handleLinkClick(path, link)}
                className={`text-gray-400 sf-pro-display-regular cursor-pointer ${
                  currentLink === path ? "text-black" : ""
                }`}
              >
                {path}
              </li>
            );
          })}
        </ul>
      </div>
      <GridContainer>
        {!productData
          ? ""
          : Array.from({ length: 9 }).map((_, index) => (
              <ProductCard key={index} />
            ))}
      </GridContainer>
    </section>
  );
}

export default ProductsGrid;
