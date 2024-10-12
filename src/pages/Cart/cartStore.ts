import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";

const cart = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default cart;
export type RootState = ReturnType<typeof cart.getState>;
