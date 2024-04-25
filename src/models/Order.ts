import mongoose, { Schema, Document } from "mongoose";

// Define the OrderItem interface and schema
interface OrderItem {
  quantity: number;
  price: number;
  title: string;
  brand?: string;
  gram?: string;
  product_data?: {
    name: string;
    description: string;
  };
}

const OrderItemSchema = new Schema<OrderItem>({
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
  },
  gram: {
    type: String,
  },
  product_data: {
    name: String,
    description: String,
  },
});

// Define the Order interface and schema
export interface OrderDoc extends Document {
  items: OrderItem[];
  total: number;
  email: string;
  paymentMethod: string;
  status: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    deliveryNotes?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<OrderDoc>(
  {
    items: [OrderItemSchema],
    total: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    shippingAddress: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      deliveryNotes: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

// Create and export the Order model
const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
