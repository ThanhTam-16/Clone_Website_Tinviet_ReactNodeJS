import * as categoryService from './category.service.js';

export const getCategoryTree = async (req, res, next) => {
  try {
    const type = req.query.type || 'product';
    const tree = await categoryService.getCategoriesTree(type);
    res.json(tree);
  } catch (err) {
    next(err);
  }
};

export const adminListCategories = async (req, res, next) => {
  try {
    const data = await categoryService.adminListCategories(req.query)
    res.json(data)
  } catch (err) {
    next(err)
  }
}

export const adminCreateCategory = async (req, res, next) => {
  try {
    const id = await categoryService.adminCreateCategory(req.body)
    res.json({ message: 'Created', id })
  } catch (err) {
    next(err)
  }
}

export const adminUpdateCategory = async (req, res, next) => {
  try {
    const affected = await categoryService.adminUpdateCategory(req.params.id, req.body)
    res.json({ message: 'Updated', affected })
  } catch (err) {
    next(err)
  }
}

export const adminDeleteCategory = async (req, res, next) => {
  try {
    const affected = await categoryService.adminDeleteCategory(req.params.id)
    res.json({ message: 'Deactivated', affected })
  } catch (err) {
    next(err)
  }
}