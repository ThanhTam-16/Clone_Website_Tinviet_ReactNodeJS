import { pool } from '../../config/db.js';
import * as cartModel from '../cart/cart.model.js';
import * as orderModel from './order.model.js';

const genOrderCode = (id) => `TV${String(id).padStart(6, '0')}`;

export const checkout = async (userId, payload) => {
  // lấy cart active của user
  const cart = await cartModel.findActiveCartByUser(userId);
  if (!cart) {
    const e = new Error('Bạn chưa có giỏ hàng');
    e.statusCode = 400;
    throw e;
  }

  const cartItems = await cartModel.getCartItems(cart.id);
  if (!cartItems.length) {
    const e = new Error('Giỏ hàng trống');
    e.statusCode = 400;
    throw e;
  }

  const subtotal = cartItems.reduce((s, it) => s + (Number(it.price) * it.quantity), 0);
  const shippingFee = 0;
  const total = subtotal + shippingFee;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // tạo order tạm để lấy id
    const tmpOrderId = await orderModel.createOrder(conn, {
      orderCode: 'TMP',
      userId,
      customerName: payload.customerName,
      customerPhone: payload.customerPhone,
      customerEmail: payload.customerEmail || null,
      addressLine: payload.addressLine,
      ward: payload.ward || null,
      district: payload.district || null,
      province: payload.province || null,
      country: 'VN',
      note: payload.note || null,
      subtotal,
      shippingFee,
      total
    });

    const orderCode = genOrderCode(tmpOrderId);
    await conn.query(`UPDATE orders SET order_code=? WHERE id=?`, [orderCode, tmpOrderId]);

    // order items snapshot
    const itemsSnapshot = cartItems.map(it => ({
      product_id: it.product_id,
      name: it.name,
      sku: null,
      price: Number(it.price),
      quantity: it.quantity
    }));

    await orderModel.insertOrderItems(conn, tmpOrderId, itemsSnapshot);

    // đánh dấu cart converted
    await cartModel.markCartConverted(cart.id);

    await conn.commit();

    return { orderId: tmpOrderId, orderCode };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

export const listMyOrders = (userId) => orderModel.listMyOrders(userId);

export const getMyOrderDetail = async (userId, orderId) => {
  const data = await orderModel.getMyOrderDetail(userId, orderId);
  if (!data) {
    const e = new Error('Không tìm thấy đơn hàng');
    e.statusCode = 404;
    throw e;
  }
  return data;
};
