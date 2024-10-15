import { CircleIcon } from "lucide-react";

import { Form, FormField, FormControl, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

//  import lucide icons
import { EyeIcon, EyeOffIcon } from "lucide-react";

//  import schema validation tools
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userProfileUpdateSchema } from "@/utils/types.d";

//import querying functions
import { useGetUserInfo, useUpdateUser } from "@/lib/user/requests";
import { useQueryClient } from "react-query";

import { authUser as userAuthType } from "@/utils/types";

//  import id from react auth kit hooks
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

function Account() {
  const authUser = useAuthUser<z.infer<typeof userAuthType>>();
  const [passwordReveal, setPasswordReveal] = useState<boolean>(false);
  useQueryClient();
  const {
    data: user,
    isSuccess,
    isLoading,
    isError,
  } = useGetUserInfo(authUser?.id as string);
  const userUpdate = useUpdateUser();

  const form = useForm<z.infer<typeof userProfileUpdateSchema>>({
    resolver: zodResolver(userProfileUpdateSchema),
  });

  useEffect(() => {
    if (user && isSuccess) {
      Object.entries(user).forEach(([key, value]) =>
        form.setValue(
          key as keyof z.infer<typeof userProfileUpdateSchema>,
          value as string | null | undefined
        )
      );
    }
  }, [isSuccess, user, form]);

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (
        name === "confirm_password" &&
        value.confirm_password !== form.getValues("new_password")
      ) {
        form.setError("confirm_password", {
          type: "manual",
          message: "Password does not match",
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  function handleFormSubmission(data: z.infer<typeof userProfileUpdateSchema>) {
    const { new_password, confirm_password } = data;
    if (new_password && confirm_password) {
      if (new_password !== confirm_password) {
        // You can add a custom error handling if passwords do not match
        form.setError("confirm_password", {
          type: "manual",
          message: "Passwords do not match",
        });
        return;
      }
    }

    userUpdate.mutate(data, {
      onSuccess: () => {
        toast("Profile successfully updated");
      },
      onError: (err: any) => {
        Object.keys(err).forEach((key) => {
          return form.setError(
            key as keyof z.infer<typeof userProfileUpdateSchema>,
            {
              message: err[key],
            }
          );
        });
      },
    });
  }

  return (
    <div className="w-full md:w-3/4 md:pl-8">
      <h2 className="text-xl font-bold mb-4">Edit Your Profile</h2>
      {isLoading ? (
        <div className="w-full flex justify-center items-center h-full">
          <CircleIcon size={24} className="animate-spin" />
        </div>
      ) : isError ? (
        <div>Error</div>
      ) : (
        isSuccess && (
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(handleFormSubmission)}
            >
              <div className="flex flex-wrap -mx-2">
                <FormField
                  name="first_name"
                  control={form.control}
                  render={({ field }) => (
                    <div className="w-full md:w-1/2 px-2 mb-4 ">
                      <FormLabel
                        className="block text-sm font-medium mb-1"
                        htmlFor="first_name"
                      >
                        First Name
                      </FormLabel>
                      <FormControl {...field} className="relative">
                        <Input
                          type="text"
                          id="first_name"
                          className="w-full p-2 border rounded relative"
                        />
                      </FormControl>
                      {form.formState.errors.first_name && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors.first_name.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <FormField
                  name="last_name"
                  control={form.control}
                  render={({ field }) => (
                    <div className="w-full md:w-1/2 px-2 mb-4">
                      <FormLabel
                        className="block text-sm font-medium mb-1"
                        htmlFor="last_name"
                      >
                        Last Name
                      </FormLabel>
                      <FormControl {...field}>
                        <Input
                          type="text"
                          id="last_name"
                          className="w-full p-2 border rounded"
                        />
                      </FormControl>
                      {form.formState.errors.last_name && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors.last_name.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="flex flex-wrap -mx-2">
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <div className="w-full md:w-1/2 px-2 mb-4">
                      <FormLabel
                        className="block text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Email Address
                      </FormLabel>
                      <FormControl {...field}>
                        <Input
                          type="text"
                          id="email"
                          className="w-full p-2 border rounded"
                        />
                      </FormControl>
                      {form.formState.errors.email && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <FormField
                  name="phone_number"
                  control={form.control}
                  render={({ field }) => (
                    <div className="w-full md:w-1/2 px-2 mb-4">
                      <FormLabel
                        className="block text-sm font-medium mb-1"
                        htmlFor="phone_number"
                      >
                        Phone Number
                      </FormLabel>
                      <FormControl {...field}>
                        <Input
                          type="text"
                          id="phone_number"
                          className="w-full p-2 border rounded"
                        />
                      </FormControl>
                      {form.formState.errors.phone_number && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors.phone_number.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Password Changes</h3>
                <FormField
                  control={form.control}
                  name="new_password"
                  render={({ field }) => (
                    <div className="mb-4 relative">
                      <FormLabel
                        htmlFor="new_password"
                        className="block text-sm font-medium mb-1"
                      >
                        New Password
                      </FormLabel>
                      <FormControl {...field}>
                        <Input
                          id="new_password"
                          type={passwordReveal ? "text" : "password"}
                          className="w-full p-2 border rounded bg-transparent relative"
                          placeholder="Enter new password"
                          defaultValue=""
                          // value={(e: HTMLInputElement) => e.}
                        />
                      </FormControl>
                      {!passwordReveal ? (
                        <EyeIcon
                          className="absolute top-7 right-3 cursor-pointer"
                          onClick={() => setPasswordReveal(!passwordReveal)}
                        />
                      ) : (
                        <EyeOffIcon
                          className="absolute top-7 right-3 cursor-pointer"
                          onClick={() => setPasswordReveal(!passwordReveal)}
                        />
                      )}
                      {form.formState.errors.new_password && (
                        <p>{form.formState.errors.new_password.message}</p>
                      )}
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <div className="mb-4">
                      <FormLabel
                        htmlFor="confirm_password"
                        className="block text-sm font-medium mb-1"
                      >
                        Confirm Password
                      </FormLabel>
                      <FormControl {...field}>
                        <Input
                          id="confirm_password"
                          type="password"
                          className="w-full p-2 border rounded bg-transparent"
                          placeholder="Confirm New Password"
                          defaultValue=""
                        />
                      </FormControl>
                    </div>
                  )}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  className="px-4 py-2 border rounded"
                  variant="ghost"
                  onClick={() =>
                    form.reset({
                      first_name: user.first_name,
                      last_name: user.last_name,
                      email: user.email,
                      phone_number: user.phone_number,
                      new_password: user.new_password,
                      confirm_password: user.confirm_password,
                    })
                  }
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        )
      )}
    </div>
  );
}

export default Account;
