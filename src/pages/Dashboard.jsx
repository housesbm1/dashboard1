import DTEStats from '../components/DTEStats'
import MunicipioHeatmap from '../components/MunicipioHeatmap'
import DTETimeline from '../components/DTETimeline'
import DTETable from '../components/DTETable'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Dashboard de DTEs</h1>
        
        <DTEStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <MunicipioHeatmap />
          <DTETimeline />
        </div>
        
        <DTETable />
      </div>
    </div>
  )
}