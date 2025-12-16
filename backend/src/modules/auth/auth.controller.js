import * as authService from './auth.service.js';

export const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    res.json({ message: 'Đăng ký thành công', user });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const data = await authService.refresh(req.body);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    await authService.logout(req.body);
    res.json({ message: 'Logged out' });
  } catch (err) {
    next(err);
  }
};

export const me = async (req, res, next) => {
  try {
    const user = await authService.getMe(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};
