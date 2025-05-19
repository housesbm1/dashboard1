import api from './api'

export const getStats = async (range = 'week') => {
  const { data } = await api.get('/dte/stats', { params: { range } })
  return data
}

export const getMunicipioStats = async () => {
  const { data } = await api.get('/dte/municipios')
  return data
}

export const getTimeline = async (groupBy = 'week') => {
  const { data } = await api.get('/dte/timeline', { params: { group_by: groupBy } })
  return data
}

export const getDTEs = async (page = 1, limit = 10, filters = {}) => {
  const response = await api.get('/dte', { 
    params: { page, limit, ...filters }
  })
  return {
    data: response.data,
    total: parseInt(response.headers['x-total-count']) || 0
  }
}