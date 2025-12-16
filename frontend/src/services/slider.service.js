import { api } from './api'

export const sliderService = {
  getAll: async () => {
    const res = await api.get('/sliders')
    return res.data
  },
}
