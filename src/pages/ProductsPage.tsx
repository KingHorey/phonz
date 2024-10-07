import GridContainer from "@/layout/GridContainer";
import ProductCard from "@/layout/ProductCard";
import Navbar from "@/layout/Navbar";
import PageContainer from "@/layout/PageContainer";
// import { Form } from "@/components/ui/form";
import Footer from "@/layout/Footer";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

//  react imports
import { useState } from "react";
import Breadcrumbs from "@/layout/Breadcrumbs";

const sortOrdering = [
  { name: "Rating" },
  { name: "Newest First" },
  { name: "Oldest First" },
  { name: "Price High to Low" },
  { name: "Price Low to High" },
];

function ProductsPage() {
  const [sortOrder, setSortOrder] = useState<string>("Newest First");
  const [_, setRevealSideBar] = useState<boolean>(false);

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
                  <ProductCard />
                  <ProductCard />
                  <ProductCard />
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
