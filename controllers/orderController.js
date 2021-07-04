const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');

const asyncHandler = require('express-async-handler');

//@route    POST /api/v1/orders
//@desc     Create New Order
//@access   Private
const createOrder = asyncHandler(async (req, res) => {
  const orderItemIds = Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });
      newOrderItem = await newOrderItem.save();
      return newOrderItem._id;
    })
  );

  const orderItemsIdsResolved = await orderItemIds;

  const totalPrices = await Promise.all(
    orderItemsIdsResolved.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate(
        'product',
        'price'
      );
      const totalPrice = orderItem.product.price * orderItem.quantity;
      return totalPrice;
    })
  );

  const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

  let order = new Order({
    orderItems: orderItemsIdsResolved,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: totalPrice,
    user: req.body.user,
  });
  order = await order.save();
  res.json({ success: true, order });
});

//@route      GET /api/v1/orders
//@desc       Get all Orders
//@access     Public
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate('user', 'name')
    .sort({ dateOrdered: -1 });

  res.status(200).json({ success: true, count: orders.length, orders });
});

//@route      GET /api/v1/orders/:id
//@desc       Get Single Order
//@access     Public
const getSingleOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name')
    .populate({
      path: 'orderItems',
      populate: {
        path: 'product',
        populate: 'category',
      },
    });

  if (!order) {
    return res.status(400).send('Order not found');
  }

  res.status(200).json({ success: true, count: order });
});

//@route      PUT /api/v1/orders/:id
//@desc       Update Single Order Status
//@access     Private
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    { new: true }
  );

  if (!order) return res.status(400).send('the order cannot be update!');

  res.status(200).json({ success: true, order });
});

const deleteOrder = asyncHandler((req, res) => {
  Order.findByIdAndRemove(req.params.id)
    .then(async (order) => {
      if (order) {
        await order.orderItems.map(async (orderItem) => {
          await OrderItem.findByIdAndRemove(orderItem);
        });
        return res
          .status(200)
          .json({ success: true, message: 'the order is deleted!' });
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'order not found!' });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
  deleteOrder,
};
