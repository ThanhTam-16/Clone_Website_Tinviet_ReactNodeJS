import { pool } from '../../config/db.js';

export const createOrder = async (conn, orderData) => {
  const [result] = await conn.query(
    `INSERT INTO orders
     (order_code, user_id, customer_name, customer_phone, customer_email,
      shipping_address_line, shipping_ward, shipping_district, shipping_province, shipping_country,
      note, subtotal, discount_total, shipping_fee, total, payment_status, fulfillment_status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'unpaid', 'unfulfilled')`,
    [
      orderData.orderCode,
      orderData.userId,
      orderData.customerName,
      orderData.customerPhone,
      orderData.customerEmail,
      orderData.addressLine,
      orderData.ward,
      orderData.district,
      orderData.province,
      orderData.country || 'VN',
      orderData.note || null,
      orderData.subtotal,
      0,
      orderData.shippingFee || 0,
      orderData.total
    ]
  );
  return result.insertId;
};

export const insertOrderItems = async (conn, orderId, items) => {
  const values = items.map(it => ([
    orderId,
    it.product_id,
    it.name,
    it.sku || null,
    it.price,
    it.quantity,
    it.price * it.quantity
  ]));

  await conn.query(
    `INSERT INTO order_items
     (order_id, product_id, product_name_snapshot, sku_snapshot, unit_price, quantity, line_total)
     VALUES ?`,
    [values]
  );
};

export const listMyOrders = async (userId) => {
  const [rows] = await pool.query(
    `SELECT id, order_code, total, payment_status, fulfillment_status, created_at
     FROM orders
     WHERE user_id = ?
     ORDER BY id DESC`,
    [userId]
  );
  return rows;
};

export const getMyOrderDetail = async (userId, orderId) => {
  const [orders] = await pool.query(
    `SELECT *
     FROM orders
     WHERE id = ? AND user_id = ?
     LIMIT 1`,
    [orderId, userId]
  );

  const order = orders[0];
  if (!order) return null;

  const [items] = await pool.query(
    `SELECT *
     FROM order_items
     WHERE order_id = ?`,
    [orderId]
  );

  return { order, items };
};
