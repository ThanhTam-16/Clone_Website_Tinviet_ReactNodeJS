import * as cartService from './cart.service.js';

export const createCart = async (req, res, next) => {
  try {
    const cartId = await cartService.createCart();
    res.json({ cartId });
  } catch (err) {
    next(err);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { cartId, productId, quantity } = req.body;
    await cartService.addToCart(cartId, productId, quantity || 1);
    res.json({ message: 'Added to cart' });
  } catch (err) {
    next(err);
  }
};

export const getCart = async (req, res, next) => {
  try {
    const items = await cartService.getCart(req.params.cartId);
    res.json(items);
  } catch (err) {
    next(err);
  }
};

// user cart
export const getMyCart = async (req, res, next) => {
  try {
    const cart = await cartService.getOrCreateMyCart(req.user.id);
    const items = await cartService.getCart(cart.id);
    res.json({ cartId: cart.id, items });
  } catch (err) {
    next(err);
  }
};

export const addToMyCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const cartId = await cartService.addToMyCart(req.user.id, productId, quantity || 1);
    res.json({ message: 'Added to my cart', cartId });
  } catch (err) {
    next(err);
  }
};
