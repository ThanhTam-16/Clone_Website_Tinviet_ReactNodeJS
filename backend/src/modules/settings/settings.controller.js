import * as settingsService from './settings.service.js';

export const getSettings = async (req, res, next) => {
  try {
    const data = await settingsService.getSettings();
    res.json(data);
  } catch (err) {
    next(err);
  }
};
