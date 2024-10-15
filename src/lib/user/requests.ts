import endpoint from "../endpoints";
import { z } from "zod";
import { useMutation } from "react-query";
import useAuthAxios from "@/utils/axiosConfig";
import { loginSchema, userProfileUpdateSchema } from "@/utils/types.d";

import { useQuery } from "react-query";

export const useLogin = () => {
  const axios = useAuthAxios();
  const mutation = useMutation(async (info: z.infer<typeof loginSchema>) => {
    try {
      const { data } = await axios.post(endpoint.user.login, info);
      return data;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  });
  return mutation;
};

export const useRegister = () => {
  const axios = useAuthAxios();
  const mutation = useMutation(async (info: z.infer<typeof loginSchema>) => {
    try {
      const { data } = await axios.post(endpoint.user.register, info);
      return data;
    } catch (err: any) {
      if (err.response) {
        const message = err.response.data;
        throw message;
      } else throw new Error(err);
    }
  });
  return mutation;
};

export const useGetUserInfo = (id: string) => {
  const query = useQuery;
  const url = `${endpoint.user.profile}${id}/`;
  const axios = useAuthAxios();
  if (id.length === 0) {
    return { data: null, isSuccess: false, isLoading: false, isError: false };
  }
  const response = query({
    queryFn: async () => {
      try {
        const { data } = await axios.get(url);
        return data;
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(err.message);
        }
      }
    },
    queryKey: ["user-info", id],
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  return response;
};

export function useUpdateUser() {
  const axios = useAuthAxios();
  const mutation = useMutation(
    async (data: z.infer<typeof userProfileUpdateSchema>) => {
      try {
        const url = `${endpoint.user.profile}${data.id}/`;
        const response = await axios.put(url, data);
        return response;
      } catch (err: any) {
        if (err.response) {
          const message = err.response.data;
          throw message;
        }
      }
    }
  );
  return mutation;
}
