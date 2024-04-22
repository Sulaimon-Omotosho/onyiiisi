import { toast } from "sonner";
import { ProductProps } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

type StoreStateProps = {
  productData: ProductProps[];
};

const initialState: StoreStateProps = {
  productData: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const existingProductIndex = state.productData.findIndex(
        (item: ProductProps) => item._id === action.payload._id
      );

      if (existingProductIndex !== -1) {
        state.productData[existingProductIndex].quantity +=
          action.payload.quantity;
      } else {
        state.productData.push(action.payload);
      }
    },
    deleteFromWishlist: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item._id !== action.payload
      );
      toast.success("deleted from wishlist");
    },
    clearWishlist: (state) => {
      state.productData = [];
    },
  },
});

export const { addToWishlist, deleteFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
