import { toast } from "sonner";
import { ProductProps } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";
type StoreStateProps = {
  productData: ProductProps[];
};

const initialState: StoreStateProps = {
  productData: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state?.productData.find(
        (item: ProductProps) => item?._id === action?.payload?._id
      );
      if (existingProduct) {
        existingProduct.productQuantity += action.payload.productQuantity;
      } else {
        state.productData.push(action.payload);
      }
    },
    addToCartFromWishlist: (state, action) => {
      state.productData.push(action.payload);
      toast.success("Product added to cart from wishlist");
    },
    increaseQuantity: (state, action) => {
      const productIndex = state.productData.findIndex(
        (item) => item._id === action.payload._id
      );
      if (productIndex !== -1) {
        return {
          ...state,
          productData: [
            ...state.productData.slice(0, productIndex),
            {
              ...state.productData[productIndex],
              productQuantity:
                state.productData[productIndex].productQuantity + 1,
            },
            ...state.productData.slice(productIndex + 1),
          ],
        };
      }
      return state;
    },
    decreaseQuantity: (state, action) => {
      const productIndex = state.productData.findIndex(
        (item) => item._id === action.payload._id
      );
      if (productIndex !== -1) {
        if (state.productData[productIndex].productQuantity === 1) {
          return state;
        }
        return {
          ...state,
          productData: [
            ...state.productData.slice(0, productIndex),
            {
              ...state.productData[productIndex],
              productQuantity:
                state.productData[productIndex].productQuantity - 1,
            },
            ...state.productData.slice(productIndex + 1),
          ],
        };
      }
      return state; // No change if product not found
    },
    deleteProduct: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.productData = [];
    },
  },
});

export const {
  addToCart,
  addToCartFromWishlist,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
