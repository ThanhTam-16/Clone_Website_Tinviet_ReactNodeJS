import * as settingsModel from './settings.model.js';

export const getSettings = async () => {
  const rows = await settingsModel.getAll();
  // map thành object cho FE dễ dùng
  const obj = {};
  rows.forEach(r => { obj[r.key] = r.value; });
  return obj;
};
