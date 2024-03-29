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
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.productData.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item) => item?._id === action.payload?._id
      );
      existingProduct && existingProduct.quantity++;
    },
    decreaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item: ProductProps) => item._id === action.payload._id
      );
      if (existingProduct?.quantity === 1) {
        existingProduct.quantity === 1;
        toast.error("Product cannot be less than one ");
      } else {
        existingProduct && existingProduct.quantity--;
        toast.success("Product reduced successfully");
      }
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
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
