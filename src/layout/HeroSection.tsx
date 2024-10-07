import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className="lg:w-full bg-offBlack md:h-[632px] md:max-w-[1440px] xs:min-w-[375px] xs:h-[769px]">
      <div className="flex md:flex-row xs:flex-col xs:h-full md:h-full lg:w-5/6 mx-auto justify-between">
        {/* Left Section */}
        <div className="self-center mx-auto flex flex-col justify-center xs:items-center md:items-start xs:h-[256px]">
          <p className="text-white/30 figtree-400 md:text-sm">Pro Beyond</p>

          {/* Text Container */}
          <div className="relative w-full">
            <h1 className="xs:text-[48px] md:text-[72px] lg:text-[96px] text-white sf-pro-display-regular leading-tight break-words xs:max-w-[300px] md:max-w-none">
              IPhone 15{" "}
              <sup className="text-white xs:text-xl md:text-2xl lg:text-2xl inline-block absolute top-0 border rounded-lg border-white p-1">
                Pro
              </sup>
            </h1>
          </div>

          <p className="text-white/30 figtree-400 text-sm">
            Created to change everything for the better, for everyone
          </p>

          <Button
            asChild
            variant="outline"
            className="bg-transparent text-white/30 hover:text-white/30 text-black duration-200 transition-all mt-3 w-[184px] hover:bg-transparent"
          >
            <Link to="/shop" className="text-white">
              Shop
            </Link>
          </Button>
        </div>

        {/* Image Section */}
        <div className="xs:mx-auto ">
          <img
            src="/images/Iphone Image.png"
            className="xs:w-[289px] md:w-[406px] xs:h-full"
            alt="IPhone 15 Pro"
          />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
