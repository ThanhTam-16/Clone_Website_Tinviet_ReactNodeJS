import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dayjs from 'dayjs';
import * as authModel from './auth.model.js';
import * as tokenModel from './token.model.js';

const hashToken = (token) =>
  crypto.createHash('sha256').update(token).digest('hex');

const createAccessToken = (payload) =>
  jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES
  });

const createRefreshToken = (payload) =>
  jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES
  });

const refreshExpiresAt = () => {
  // parse "7d" kiểu đơn giản
  const exp = process.env.JWT_REFRESH_EXPIRES || '7d';
  const num = parseInt(exp, 10);
  if (exp.endsWith('d')) return dayjs().add(num, 'day').toDate();
  if (exp.endsWith('h')) return dayjs().add(num, 'hour').toDate();
  return dayjs().add(7, 'day').toDate();
};

export const register = async (data) => {
  const { fullName, email, phone, password } = data;

  // check trùng email
  if (email) {
    const u = await authModel.findUserByEmailOrPhone(email);
    if (u) {
      const e = new Error('Email đã tồn tại');
      e.statusCode = 400;
      throw e;
    }
  }

  // check trùng phone
  if (phone) {
    const u = await authModel.findUserByEmailOrPhone(phone);
    if (u) {
      const e = new Error('Số điện thoại đã tồn tại');
      e.statusCode = 400;
      throw e;
    }
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const userId = await authModel.createUser({
    fullName,
    email: email || null,
    phone: phone || null,
    passwordHash
  });

  return authModel.findUserById(userId);
};

export const login = async ({ identifier, password }) => {
  const user = await authModel.findUserByEmailOrPhone(identifier);
  if (!user) {
    const e = new Error('Sai thông tin đăng nhập');
    e.statusCode = 401;
    throw e;
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    const e = new Error('Sai thông tin đăng nhập');
    e.statusCode = 401;
    throw e;
  }

  const payload = { id: user.id, role: user.role };
  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  await tokenModel.insertRefreshToken({
    userId: user.id,
    tokenHash: hashToken(refreshToken),
    expiresAt: refreshExpiresAt()
  });

  return {
    user: {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      phone: user.phone
    },
    accessToken,
    refreshToken
  };
};

export const refresh = async ({ refreshToken }) => {
  if (!refreshToken) {
    const e = new Error('Thiếu refreshToken');
    e.statusCode = 400;
    throw e;
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch {
    const e = new Error('Refresh token không hợp lệ');
    e.statusCode = 401;
    throw e;
  }

  const tokenHash = hashToken(refreshToken);
  const existed = await tokenModel.findValidRefreshToken({
    userId: decoded.id,
    tokenHash
  });

  if (!existed) {
    const e = new Error('Refresh token đã bị thu hồi hoặc hết hạn');
    e.statusCode = 401;
    throw e;
  }

  // rotate token
  await tokenModel.revokeRefreshToken({ userId: decoded.id, tokenHash });

  const payload = { id: decoded.id, role: decoded.role };
  const newAccessToken = createAccessToken(payload);
  const newRefreshToken = createRefreshToken(payload);

  await tokenModel.insertRefreshToken({
    userId: decoded.id,
    tokenHash: hashToken(newRefreshToken),
    expiresAt: refreshExpiresAt()
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

export const logout = async ({ refreshToken }) => {
  if (!refreshToken) return;

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    await tokenModel.revokeRefreshToken({
      userId: decoded.id,
      tokenHash: hashToken(refreshToken)
    });
  } catch {
    // ignore
  }
};

export const getMe = async (userId) => authModel.findUserById(userId);
