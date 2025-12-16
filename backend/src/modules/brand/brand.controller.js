import * as brandService from './brand.service.js';

export const getBrands = async (req, res, next) => {
  try {
    const rows = await brandService.getBrands();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
