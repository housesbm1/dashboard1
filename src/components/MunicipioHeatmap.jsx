import { MapContainer, TileLayer, GeoJSON, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import api from '../services/api'
import municipiosData from '../../public/assets/municipios.geojson'

export default function MunicipioHeatmap() {
  const [municipioStats, setMunicipioStats] = useState({})
  const [maxCount, setMaxCount] = useState(1)

  useEffect(() => {
    const fetchMunicipioData = async () => {
      try {
        const { data } = await api.get('/dte/municipios')
        const counts = {}
        let max = 1
        
        data.forEach(item => {
          counts[item.codigo_distrito] = item.count
          if (item.count > max) max = item.count
        })
        
        setMunicipioStats(counts)
        setMaxCount(max)
      } catch (error) {
        console.error('Error fetching municipio data:', error)
      }
    }

    fetchMunicipioData()
  }, [])

  const getColor = (count) => {
    if (!count) return '#CBD5E0'
    const ratio = count / maxCount
    return ratio > 0.75 ? '#2563EB' : 
           ratio > 0.5 ? '#3B82F6' : 
           ratio > 0.25 ? '#93C5FD' : '#BFDBFE'
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow h-[500px]">
      <h2 className="text-xl font-semibold mb-4">DTEs por Municipio</h2>
      <MapContainer 
        center={[13.7942, -88.8965]} 
        zoom={7} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {municipiosData.features.map((feature) => {
          const codigo = feature.properties.CODIGO
          const count = municipioStats[codigo] || 0
          const municipio = feature.properties.MUNICIPIO
          
          return (
            <GeoJSON
              key={codigo}
              data={feature.geometry}
              style={{
                fillColor: getColor(count),
                weight: 1,
                opacity: 1,
                color: 'white',
                fillOpacity: 0.7
              }}
            >
              <Tooltip direction="top">
                <div className="font-bold">{municipio}</div>
                <div>DTEs: {count}</div>
              </Tooltip>
            </GeoJSON>
          )
        })}
      </MapContainer>
    </div>
  )
}