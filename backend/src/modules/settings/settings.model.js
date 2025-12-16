import { pool } from '../../config/db.js';

export const getAll = async () => {
  const [rows] = await pool.query(`SELECT \`key\`, \`value\` FROM settings`);
  return rows;
};
