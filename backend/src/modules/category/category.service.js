import * as categoryModel from './category.model.js';

const buildTree = (rows) => {
  const map = new Map();
  rows.forEach(r => map.set(r.id, { ...r, children: [] }));
  const roots = [];

  rows.forEach(r => {
    const node = map.get(r.id);
    if (r.parent_id && map.has(r.parent_id)) {
      map.get(r.parent_id).children.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
};

function slugify(str = '') {
  return String(str)
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

/** CLIENT */
export const getCategoriesTree = async (type = 'product') => {
  const rows = await categoryModel.findAllActiveByType(type);
  return buildTree(rows);
};

export const getCategoryBySlug = (slug, type = 'product') =>
  categoryModel.findBySlug(slug, type);

export const getCategoryDescendantIds = (rootId) =>
  categoryModel.findDescendantIds(rootId);

/** ADMIN */
export const adminListCategories = async (query) => {
  const { q, type = 'product', isActive, page = 1, limit = 50 } = query;
  return await categoryModel.listAdmin({ q, type, isActive, page, limit });
};

export const adminCreateCategory = async (payload) => {
  if (!payload?.name) {
    const e = new Error('Thiếu name');
    e.statusCode = 400;
    throw e;
  }

  const normalized = {
    ...payload,
    type: payload.type || 'product',
    slug: payload.slug || slugify(payload.name),
  };

  return await categoryModel.insert(normalized);
};

export const adminUpdateCategory = async (id, payload) => {
  const existing = await categoryModel.findById(id);
  if (!existing) {
    const e = new Error('Không tìm thấy danh mục');
    e.statusCode = 404;
    throw e;
  }

  const normalized = { ...payload };
  if (normalized.name && !normalized.slug) normalized.slug = slugify(normalized.name);

  return await categoryModel.updateById(id, normalized);
};

export const adminDeleteCategory = async (id) => {
  const existing = await categoryModel.findById(id);
  if (!existing) {
    const e = new Error('Không tìm thấy danh mục');
    e.statusCode = 404;
    throw e;
  }
  return await categoryModel.deactivateById(id);
};
