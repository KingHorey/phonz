import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//  schema checks
import { z } from "zod";
import { cartState, cartItemPayload } from "@/utils/types";

const initialState: z.infer<typeof cartState> = {
  item: [],
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add_to_cart: (
      state,
      action: PayloadAction<z.infer<typeof cartItemPayload>>
    ) => {
      const item = action.payload;
      const index = state.item.findIndex(
        (i) => i.name === item.name && i.capacity === item.capacity
      );
      if (index >= 0) {
        state.item[index].quantity += item.quantity;
        state.item[index].price = item.price * item.quantity;
      } else {
        state.item.push(item);
      }
    },
    remove_from_cart: (
      state,
      action: PayloadAction<z.infer<typeof cartItemPayload>>
    ) => {
      const item = action.payload;
      const index = state.item.findIndex(
        (i) => i.name === item.name && i.capacity === item.capacity
      );
      if (index >= 0) {
        state.item.splice(index, 1);
      }
    },
    empty_cart: (state) => {
      state.item = [];
    },
  },
});

export const { add_to_cart, remove_from_cart, empty_cart } = slice.actions;
export default slice.reducer;
