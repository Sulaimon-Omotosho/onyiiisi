// import {
//   PayPalScriptProvider,
//   PayPalButtons,
//   PayPalButtonsComponentProps,
// } from "@paypal/react-paypal-js";

// interface PayPalComponentProps {
//   amount: number;
//   currency: string;
// }

// const PayPalComponent: React.FC<PayPalComponentProps> = ({
//   amount,
//   currency,
// }) => {
//   const clientId = "YOUR_PAYPAL_CLIENT_ID";

//   const createOrder: PayPalButtonsComponentProps["createOrder"] = (
//     data,
//     actions
//   ) => {
//     return actions.order.create({
//       purchase_units: [
//         {
//           amount: {
//             value: amount.toString(),
//             currency_code: currency,
//           },
//         },
//       ],
//       intent: "CAPTURE", // This is required
//     });
//   };

//   const onApprove: PayPalButtonsComponentProps["onApprove"] = (
//     data,
//     actions
//   ) => {
//     return actions.order?.capture().then((details) => {
//       console.log("Payment successful:", details);
//     });
//   };

//   const onError: PayPalButtonsComponentProps["onError"] = (err) => {
//     console.error("Payment error:", err);
//   };

//   return (
//     <PayPalScriptProvider options={{ "client-id": clientId }}>
//       <PayPalButtons
//         createOrder={createOrder}
//         onApprove={onApprove}
//         onError={onError}
//       />
//     </PayPalScriptProvider>
//   );
// };

// export default PayPalComponent;
