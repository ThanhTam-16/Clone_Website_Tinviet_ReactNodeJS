import * as cartModel from './cart.model.js';

export const createCart = () => cartModel.createCart();

export const addToCart = (cartId, productId, qty) =>
  cartModel.addItem(cartId, productId, qty);

export const getCart = (cartId) => cartModel.getCartItems(cartId);

// user cart
export const getOrCreateMyCart = async (userId) => {
  const cart = await cartModel.findActiveCartByUser(userId);
  if (cart) return cart;
  const cartId = await cartModel.createCartForUser(userId);
  return { id: cartId };
};

export const addToMyCart = async (userId, productId, qty) => {
  const cart = await getOrCreateMyCart(userId);
  await cartModel.addItem(cart.id, productId, qty);
  return cart.id;
};
