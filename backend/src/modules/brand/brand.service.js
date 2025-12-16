import * as brandModel from './brand.model.js';

export const getBrands = () => brandModel.findAllActive();
export const getBrandBySlug = (slug) => brandModel.findBySlug(slug);
