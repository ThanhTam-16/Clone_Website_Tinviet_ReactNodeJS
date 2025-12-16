import * as sliderService from './slider.service.js';

export const getSliders = async (req, res, next) => {
  try {
    const rows = await sliderService.getSliders();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
