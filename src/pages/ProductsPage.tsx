import GridContainer from "@/layout/GridContainer";
import ProductCard from "@/layout/ProductCard";
import Navbar from "@/layout/Navbar";
import PageContainer from "@/layout/PageContainer";
// import { Form } from "@/components/ui/form";
import Footer from "@/layout/Footer";

//  import svg icons and styling
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@radix-ui/react-dropdown-menu";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { ChevronDown } from "lucide-react";

//  import react-query hooks
import { useGetProducts } from "@/lib/products/requests";

//  react imports
import { useState, useEffect } from "react";
import Breadcrumbs from "@/layout/Breadcrumbs";

// import
import { filteringSchema } from "@/utils/types.d";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

//  import number formatter

const sortOrdering = [
  { name: "Rating" },
  { name: "Newest First" },
  { name: "Oldest First" },
  { name: "Price High to Low" },
  { name: "Price Low to High" },
];

const brands = [
  { name: "Apple" },
  { name: "Samsung" },
  { name: "OnePlus" },
  { name: "Xiaomi" },
  { name: "Google" },
  { name: "Realme" },
  { name: "Oppo" },
  { name: "Vivo" },
];

const capacity = [
  { name: 64 },
  { name: 128 },
  { name: 256 },
  { name: 512 },
  { name: 1 },
];

function ProductsPage() {
  const [sortOrder, setSortOrder] = useState<string>("Newest First");
  const [_, setRevealSideBar] = useState<boolean>(false);
  const [filterString, setFilterString] = useState<string>("");

  const {
    data: products,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useGetProducts(filterString);

  const form = useForm<z.infer<typeof filteringSchema>>({
    resolver: zodResolver(filteringSchema),
    defaultValues: {
      capacity: undefined,
      ram: [],
      color: "",
      price: { min: 0, max: 0 },
      brand: [],
    },
  });

  useEffect(() => {
    if (filterString) {
      console.log("url: ", filterString);
      refetch();
    }
  }, [filterString, refetch]);

  form.watch("brand");
  form.watch("capacity");

  function handleBrandFiltering(status: boolean, brand: { name: string }) {
    let result = form.getValues("brand") || [];
    if (!Array.isArray(result)) {
      result = [];
    }
    if (status) {
      result.push(brand.name);
    } else {
      result = result.filter((item) => item !== brand.name);
    }
    form.setValue("brand", result);
    const brands = form.getValues("brand");
    const url = new URLSearchParams();
    brands?.forEach((brand) => {
      url.append("brand", brand);
    });
    setFilterString(`?q&${url.toString()}`);
    // Update the query parameters and refetch the products
  }

  function handleStorageFiltering(status: boolean, capacity: { name: number }) {
    let result = form.getValues("capacity") || [];
    if (!Array.isArray(result)) {
      result = [];
    }
    if (status) {
      result.push(capacity.name);
    } else {
      result = result.filter((item) => item !== capacity.name);
      console.log("updated: ", result);
    }
    console.log(filterString);

    //  check if result has data
    // if (result.length === 0) {
    //   console.log("empty");
    //   result = [];
    //   setFilterString("");
    //   return;
    // }
    form.setValue("capacity", result);
    const storageCapacity = form.getValues("capacity");
    console.log("==> ", storageCapacity);
    const url = new URLSearchParams();
    storageCapacity?.forEach((item) => {
      url.append("capacity", item.toString());
      console.log("new url => ", url);
    });
    if (filterString.length === 0) {
      setFilterString(`?q&${url.toString()}`);
    } else if (filterString.length > 0 && !filterString.includes("capacity")) {
      // If there's an existing filterString but no 'capacity', append the new capacity filter
      setFilterString(`${filterString}&${url.toString()}`);
    } else if (filterString.includes("capacity") && filterString.length > 0) {
      // If 'capacity' is already in filterString, replace it with the new capacity filter
      setFilterString(
        filterString.replace(/(&capacity=[^&]*)/g, `&${url.toString()}`)
      );
    } else {
      // If there's no filterString yet, initialize it with the new capacity filter
      setFilterString(`?q&${url.toString()}`);
    }

    if (result.length === 0) {
      result = [];
      setFilterString("");
      return;
    }
    console.log(filterString);
  }

  return (
    <>
      <Navbar />
      <main>
        <PageContainer>
          <section className="py-10 flex flex-col gap-y-5">
            <Breadcrumbs />
            <div className="flex md:flex-row xs:flex-col gap-3">
              <aside className="xs:w-full md:w-1/5 p-2 flex flex-col gap-y-4 overflow-y-scroll relative">
                <h2
                  className="font-bold text-xl xs:border xs:border-black/30 md:border-none w-fit p-2 rounded-lg xs:text-base text-black/30 hover:text-black duration-200 transition-all cursor-pointer xs:ml-8 md:ml-0 select-none"
                  onClick={() => setRevealSideBar(true)}
                >
                  Filter
                </h2>
                <div className="xs:hidden xs:absolute md:relative xs:left-0 md:inline-block w-full flex flex-col gap-y-5">
                  <div className="flex flex-col gap-y-3">
                    <h3 className="font-bold text-sm poppins-regular">Brand</h3>
                    <Form {...form}>
                      <form
                        className="flex flex-col gap-x-3 gap-y-5 min-h-[145px] max-h-[150px] overflow-y-scroll p-2"
                        // onSubmit={form.handleSubmit((data) =>
                        //   handleFiltering(data)
                        // )}
                      >
                        <FormField
                          name="brand"
                          control={form.control}
                          render={({ field }) => {
                            return (
                              <FormItem>
                                {brands.map((brand) => (
                                  <FormControl key={brand.name}>
                                    <div className="flex gap-x-3 item-center mb-2">
                                      <Checkbox
                                        {...field}
                                        id={brand.name}
                                        value={brand.name}
                                        {...form.register("brand")}
                                        onCheckedChange={(isChecked: boolean) =>
                                          handleBrandFiltering(isChecked, brand)
                                        }
                                      />
                                      <FormLabel htmlFor={brand.name}>
                                        {brand.name}
                                      </FormLabel>
                                    </div>
                                  </FormControl>
                                ))}
                              </FormItem>
                            );
                          }}
                        />
                      </form>
                    </Form>
                  </div>

                  {/*  for storage */}
                  <div className="flex flex-col gap-y-3 my-5">
                    <h3 className="font-bold text-sm poppins-regular">
                      Storage Capacity
                    </h3>
                    <Form {...form}>
                      <form className="flex flex-col gap-x-3 gap-y-5 min-h-[145px] max-h-[150px] overflow-y-scroll p-2">
                        <FormField
                          name="capacity"
                          control={form.control}
                          render={({ field }) => {
                            return (
                              <FormItem>
                                {capacity.map((storage) => (
                                  <FormControl key={storage.name}>
                                    <div className="flex gap-x-3 item-center mb-2">
                                      <Checkbox
                                        {...field}
                                        id={storage.name.toString()}
                                        value={`${storage.name}`}
                                        {...form.register("capacity")}
                                        onCheckedChange={(isChecked: boolean) =>
                                          handleStorageFiltering(
                                            isChecked,
                                            storage
                                          )
                                        }
                                      />
                                      <FormLabel htmlFor={`${storage.name}`}>
                                        {storage.name}GB
                                      </FormLabel>
                                    </div>
                                  </FormControl>
                                ))}
                              </FormItem>
                            );
                          }}
                        />
                      </form>
                    </Form>
                  </div>
                  {/* end */}

                  <div className="flex flex-col gap-x-3 gap-y-2 min-h-[145px] max-h-[150px] overflow-y-scroll">
                    <h3 className="font-bold text-base poppins-regular">
                      Price
                    </h3>
                    <form className="flex flex-col gap-y-3">
                      <div>
                        <input type="radio" name="price" value="0-100" />
                        <label htmlFor="0-100" className="ml-2">
                          0-100
                        </label>
                      </div>
                      <div>
                        <input type="radio" name="price" value="100-500" />
                        <label htmlFor="100-500" className="ml-2">
                          100-500
                        </label>
                      </div>
                      <div>
                        <input type="radio" name="price" value="500-1000" />
                        <label htmlFor="500-1000" className="ml-2">
                          500-1000
                        </label>
                      </div>
                    </form>
                  </div>
                </div>
              </aside>
              <div className="mx-auto w-full">
                <div className="flex items-center justify-between px-8">
                  <p>
                    Results: <strong>564</strong>
                  </p>
                  <div className="w-1/5 flex items-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        className="cursor-pointer select-none"
                      >
                        <Button
                          className="button w-full text-left flex justify-between"
                          variant="outline"
                          asChild
                        >
                          <p>
                            {sortOrder}
                            <ChevronDown size={16} />
                          </p>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white p-2 rounded-lg shadow-md">
                        <DropdownMenuItem>
                          {sortOrdering.map(({ name }) => (
                            <p
                              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer"
                              onClick={() => setSortOrder(name)}
                            >
                              {name}
                            </p>
                          ))}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <GridContainer>
                  {isLoading
                    ? Array.from({ length: 9 }).map((_) => (
                        <Skeleton className="min-w-[160px] w-[268px] h-[380px] bg-[#F6F6F6] rounded-lg py-6 px-4" />
                      ))
                    : isSuccess
                    ? products.data?.map((product) => (
                        <ProductCard key={product.id} {...product} />
                      ))
                    : isError && <p>Error fetching data</p>}
                </GridContainer>
              </div>
            </div>
          </section>
        </PageContainer>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default ProductsPage;
