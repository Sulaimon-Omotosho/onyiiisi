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
      return {
        ...state,
        productData: [...state.productData, action.payload],
      };
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
