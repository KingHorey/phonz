import PageContainer from "@/layout/PageContainer";
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";

//  import Shadcn components
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

// import formatter for currency
import { formatter } from "@/lib/utils";

//  import react-redux hooks
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./cartStore";

//  import cart actions
import { remove_from_cart } from "./CartSlice";
import { Link } from "react-router-dom";

function Cart() {
  const cartItems = useSelector((items: RootState) => items.cart.item);
  const dispatch = useDispatch();

  function calculateTotal() {
    return cartItems.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
  }

  return (
    <>
      <Navbar />
      <main>
        <PageContainer>
          <section className="flex xs:flex-col lg:flex-row w-full justify-center h-screen p-5 gap-x-5 py-10">
            <div className="h-[590px] overflow-y-scroll sf-pro-display w-full lg:w-[580px] p-2">
              <h1 className="text-xl font-semibold">Shopping Cart</h1>
              <div className="mt-10">
                {cartItems.length == 0 && (
                  <div className="flex flex-col gap-y-5 items-center justify-center">
                    <p className="xs:text-3xl md:text-5xl lg:text-7xl font-bold text-center">
                      Cart is Empty
                    </p>
                    <Button variant="outline" asChild className="mx-auto">
                      <Link to="/shop">Visit Store</Link>
                    </Button>
                  </div>
                )}
                {cartItems.map((item) => (
                  <div className="border-b-black/20 border-b flex  items-center p-5">
                    <div className="mr-auto h-2/5 w-1/12">
                      <img
                        src={item.image}
                        className="object-cover h-full w-full"
                      ></img>
                    </div>
                    <div className="mx-auto flex flex-col gap-y-3">
                      <p className="afacad-flux-500">
                        {item.name} - {item.capacity}
                      </p>
                      <p className="afacad-flux-400 text-sm font-semibold">
                        {formatter.format(item.price)} - {item.quantity} items
                      </p>
                    </div>
                    <X
                      size={20}
                      className="cursor-pointer text-red-400 hover:text-red-500 duration-150 transition-colors ml-auto"
                      onClick={() => dispatch(remove_from_cart(item))}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border py-5 px-4 sf-pro-display-regular flex flex-col items-center h-fit gap-4">
              <h2 className="text-base font-semibold self-start">
                Order Summary
              </h2>
              <div className="flex flex-col w-full">
                <form className="w-full">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-xs text-gray-400 font-light">
                      Enter coupon code
                    </label>
                    <input
                      type="text"
                      className="rounded-lg p-2 border w-full"
                    ></input>
                  </div>
                </form>
              </div>
              <div className="text-left w-full flex justify-between flex-col gap-2">
                <p className="text-gray-500 text-sm">Discount</p>
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-sm">Total: </p>
                  <span className="ml-auto text-sm afacad-flux-500">
                    {formatter.format(calculateTotal())}
                  </span>
                </div>
              </div>
              <Button className="w-full" disabled={cartItems.length == 0}>
                Checkout
              </Button>
            </div>
          </section>
        </PageContainer>
      </main>
      <Footer />
    </>
  );
}

export default Cart;
