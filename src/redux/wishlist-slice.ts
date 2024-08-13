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
        (item) => item._id === action.payload._id
      );

      if (existingProductIndex >= 0) {
        toast.error("Product is already in your wishlist");
      } else {
        state.productData.push({ ...action.payload, productQuantity: 1 });
        toast.success("Added to wishlist");
      }
    },
    deleteFromWishlist: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item._id !== action.payload
      );
      toast.success("Deleted from wishlist");
    },
    clearWishlist: (state) => {
      state.productData = [];
      toast.success("Wishlist cleared");
    },
  },
});

export const { addToWishlist, deleteFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
