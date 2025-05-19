import { useState, useEffect } from 'react'
import api from '../services/api'

export default function DTETable() {
  const [dtes, setDtes] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0
  })
  const [filters, setFilters] = useState({
    estado: '',
    desde: '',
    hasta: ''
  })

  useEffect(() => {
    const fetchDTEs = async () => {
      try {
        setLoading(true)
        const { data, headers } = await api.get('/dte', {
          params: {
            page: pagination.page,
            limit: pagination.limit,
            ...filters
          }
        })
        
        setDtes(data)
        setPagination(prev => ({
          ...prev,
          total: parseInt(headers['x-total-count']) || 0
        }))
      } catch (error) {
        console.error('Error fetching DTEs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDTEs()
  }, [pagination.page, pagination.limit, filters])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow overflow-hidden">
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          name="estado"
          value={filters.estado}
          onChange={handleFilterChange}
          className="border rounded p-2 text-sm"
        >
          <option value="">Todos los estados</option>
          <option value="Pendiente">Pendientes</option>
          <option value="Firmada">Firmadas</option>
          <option value="Anulada">Anuladas</option>
        </select>
        
        <input
          type="date"
          name="desde"
          value={filters.desde}
          onChange={handleFilterChange}
          className="border rounded p-2 text-sm"
          placeholder="Desde"
        />
        
        <input
          type="date"
          name="hasta"
          value={filters.hasta}
          onChange={handleFilterChange}
          className="border rounded p-2 text-sm"
          placeholder="Hasta"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Control</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Municipio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dtes.map((dte) => (
                <tr key={dte.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dte.numero_control}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dte.cliente_nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dte.municipio}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(dte.fecha_emision).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${dte.total_pagar.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      dte.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                      dte.estado === 'Firmada' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {dte.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <div>
          <span className="text-sm text-gray-700">
            Mostrando <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> a{' '}
            <span className="font-medium">
              {Math.min(pagination.page * pagination.limit, pagination.total)}
            </span>{' '}
            de <span className="font-medium">{pagination.total}</span> resultados
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
            disabled={pagination.page === 1}
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
            disabled={pagination.page * pagination.limit >= pagination.total}
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  )
}