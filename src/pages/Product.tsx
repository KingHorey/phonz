import Navbar from "@/layout/Navbar";
import PageContainer from "@/layout/PageContainer";
import Footer from "@/layout/Footer";
import Breadcrumbs from "@/layout/Breadcrumbs";

//  import styling components
import { Button } from "@/components/ui/button";

// lucide react components
import {
  Truck,
  CpuIcon,
  BatteryIcon,
  SmartphoneIcon,
  Camera,
  SwitchCameraIcon,
  ShieldCheckIcon,
} from "lucide-react";

function Product() {
  return (
    <>
      <Navbar />
      <PageContainer>
        <main className="pt-5">
          <Breadcrumbs />
          <section className="flex xs:flex-col md:flex-row gap-12 w-full md:max-h-[896px] min-h-[850px] items-center">
            <div className="flex xs:flex-col md:flex-row max-h-[540px] min-h-[536px] min-w-[530px] max-w-[532px] gap-12 justify-center items-center">
              <div className="h-full w-[75px]"></div>
              <div className="h-full w-full object-cover">
                <img src="/src/assets/images/Image.png"></img>
              </div>
            </div>
            <div className="flex flex-col gap-8 md:max-h-[672px] md:min-h-[650px] lg:w-3/5 p-2">
              <div>
                <h1 className="sf-pro-display-semibold text-3xl font-semibold mb-3">
                  Product Name
                </h1>
                <h2 className="text-xl sf-pro-display-regular">$800</h2>
              </div>
              <div className="flex flex-col gap-y-3">
                <div className="flex">
                  <p>Select Color: </p>
                </div>
                <div className="flex gap-x-2">
                  <div className="px-5 py-2 border border-black/70 text-black rounded-lg sf-pro-display-regular text-sm font-medium">
                    64GB
                  </div>
                  <div className="px-5 py-2 border border-black/70 text-black rounded-lg sf-pro-display-regular text-sm font-medium">
                    128GB
                  </div>
                  <div className="px-5 py-2 border border-black/70 text-black rounded-lg sf-pro-display-regular text-sm font-medium">
                    256GB
                  </div>
                  <div className="px-5 py-2 border border-black/70 text-black rounded-lg sf-pro-display-regular text-sm font-medium">
                    512GB
                  </div>
                  <div className="px-5 py-2 border border-black/70 text-black rounded-lg sf-pro-display-regular text-sm font-medium">
                    1TB
                  </div>
                </div>
              </div>
              <section className="grid grid-cols-3 gap-3">
                <div className="flex gap-2 items-center  bg-slate-300/20 p-1 rounded-lg justify-center">
                  <div className="flex items-center">
                    <SmartphoneIcon size={24} />
                    <div className="w-[104px] text-center">
                      <p className="text-gray-400 text-sm">Screen size</p>
                      <p>6"</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 bg-slate-300/20 p-1 rounded-lg">
                  <div className="flex items-center">
                    <CpuIcon size={20} />
                    <div className="w-[104px] text-center">
                      <p>CPU</p>
                      <p>6"</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center bg-slate-300/20 rounded-lg p-1 justify-center">
                  <div className="flex items-center">
                    <BatteryIcon size={20} />
                    <div className="w-[104px] text-center">
                      <p className="text-gray-400 text-sm font-semibold">
                        Battery
                      </p>
                      <p>6"</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 items-center  bg-slate-300/20 p-1 rounded-lg justify-center">
                  <div className="flex items-center gap-x-3">
                    <Camera size={24} />
                    <div className="w-[104px] text-center">
                      <p className="text-gray-400 text-sm">Main Camera</p>
                      <p className="text-xs">48MP, 12mp, 8MP</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 items-center  bg-slate-300/20 p-1 rounded-lg justify-center">
                  <div className="flex items-center">
                    <SwitchCameraIcon size={24} />
                    <div className="w-[104px] text-center">
                      <p className="text-gray-400 text-sm">Front Camera</p>
                      <p className="text-xs poppins-regular-medium">12MP</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 items-center  bg-slate-300/20 p-1 rounded-lg justify-center">
                  <div className="flex items-center">
                    <SmartphoneIcon size={24} />
                    <div className="w-[104px] text-center">
                      <p className="text-gray-400 text-sm">Screen size</p>
                      <p>6"</p>
                    </div>
                  </div>
                </div>
              </section>
              <div>
                <p>
                  Enhanced capabilities thanks toan enlarged display of 6.7
                  inchesand work without recharging throughout the day.
                  Incredible photosa s in weak, yes and in bright light using
                  the new system with two cameras more...
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  className="border border-black bg-transparent md:w-1/2 h-12 rounded-lg p-4 duration-200 transition-all"
                  variant="secondary"
                >
                  Add to Wishlist
                </Button>
                <Button
                  className="bg-black/80 hover:bg-black hover:text-white duration-200 transition-all text-white border-black md:w-1/2 h-12 rounded-lg p-4"
                  variant="outline"
                >
                  Add To Cart
                </Button>
              </div>
              <div className="flex gap-x-5">
                <div className="p-2 flex items-center gap-x-2">
                  <div className="p-2 bg-slate-300/20 rounded-lg">
                    <Truck size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Free Delivery</p>
                    <p className="text-sm">2-3 days</p>
                  </div>
                </div>
                <div className="p-2 flex items-center gap-x-2">
                  <div className="p-2 bg-slate-300/20 rounded-lg">
                    <ShieldCheckIcon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">1 year guaranty</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="mb-5 bg-gray-300/20 p-5">
            <h2 className="sf-pro-display text-3xl mb-5">Product Details</h2>
            <div>
              <ul className="list-disc ml-5 mb-10">
                <li>6.1-inch Super Retina XDR display with ProMotion</li>
                <li>Powered by the A17 Bionic chip</li>
                <li>Pro camera system with 48MP Main and Ultra Wide lenses</li>
                <li>Ceramic Shield front cover for added durability</li>
                <li>5G capable for super-fast downloads</li>
              </ul>
              <div className="description">
                The iPhone 15 Pro pushes the boundaries of innovation with its
                groundbreaking design, exceptional performance, and cutting-edge
                features. Whether you're a photography enthusiast, gamer, or
                professional, the iPhone 15 Pro delivers an unparalleled
                experience with its advanced A17 Bionic chip, stunning ProMotion
                display, and impressive camera system. Explore the next level of
                mobile technology with Apple's most powerful iPhone ever.
              </div>
            </div>
          </section>
        </main>
      </PageContainer>
      <Footer />
    </>
  );
}

export default Product;
