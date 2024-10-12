import Footer from "@/layout/Footer";
import GridSections from "@/layout/GridSections";
import HeroSection from "@/layout/HeroSection";
import Navbar from "@/layout/Navbar";
import ProductsGrid from "@/layout/ProductsGrid";

import { Apple, Samsung, Xiaomi, OnePlus } from "@/components/ui/svg/logos";

import { Link } from "react-router-dom";
import FlashSale from "@/layout/FlashSale";
import { HandCoinsIcon, HeadsetIcon, Truck } from "lucide-react";

const category = [
  {
    name: "apple",
    icon: Apple,
  },
  {
    name: "samsung",
    icon: Samsung,
  },
  {
    name: "xiaomi",
    icon: Xiaomi,
  },
  {
    name: "oneplus",
    icon: OnePlus,
  },
];

function Homepage() {
  return (
    <div>
      <Navbar />
      <main>
        <HeroSection />
        <GridSections />
        <section className=" relative w-full max-w-[1440px] mx-auto py-10 bg-[#FAFAFA]">
          <div className="xs:text-center lg:mx-[160px]">
            <h3 className="lg:text-[24px] sf-pro-display-bold">
              Browse By Brand
            </h3>
            <div className="mt-5">
              <ul className="grid grid-cols-2 gap-5 lg:flex lg:flex-row lg:gap-x-6 lg:justify-evenly xs:justify-items-center">
                {category.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 bg-[#EDEDED] justify-center flex-col min-w-[135px] w-[160px] h-[128px] rounded-lg"
                  >
                    <Link to={`/shop/${item.name.toLowerCase()}`}>
                      <div className="">
                        <item.icon />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <ProductsGrid />
        <div className="w-full my-10">
          <div className="flex xs:flex-col md:flex-row justify-evenly gap-y-10 p-2">
            <div className="flex flex-col items-center justify-center gap-y-3">
              <div className="p-2 border-8 border-gray-500/70 rounded-full w-fit bg-black/90">
                <Truck size={30} fill="black" color="white" />
              </div>
              <p className="poppins-regular text-sm font-semibold">
                Free and Fast Delivery
              </p>
            </div>
            <div className="flex flex-col items-center gap-y-3">
              <div className="p-2 border-8 border-gray-500/70 rounded-full w-fit bg-black/90">
                <HeadsetIcon size={30} fill="black" color="white" />
              </div>
              <p className="poppins-regular text-sm  font-semibold">
                24/7 Customer Support
              </p>
            </div>
            <div className="flex flex-col items-center gap-y-3">
              <div className="p-2 border-8 border-gray-500/70 rounded-full w-fit bg-black/90">
                <HandCoinsIcon size={30} fill="black" color="white" />
              </div>
              <p className="poppins-regular text-sm font-semibold">
                Money Back Guarantee
              </p>
            </div>
          </div>
        </div>
        <FlashSale />
      </main>
      <Footer />
    </div>
  );
}

export default Homepage;
