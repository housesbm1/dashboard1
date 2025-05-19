import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useEffect, useState } from 'react'
import api from '../services/api'

export default function DTETimeline() {
  const [timelineData, setTimelineData] = useState([])
  const [groupBy, setGroupBy] = useState('week')

  useEffect(() => {
    const fetchTimelineData = async () => {
      try {
        const { data } = await api.get('/dte/timeline', {
          params: { group_by: groupBy }
        })
        setTimelineData(data)
      } catch (error) {
        console.error('Error fetching timeline data:', error)
      }
    }

    fetchTimelineData()
  }, [groupBy])

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Evolución Temporal</h2>
        <select 
          className="border rounded p-1 text-sm"
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value)}
        >
          <option value="day">Por día</option>
          <option value="week">Por semana</option>
          <option value="month">Por mes</option>
        </select>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="pendientes" stackId="a" fill="#F59E0B" name="Pendientes" />
            <Bar dataKey="firmadas" stackId="a" fill="#10B981" name="Firmadas" />
            <Bar dataKey="anuladas" stackId="a" fill="#EF4444" name="Anuladas" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}