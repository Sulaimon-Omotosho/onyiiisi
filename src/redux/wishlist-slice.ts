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
      const existingProduct = state?.productData.find(
        (item: ProductProps) => item?._id === action?.payload?._id
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.productData.push(action.payload);
      }
    },
    deleteFromWishlist: (state, action) => {
      return {
        ...state,
        productData: state.productData.filter(
          (item) => item._id == action.payload
        ),
      };
    },
    clearWishlist: (state) => {
      state.productData = [];
    },
  },
});

export const { addToWishlist, deleteFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
