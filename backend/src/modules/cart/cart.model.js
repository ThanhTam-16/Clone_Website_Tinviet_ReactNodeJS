import { pool } from '../../config/db.js';

export const createCart = async () => {
  const [result] = await pool.query(
    `INSERT INTO carts (status) VALUES ('active')`
  );
  return result.insertId;
};

export const createCartForUser = async (userId) => {
  const [result] = await pool.query(
    `INSERT INTO carts (user_id, status) VALUES (?, 'active')`,
    [userId]
  );
  return result.insertId;
};

export const findActiveCartByUser = async (userId) => {
  const [rows] = await pool.query(
    `SELECT * FROM carts WHERE user_id = ? AND status = 'active' ORDER BY id DESC LIMIT 1`,
    [userId]
  );
  return rows[0];
};

export const addItem = async (cartId, productId, qty) => {
  await pool.query(
    `INSERT INTO cart_items (cart_id, product_id, quantity)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE quantity = quantity + ?`,
    [cartId, productId, qty, qty]
  );
};

export const getCartItems = async (cartId) => {
  const [rows] = await pool.query(
    `SELECT ci.id, ci.cart_id, ci.product_id, ci.quantity,
            p.name, p.slug, p.price, p.compare_at_price, p.featured_image_url
     FROM cart_items ci
     JOIN products p ON p.id = ci.product_id
     WHERE ci.cart_id = ?`,
    [cartId]
  );
  return rows;
};

export const markCartConverted = async (cartId) => {
  await pool.query(`UPDATE carts SET status='converted' WHERE id=?`, [cartId]);
};
