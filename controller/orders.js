const Order = require("../model/Order");
const Feedback = require("../model/Feedback");
const asyncHandler = require("../utils/asyncHandler");
const bodyFilter = require("../utils/bodyFilter");
const generateOrderId = require("../utils/generateOrderId");
const AppError = require("../utils/AppError");
const Product = require("../model/Product");

exports.createOrder = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);

  // Handle no product
  if (!product) {
    return next(new AppError("Please select a product.", 400));
  }

  // Build up order id
  const lastestOrder = await Order.findOne({ userId: req.user.id }).sort({
    createdAt: -1,
  });

  // Create order
  const order = await Order.create({
    userId: req.user.id,
    orderId: generateOrderId(lastestOrder, req.user.id),
    productId: product.id,
    sku: product.sku,
    price: product.price,
  });

  res.status(201).json({ status: "success", data: { order } });
});
