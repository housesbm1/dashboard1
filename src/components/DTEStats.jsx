import { useEffect, useState } from 'react'
import api from '../services/api'

export default function DTEStats() {
  const [stats, setStats] = useState({
    pendientes: 0,
    firmadas: 0,
    anuladas: 0,
    total: 0
  })

  const [timeRange, setTimeRange] = useState('week')

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/dte/stats', {
          params: { range: timeRange }
        })
        setStats(data)
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 30000)
    
    return () => clearInterval(interval)
  }, [timeRange])

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-500">Pendientes</h3>
        <p className="text-2xl font-bold text-yellow-600">{stats.pendientes}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-500">Firmadas</h3>
        <p className="text-2xl font-bold text-green-600">{stats.firmadas}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-500">Anuladas</h3>
        <p className="text-2xl font-bold text-red-600">{stats.anuladas}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-500">Total</h3>
        <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
        <select 
          className="mt-2 text-sm border rounded p-1"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="week">Esta semana</option>
          <option value="month">Este mes</option>
          <option value="year">Este año</option>
        </select>
      </div>
    </div>
  )
}