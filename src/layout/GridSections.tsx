import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function GridSections() {
  return (
    <div className="lg:w-full bg-white md:max-w-[1440px] xs:min-w-[375px]">
      <div className="h-full w-full xs:flex xs:mt-5 md:mt-0 xs:flex-col md:grid lg:grid-rows-2 lg:grid-cols-2">
        <div className="col-span-1">
          <div className="flex items-center h-full ">
            <div className="xs:w-4/5 md:w-3/5 p-2">
              <h2 className="sf-pro-display-bold xs:text-base md:text-3xl">
                Samsung S24 Ultra
              </h2>
              <p className="figtree-400 text-[.5rem] md:text-xs text-black/50">
                Welcome to the era of mobile AI. With Galaxy S24 Ultra in your
                hands, you can unleash whole new levels of creativity,
                productivity and possibility — starting with the most important
                device in your life. Your smartphone.
              </p>
            </div>
            <div className="h-full">
              <img
                src="/images/galaxy-s24-ultra-highlights-color-titanium-gray-back-mo-removebg-preview.png"
                className="h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="col-span-1 bg-offGray row-span-1 grid grid-cols-2">
          <div className="col-span-1 row-span-full h-5/6 border ">
            <div className="flex items-center w-full gap-x-3">
              <div className="w-3/5">
                <img
                  src="/images/hero__gnfk5g59t0qe_xlarge_2x 1.png"
                  className="h-full object-cover w-full"
                />
              </div>
              <div className="text-black/50 p-2 flex flex-col gap-y-4">
                <p className="text-3xl sf-pro-display-bold">
                  Apple AirPods Pro Max
                </p>
                <p>Computational audio. Listen, it's powerful</p>
              </div>
            </div>
          </div>
          <div className="col-span-1 row-span-full border">
            <div className="col-span-1 row-span-full h-5/6 border ">
              <div className="flex items-center w-full gap-x-3">
                <div className="w-3/5">
                  <img
                    src="/images/1-removebg-preview.png"
                    className="h-full object-cover w-full"
                  />
                </div>
                <div className="text-black/50 p-2 flex flex-col gap-y-4">
                  <p className="text-3xl sf-pro-display-bold">
                    Apple AirPods Pro Max
                  </p>
                  <p>Computational audio. Listen, it's powerful</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 row-span-full items-center">
          <div className="flex flex-col items-center justify-center h-full  bg-gray-200">
            <div className="text-center mt-5">
              <p className="figtree-700 text-3xl text-black/50 ">
                Durable design. <br />
                <span className="text-black/50">
                  Who says beauty isn’t meant to last?
                </span>
              </p>
              <p className="mt-5 text-sm w-4/5 mx-auto text-black/50">
                A masterpiece of engineering and design, crafted to endure the
                test of time. Its premium materials and robust construction
                ensure a device that not only looks stunning but also performs
                flawlessly, year after year. Elevate your experience with the
                iPhone 16 series—a flagship that stands out in every way.{" "}
              </p>
              <Button
                asChild
                variant="outline"
                className="bg-transparent border border-black/30 hover:bg-transparent mt-5 text-black/50 hover:text-black duration-300 transition-colors"
              >
                <Link to="/shop">Shop Now</Link>
              </Button>
            </div>
            <div className="my-auto relative">
              <h2 className="sf-pro-display-bold xs:text-6xl sm:text-8xl md:text-8xl lg:text-8xl left-0 right-0 absolute text-center xs:top-16 sm:top-16 md:top-16 text-black/50">
                iPhone 16
              </h2>
              <img
                src="/images/iphone-16-design-removebg-preview.png"
                className="h-full object-cover mx-auto my-auto grayscale"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GridSections;
