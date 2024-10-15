import { SmartphoneIcon, EyeIcon, EyeOffIcon } from "lucide-react";

//  import react hooks
import { useState } from "react";

// import react-router
import { Link, useNavigate } from "react-router-dom";

//  shadcn components
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

//  import validation tools
import { useForm } from "react-hook-form";
import { registerSchema } from "@/utils/types.d";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//  import register hook
import { useRegister } from "@/lib/user/requests";

function Register() {
  const [reveal, setReveal] = useState(false);
  const register = useRegister();

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  function handleRegister(data: z.infer<typeof registerSchema>) {
    register.mutate(data, {
      onSuccess: () => {
        toast("Successfully registered");
        form.reset();
        navigate("/login");
      },
      onError: (err: any) => {
        if (err.error) {
          Object.keys(err.error).forEach((key) => {
            return form.setError(key as keyof z.infer<typeof registerSchema>, {
              message: err.error[key],
            });
          });
        }
        console.log(form.formState.errors);
      },
    });
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 shadow-md p-5 rounded-lg">
        <div className="text-center">
          <div className="flex gap-3 items-center w-fit mx-auto justify-center">
            <SmartphoneIcon size={24} />
            <p className="text-xl font-semibold sf-pro-display">Phonz</p>
          </div>
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Sign up
            </h3>
            <p className="">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
        <Form {...form}>
          <form
            className="space-y-5 mt-8"
            onSubmit={form.handleSubmit((data) => handleRegister(data))}
          >
            <FormField
              name="first_name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="John" />
                  </FormControl>
                  {form.formState.errors.first_name && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.first_name.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              name="last_name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Doe" />
                  </FormControl>
                  {form.formState.errors.last_name && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.last_name.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="johndoe@email.com" />
                  </FormControl>
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.email?.message || ""}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="********"
                      type={reveal ? "text" : "password"}
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
                    <p className="text-red-500 text-xs">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-x-3 py-2.5 mt-5 border rounded-lg text-sm font-medium hover:text-white hover:bg-black duration-150 transition-colors active:bg-gray-100"
            >
              Sign up
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}

export default Register;
