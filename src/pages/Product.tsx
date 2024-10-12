import Navbar from "@/layout/Navbar";
import PageContainer from "@/layout/PageContainer";
import Footer from "@/layout/Footer";
import Breadcrumbs from "@/layout/Breadcrumbs";

//  import styling components
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";

// lucide react components
import {
  Truck,
  CpuIcon,
  BatteryIcon,
  SmartphoneIcon,
  Camera,
  SwitchCameraIcon,
  ShieldCheckIcon,
  MicrochipIcon,
  PlusIcon,
  MinusIcon,
} from "lucide-react";

import { useGetProductInfo } from "@/lib/products/requests";
import { useLocation } from "react-router-dom";

//  schema definitions
import { variantsSchema } from "@/utils/types";
import { z } from "zod";

//  import formatter for currency formatting
import { formatter } from "@/lib/utils";

import { useState, useEffect } from "react";

// import cart actions
import { add_to_cart } from "./Cart/CartSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

function Product() {
  const { state, pathname } = useLocation();
  const split_link = pathname.split("/");
  const link = split_link[split_link.length - 1];
  const productId = state?.productId;
  const {
    data: product,
    isLoading,
    isSuccess,
  } = useGetProductInfo(productId || link);

  const [currentVariant, setCurrentVariant] = useState<
    z.infer<typeof variantsSchema>
  >(
    product?.data?.variants[0] || {
      id: "",
      color: [],
      capacity: 0,
      price: "",
      quantity: 0,
    }
  );

  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const [colorWarning, setShowColorWarning] = useState<boolean | null>(null);

  function incrementPurchaseQty() {
    if (purchaseQuantity >= currentVariant.quantity)
      return alert("Insufficient quantity in stock");
    setPurchaseQuantity(purchaseQuantity + 1);
  }

  function decrementPurchaseQty() {
    if (purchaseQuantity <= 1) return;
    setPurchaseQuantity(purchaseQuantity - 1);
  }

  const [currentColor, setColor] = useState<string>("");
  const dispatch = useDispatch();

  function handleColorSet(color: string) {
    setColor(color);
    setShowColorWarning(false);
  }

  useEffect(() => {
    if (isSuccess && product?.data)
      setCurrentVariant(product?.data?.variants[0]);
  }, [isSuccess, product]);

  //  handle the variant selected

  function handleCurrentVariant(count: number) {
    setColor(""); //  reset the color
    const selectedVariant = product?.data?.variants.find(
      (variant) => variant.capacity === count
    );
    if (selectedVariant) {
      setCurrentVariant(selectedVariant);
    }
  }

  const sortedArray = product?.data?.variants
    .map((variant) => variant.capacity)
    .sort((a, b) => a - b);

  function handleCartAddition() {
    const { price, capacity, id } = currentVariant;
    const name = product?.data?.name;
    const quantity = purchaseQuantity;
    const color = currentColor;
    const image = product?.data?.images[0].image;
    dispatch(
      add_to_cart({
        name: name as string,
        price: parseInt(price) * quantity,
        image: image as string,
        capacity,
        quantity,
        color,
        product_id: product?.data?.id as string,
        variant_id: id,
        color_id: currentVariant.id,
      })
    );
    toast.success("Item added to cart");
  }

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
                <img src={isLoading ? "" : product?.data?.images[0].image} />
                {isLoading && <Skeleton />}
              </div>
            </div>
            <div className="flex flex-col gap-8 md:max-h-[672px] md:min-h-[650px] lg:w-3/5 p-2">
              <div>
                <h1 className="sf-pro-display-semibold text-3xl font-semibold mb-3">
                  {isLoading ? <Skeleton /> : product?.data?.name}{" "}
                </h1>
                <h2 className="text-xl sf-pro-display-regular flex justify-between items-center">
                  {isLoading ? (
                    <Skeleton />
                  ) : (
                    isSuccess &&
                    formatter.format(currentVariant.price as unknown as number)
                  )}
                  <span className="text-sm text-gray-500">
                    {currentVariant.quantity > 0
                      ? `In stock: ${currentVariant.quantity} pieces`
                      : "Out of stock"}
                  </span>
                </h2>
              </div>
              <div className="flex flex-col gap-y-3">
                <div className="flex items-center gap-3">
                  {isLoading ? (
                    <Skeleton />
                  ) : (
                    <>
                      <p className="text-sm">Select Color: </p>
                      {currentVariant.color.map((color) => (
                        <div
                          style={{ backgroundColor: `${color.color}` }}
                          className={`rounded-full w-6 h-6 border cursor-pointer ${
                            currentColor === color.color &&
                            "border-2 border-yellow-300"
                          }`}
                          onClick={() => handleColorSet(color.color)}
                        ></div>
                      ))}
                    </>
                  )}
                </div>
                <div className="flex gap-x-2">
                  {sortedArray?.map((variant, count) => (
                    <div
                      className={`px-5 py-2 border border-black/70 text-black rounded-lg sf-pro-display-regular text-sm font-medium cursor-pointer ${
                        currentVariant.capacity === variant
                          ? "bg-black text-white"
                          : "bg-transparent"
                      }`}
                      key={count}
                      onClick={() => handleCurrentVariant(variant)}
                    >
                      {variant}GB
                    </div>
                  ))}
                </div>
              </div>
              <section className="grid grid-cols-3 gap-3">
                <div className="flex gap-2 items-center  bg-slate-300/20 p-1 rounded-lg justify-center">
                  <div className="flex items-center gap-x-3">
                    <SmartphoneIcon size={24} />
                    <div className="w-[104px] text-center">
                      <p className="text-gray-400 text-sm">Screen size</p>
                      <p className="text-sm">{product?.data?.screen_size}"</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 bg-slate-300/20 p-1 rounded-lg">
                  <div className="flex items-center gap-x-3">
                    <CpuIcon size={20} />
                    <div className="w-[104px] text-center flex flex-col ">
                      <p className="text-gray-400 text-sm">CPU</p>
                      <p className="text-sm">{product?.data?.cpu}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center bg-slate-300/20 rounded-lg p-1 justify-center">
                  <div className="flex items-center gap-x-3">
                    <BatteryIcon size={20} />
                    <div className="w-[104px] text-center">
                      <p className="text-gray-400 text-sm">Battery</p>
                      <p className="text-sm">{product?.data?.battery}mAh</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 items-center  bg-slate-300/20 p-1 rounded-lg justify-center">
                  <div className="flex items-center gap-x-3">
                    <Camera size={24} />
                    <div className="w-[104px] text-center">
                      <p className="text-gray-400 text-sm">Main Camera</p>
                      <p className="text-sm">{product?.data?.rear_camera} MP</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 items-center  bg-slate-300/20 p-1 rounded-lg justify-center">
                  <div className="flex items-center gap-x-3">
                    <SwitchCameraIcon size={24} />
                    <div className="w-[104px] text-center">
                      <p className="text-gray-400 text-sm">Front Camera</p>
                      <p className="text-xs poppins-regular-medium">
                        {product?.data?.front_camera} MP
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 items-center  bg-slate-300/20 p-1 rounded-lg justify-center">
                  <div className="flex items-center gap-x-3">
                    <MicrochipIcon size={20} />
                    <div className="w-[104px] text-center">
                      <p className="text-gray-400 text-sm">CPU cores</p>
                      <p className="text-sm">{product?.data?.cpu_cores}</p>
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
              {colorWarning && (
                <p className="text-sm text-red-500">
                  Kindly choose a color before adding to cart
                </p>
              )}
              <div className="flex gap-2">
                <Button
                  className="border border-black bg-transparent md:w-1/2 h-12 rounded-lg p-4 duration-200 transition-all"
                  variant="secondary"
                >
                  {isLoading ? <Skeleton /> : "Add To Wishlist"}
                </Button>
                {colorWarning !== null && colorWarning === false ? (
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button
                        className="bg-black/80 hover:bg-black hover:text-white duration-200 transition-all text-white border-black md:w-1/2 h-12 rounded-lg p-4"
                        variant="outline"
                      >
                        {isLoading ? <Skeleton /> : "Select Quantity"}
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent className="flex flex-col items-center gap-y-5 ">
                      <div className="w-2/5 flex flex-col items-center space-y-3 gap-y-3 p-2">
                        <DrawerHeader className="font-semibold sf-pro-display-semibold">
                          <DrawerTitle>
                            Select quantity for {product?.data?.name} -
                            {currentVariant.capacity}GB
                          </DrawerTitle>
                        </DrawerHeader>
                        <div className="w-2/5 flex justify-center items-center gap-5">
                          <Button
                            className="p-2 border rounded-full mr-3"
                            variant="outline"
                            onClick={() => decrementPurchaseQty()}
                          >
                            <MinusIcon
                              size={20}
                              className="w-4 h-4"
                              fill={"white"}
                            />
                          </Button>
                          <p className="afacad-flux-600 text-6xl w-4/5 text-center">
                            {purchaseQuantity}
                          </p>
                          <Button
                            className="p-2 border rounded-full ml-3"
                            variant="outline"
                            onClick={() => incrementPurchaseQty()}
                          >
                            <PlusIcon size={20} />
                          </Button>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={handleCartAddition}
                        >
                          Add to cart
                        </Button>
                        <DrawerClose className="w-full bg-black text-white rounded-lg py-2">
                          Continue Shopping
                        </DrawerClose>
                      </div>
                    </DrawerContent>
                  </Drawer>
                ) : (
                  <Button
                    className="bg-black/80 hover:bg-black hover:text-white duration-200 transition-all text-white border-black md:w-1/2 h-12 rounded-lg p-4"
                    variant="outline"
                    onClick={() => setShowColorWarning(true)}
                  >
                    {isLoading ? <Skeleton /> : "Add To Cart"}
                  </Button>
                )}
              </div>
              <div className="flex gap-x-5">
                <div className="p-2 flex items-center gap-x-2">
                  <div className="p-2 bg-slate-300/20 rounded-lg">
                    <Truck size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">
                      {isLoading ? <Skeleton /> : "Free Shipping on all orders"}
                    </p>
                    <p className="text-sm">
                      {isLoading ? <Skeleton /> : "2-3 days"}{" "}
                    </p>
                  </div>
                </div>
                <div className="p-2 flex items-center gap-x-2">
                  <div className="p-2 bg-slate-300/20 rounded-lg">
                    <ShieldCheckIcon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">
                      {isLoading ? <Skeleton /> : "1 Year Warranty"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="mb-5 bg-gray-300/20 p-5 rounded-lgnp">
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
