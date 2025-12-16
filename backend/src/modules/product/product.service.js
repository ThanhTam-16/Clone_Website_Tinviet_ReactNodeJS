import * as productModel from './product.model.js';
import * as categoryService from '../category/category.service.js';

export const getProducts = async (query) => {
  const {
    q,
    category,      // slug
    categoryId,    
    brandId,
    minPrice,
    maxPrice,
    sort = 'newest',
    page = 1,
    limit = 20
  } = query;

  let categoryIds = null;

  // Ưu tiên categoryId nếu có
  if (categoryId) {
    categoryIds = await categoryService.getCategoryDescendantIds(Number(categoryId));
  } else if (category) {
    const cat = await categoryService.getCategoryBySlug(category, 'product');
    if (!cat) {
      return { items: [], pagination: { page: Number(page), limit: Number(limit), total: 0, totalPages: 0 } };
    }
    categoryIds = await categoryService.getCategoryDescendantIds(cat.id);
  }

  const total = await productModel.countList({
    q,
    categoryIds,
    brandId: brandId ? Number(brandId) : null,
    minPrice: minPrice != null ? Number(minPrice) : null,
    maxPrice: maxPrice != null ? Number(maxPrice) : null
  });

  const items = await productModel.findList({
    q,
    categoryIds,
    brandId: brandId ? Number(brandId) : null,
    minPrice: minPrice != null ? Number(minPrice) : null,
    maxPrice: maxPrice != null ? Number(maxPrice) : null,
    sort,
    page: Number(page),
    limit: Number(limit)
  });

  const totalPages = Math.ceil(total / Number(limit)) || 0;

  return {
    items,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages
    }
  };
};

export const getProductBySlug = async (slug) => {
  const product = await productModel.findBySlug(slug);
  if (!product) {
    const e = new Error('Không tìm thấy sản phẩm');
    e.statusCode = 404;
    throw e;
  }
  return product;
};

export const getProductDetailFull = async (slug) => {
  const product = await productModel.findBySlug(slug);
  if (!product) {
    const e = new Error('Không tìm thấy sản phẩm');
    e.statusCode = 404;
    throw e;
  }

  const [images, attributes, related] = await Promise.all([
    productModel.findImagesByProductId(product.id),
    productModel.findAttributesByProductId(product.id),
    productModel.findRelatedProducts(product.category_id, product.id)
  ]);

  return {
    product,
    images,
    attributes,
    related
  };
};

export const suggestProducts = (q) =>
  productModel.suggestSearch(q);

function slugify(str = '') {
  return String(str)
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export const createProduct = async (payload) => {
  if (!payload?.name) {
    const e = new Error('Thiếu tên sản phẩm')
    e.statusCode = 400
    throw e
  }
  if (!payload?.category_id && !payload?.categoryId) {
    const e = new Error('Thiếu category_id')
    e.statusCode = 400
    throw e
  }

  const normalized = {
    ...payload,
    category_id: payload.category_id ?? payload.categoryId,
    slug: payload.slug || slugify(payload.name),
  }

  return await productModel.insertProduct(normalized)
}

export const updateProduct = async (id, payload) => {
  const existing = await productModel.findById(id)
  if (!existing) {
    const e = new Error('Không tìm thấy sản phẩm')
    e.statusCode = 404
    throw e
  }

  const normalized = { ...payload }
  if (normalized.name && !normalized.slug) normalized.slug = slugify(normalized.name)

  const affected = await productModel.updateById(id, normalized)
  return affected
}

export const deleteProduct = async (id) => {
  const existing = await productModel.findById(id)
  if (!existing) {
    const e = new Error('Không tìm thấy sản phẩm')
    e.statusCode = 404
    throw e
  }
  const affected = await productModel.archiveById(id)
  return affected
}
