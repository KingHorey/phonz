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
import { ChevronDown } from "lucide-react";

//  import react-query hooks
import { useGetProducts } from "@/lib/products/requests";

//  react imports
import { useState } from "react";
import Breadcrumbs from "@/layout/Breadcrumbs";

// import { productCardSchema } from "@/utils/types.d";
// import { z } from "zod";

//  import react router hooks
import { useLocation } from "react-router-dom";

//  import number formatter

const sortOrdering = [
  { name: "Rating" },
  { name: "Newest First" },
  { name: "Oldest First" },
  { name: "Price High to Low" },
  { name: "Price Low to High" },
];

function SearchPage() {
  const [sortOrder, setSortOrder] = useState<string>("Newest First");
  const [_, setRevealSideBar] = useState<boolean>(false);
  const { search } = useLocation();

  const {
    data: products,
    isLoading,
    isError,
    isSuccess,
  } = useGetProducts(search.replace(" ", "%"));

  function getSearchQuery() {
    const item = search.split("=")[1];
    const result = item.split("+").join(" ");
    return result;
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
                <div className="xs:hidden xs:absolute md:relative xs:left-0 md:inline-block w-full">
                  <div className="flex flex-col gap-y-3">
                    <h3 className="font-bold text-base poppins-regular">
                      Brand
                    </h3>
                    <form className="flex flex-col gap-x-3 gap-y-2 min-h-[145px] max-h-[150px] overflow-y-scroll">
                      <div>
                        <input
                          type="checkbox"
                          name="brand"
                          value="Apple"
                          id="Apple"
                          className="accent-black"
                        />
                        <label htmlFor="Apple" className="ml-2">
                          Apple
                        </label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          name="brand"
                          value="Samsung"
                          id="Samsung"
                          className="accent-black"
                        />
                        <label htmlFor="Samsung" className="ml-2">
                          Samsung
                        </label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          name="brand"
                          value="OnePlus"
                          id="OnePlus"
                          className="accent-black"
                        />
                        <label htmlFor="OnePlus" className="ml-2">
                          OnePlus
                        </label>
                      </div>
                    </form>
                  </div>
                  <div className="flex flex-col gap-x-3 gap-y-2 min-h-[145px] max-h-[150px] overflow-y-scroll">
                    <h3 className="font-bold text-base poppins-regular">
                      Category
                    </h3>
                    <form className="flex flex-col gap-x-3 gap-y-2">
                      <div>
                        <input
                          type="checkbox"
                          name="category"
                          value="Mobile"
                          id="Mobile"
                          className="accent-black"
                        />
                        <label htmlFor="Mobile" className="ml-2">
                          Mobile
                        </label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          name="category"
                          value="Laptop"
                          id="Laptop"
                          className="accent-black"
                        />
                        <label htmlFor="Laptop" className="ml-2">
                          Laptop
                        </label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          name="category"
                          value="Tablet"
                          id="Tablet"
                          className="accent-black"
                        />
                        <label htmlFor="Tablet" className="ml-2">
                          Tablet
                        </label>
                      </div>
                    </form>
                  </div>
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
                <p className="px-8 text-xl">
                  Search results for: {getSearchQuery()}
                  <span className="font-semibold text-base"></span>
                </p>
                <div className="flex items-center justify-between px-8">
                  <p>
                    Results: <strong>{products?.data?.length}</strong>
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

export default SearchPage;
