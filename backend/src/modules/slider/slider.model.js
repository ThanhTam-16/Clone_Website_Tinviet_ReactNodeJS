import { pool } from '../../config/db.js';

export const findAllActive = async () => {
  const [rows] = await pool.query(
    `SELECT id, title, image_url, link_url, sort_order
     FROM sliders
     WHERE is_active = 1
     ORDER BY sort_order ASC, id ASC`
  );
  return rows;
};
