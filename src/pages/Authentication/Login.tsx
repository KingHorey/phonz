import { SmartphoneIcon, EyeIcon, EyeOffIcon, LoaderIcon } from "lucide-react";

import Homepage from "../Homepage";

//  import validation tools
import { loginSchema } from "../../utils/types.d";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

//  styling components
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// react-router elements
import { Link, useNavigate } from "react-router-dom";

import { useLogin } from "@/lib/user/requests";

//  authentication components
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignIn from "react-auth-kit/hooks/useSignIn";

import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  access: string;
  refresh: string;
  id: string;
  first_name: string;
  last_name: string;
}

//  import react components
import { useState } from "react";

const Login = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const [reveal, setReveal] = useState<boolean>(false);

  const login = useLogin();
  const signIn = useSignIn();
  const navigate = useNavigate();

  function handleLogin(data: z.infer<typeof loginSchema>) {
    login.mutate(data, {
      onSuccess: (response) => {
        const { id, first_name, last_name } = jwtDecode<CustomJwtPayload>(
          response.access
        );
        const { access, refresh } = response;
        signIn({
          auth: {
            token: access,
            type: "Bearer",
          },
          refresh: refresh,
          userState: {
            id,
            first_name,
            last_name,
          },
        });

        setTimeout(() => {
          navigate("/home");
          toast("Successfully logged in");
        }, 1000);
      },
      onError: (error) => {
        console.error("Login failed:", error);
      },
    });
  }

  // const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
    return <Homepage />;
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4 ">
      <div className="max-w-sm w-full text-gray-600 p-5 shadow-md rounded-lg">
        <div className="text-center">
          <div className="flex gap-3 items-center w-fit mx-auto justify-center">
            <SmartphoneIcon size={24} />{" "}
            <p className="text-xl font-semibold sf-pro-display">Phonz</p>
          </div>
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
            <p className="">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => handleLogin(data))}
            className="mt-8 space-y-5"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="JohnDoe@email.com"
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                      />
                    </FormControl>
                    {form.formState.errors.email && (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </FormItem>
                );
              }}
            ></FormField>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type={reveal ? "text" : "password"}
                      placeholder="********"
                      className="w-full mt-2 px-3 py-4 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg relative"
                    />
                  </FormControl>
                  {reveal ? (
                    <EyeIcon
                      size={20}
                      className="absolute top-8 right-3 cursor-pointer"
                      onClick={() => setReveal(false)}
                    />
                  ) : (
                    <EyeOffIcon
                      size={20}
                      className="absolute top-8 right-3 cursor-pointer"
                      onClick={() => setReveal(true)}
                    />
                  )}
                  {form.formState.errors.password && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </FormItem>
              )}
            ></FormField>
            <Button
              variant="outline"
              className="w-full px-4 py-2 text-white font-medium bg-black/70 hover:bg-black active:bg-black rounded-lg duration-150 hover:text-white"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <LoaderIcon size={20} className="animate-spin" />
              ) : (
                "Log in"
              )}
            </Button>
            <div className="text-center">
              <a href="javascript:void(0)" className="hover:text-indigo-600">
                Forgot password?
              </a>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default Login;
