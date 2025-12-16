import * as productService from './product.service.js';

export const getProducts = async (req, res, next) => {
  try {
    const data = await productService.getProducts(req.query);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getProductDetail = async (req, res, next) => {
  try {
    const data = await productService.getProductDetailFull(req.params.slug);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const suggest = async (req, res, next) => {
  try {
    const q = req.query.q;
    if (!q) return res.json([]);
    const rows = await productService.suggestProducts(q);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const id = await productService.createProduct(req.body);
    res.json({ message: 'Created', id });
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const affected = await productService.updateProduct(req.params.id, req.body)
    res.json({ message: 'Updated', affected })
  } catch (err) {
    next(err)
  }
}

export const deleteProduct = async (req, res, next) => {
  try {
    const affected = await productService.deleteProduct(req.params.id)
    res.json({ message: 'Archived', affected })
  } catch (err) {
    next(err)
  }
}
