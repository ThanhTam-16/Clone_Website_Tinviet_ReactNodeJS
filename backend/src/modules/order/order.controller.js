import * as orderService from './order.service.js';

export const checkout = async (req, res, next) => {
  try {
    const result = await orderService.checkout(req.user.id, req.body);
    res.json({ message: 'Checkout thành công', ...result });
  } catch (err) {
    next(err);
  }
};

export const myOrders = async (req, res, next) => {
  try {
    const rows = await orderService.listMyOrders(req.user.id);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

export const myOrderDetail = async (req, res, next) => {
  try {
    const data = await orderService.getMyOrderDetail(req.user.id, req.params.orderId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
