import { pool } from '../../config/db.js';

export const insertRefreshToken = async ({ userId, tokenHash, expiresAt }) => {
  await pool.query(
    `INSERT INTO user_tokens (user_id, token_hash, token_type, expires_at)
     VALUES (?, ?, 'refresh', ?)`,
    [userId, tokenHash, expiresAt]
  );
};

export const findValidRefreshToken = async ({ userId, tokenHash }) => {
  const [rows] = await pool.query(
    `SELECT *
     FROM user_tokens
     WHERE user_id = ?
       AND token_hash = ?
       AND token_type = 'refresh'
       AND revoked_at IS NULL
       AND expires_at > NOW()
     LIMIT 1`,
    [userId, tokenHash]
  );
  return rows[0];
};

export const revokeRefreshToken = async ({ userId, tokenHash }) => {
  await pool.query(
    `UPDATE user_tokens
     SET revoked_at = NOW()
     WHERE user_id = ? AND token_hash = ? AND revoked_at IS NULL`,
    [userId, tokenHash]
  );
};
