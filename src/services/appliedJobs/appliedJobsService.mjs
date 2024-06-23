// import Order from "../../models/Order.js";
// import callKhaltiApi, { verifyPayment } from "../payment/khalti/index.mjs";
// import { getProductsById } from "../product/productService.mjs";
// import { getUserDetails } from "../user/userServices.mjs";



// export const createOrder = async ({
//   user,
//   jobs,
//   paymentType,
//   returnUrl,
//   websiteUrl,
// }) => {
//   let total = 0;
//   total = await calculateTotal(jobs);
//   // const order = await Order.create({
//   //   user,
//   //   jobs,
//   //   total,
//   // });
//   const order = new Order({
//     user,
//     jobs,
//     total,
//   });

//   if (!order) {
//     throw new Error("Order creation failed");
//   }
//   const userDetails = await getUserDetails(user);
//   order.save();
//   return order;
// };

// export const confirmOrderPayment = async (pidx, orderId) => {
//   // Call the khalti payment gateway api to verify the payment
//   const response = await verifyPayment(pidx);
//   // If the payment is successful, update the order status to 'paid'
//   if (response.status === "Completed") {
//     console.log("Order confirmed");
//     return await updateOrderStatus(orderId, "confirmed", "success");
//   }
//   return response;
// };

// export const getAllOrders = async () => {
//   return await Order.find();
// };

// export const getOrderById = async (orderId) => {
//   return await Order.findById(orderId);
// };

// export const getAllOrdersByUser = async (userId) => {
//   return await Order.find({ user: userId });
// };

// export const updateOrderStatus = async (orderId, status, paymentStatus) => {
//   return await Order.findByIdAndUpdate(
//     orderId,
//     { status, paymentStatus },
//     { new: true }
//   );
// };

// export const deleteOrder = async (orderId) => {
//   return await Order.findByIdAndDelete(orderId);
// };

// export const deleteAllOrders = async () => {
//   return await Order.deleteMany();
// };

// // deleteAllOrders().then(() => {
// //   console.log('All orders deleted');
// // });