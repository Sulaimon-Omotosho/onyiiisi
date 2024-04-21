import mongoose, { Schema, Document } from "mongoose";

export interface OrderItemDoc extends Document {
  productId: mongoose.Schema.Types.ObjectId;
  title: string;
  quantity: number;
  price: number;
}

export interface OrderDoc extends Document {
  items: OrderItemDoc[];
  total: number;
  paymentMethod: string;
  email: string;
  status: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    deliveryNotes: string;
    phoneNumber: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new mongoose.Schema<OrderItemDoc>({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  title: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const OrderSchema = new Schema<OrderDoc>(
  {
    items: [OrderItemSchema],
    total: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, default: "pending" },
    shippingAddress: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      phoneNumber: { type: Number, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      deliveryNotes: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const Order =
  mongoose.models.Order || mongoose.model<OrderDoc>("Order", OrderSchema);

export default Order;
