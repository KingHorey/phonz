import endpoint from "../endpoints";
import { z } from "zod";
import { useMutation } from "react-query";
import useAuthAxios from "@/utils/axiosConfig";
import { loginSchema } from "@/utils/types.d";

import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { authUser as userAuthType } from "@/utils/types";

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

export const useGetUserInfo = () => {
  const query = useQuery;
  const user = useAuthUser<z.infer<typeof userAuthType>>();
  console.log(user);
  const id = user ? user.id : null;
  const axios = useAuthAxios();
  const response = query({
    queryFn: async () => {
      try {
        const { data } = await axios.get(`${endpoint.user.profile}${id}/`);
        return data;
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(err.message);
        }
      }
    },
    queryKey: ["user-info"],
  });
  return response;
};
