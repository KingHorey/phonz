import Footer from "@/layout/Footer";
import GridSections from "@/layout/GridSections";
import HeroSection from "@/layout/HeroSection";
import Navbar from "@/layout/Navbar";
import ProductsGrid from "@/layout/ProductsGrid";

import {
  Smartphone,
  HeadsetIcon,
  WatchIcon,
  SmartphoneChargingIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const category = [
  {
    name: "Phones",
    icon: Smartphone,
  },
  {
    name: "Headphones",
    icon: HeadsetIcon,
  },
  {
    name: "Smartwatches",
    icon: WatchIcon,
  },
  {
    name: "Powerbanks",
    icon: SmartphoneChargingIcon,
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
              Browse By Category
            </h3>
            <div className="mt-5">
              <ul className="grid grid-cols-2 gap-5 lg:flex lg:flex-row lg:gap-x-6 lg:justify-evenly xs:justify-items-center">
                {category.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 bg-[#EDEDED] justify-center flex-col min-w-[135px] w-[160px] h-[128px] rounded-lg"
                  >
                    <Link to={`/store/${item.name.toLowerCase()}`}>
                      <item.icon size={24} className="mx-auto" />
                      <span className="sf-pro-display-regular text-sm">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            /
          </div>
        </section>
        <ProductsGrid />
      </main>
      <Footer />
    </div>
  );
}

export default Homepage;
