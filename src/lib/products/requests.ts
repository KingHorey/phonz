import endpoints from "../endpoints";
import { useQuery } from "react-query";
import useAuthAxios from "@/utils/axiosConfig";

import { productCardSchema, productInfoSchema } from "@/utils/types.d";
import { z } from "zod";

export const useGetProducts = (param?: string) => {
  const axios = useAuthAxios();
  const response = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(
        `${endpoints.shop.allProduct}${param ? `${param}` : ""}`
      );
      try {
        const verifiedData = z.array(productCardSchema).safeParse(data.results);
        return verifiedData;
      } catch (err: any) {
        console.error(err.message);
        throw new Error("Failed to fetch or validate products"); // Propagate the error to React Query's error handling
      }
    },
    queryKey: ["all-products", param],
    onError: (error: any) => {
      console.error(error.message);
    },
  });
  return response;
};

export const useGetProductInfo = (link: string) => {
  const axios = useAuthAxios();
  const response = useQuery({
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `${endpoints.shop.oneProduct}${link}/`
        );
        const verifiedData = productInfoSchema.safeParse(data);
        return verifiedData;
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(err.message);
        }
      }
    },
    queryKey: ["product-info"],
  });
  return response;
};
