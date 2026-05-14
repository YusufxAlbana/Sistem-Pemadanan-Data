import React from 'react';
import { 
  PieChart, Pie, Cell, Legend, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { Users, FileMinus, CheckCircle } from 'lucide-react';

const COLORS = ['#10B981', '#EF4444', '#F59E0B', '#3B82F6', '#6366F1'];

const DashboardStats = ({ stats, eliminationDetails, processingMode }) => {
  const { totalInitial, totalEliminated, totalValid } = stats;
  const isIntegration = processingMode === 'integration';

  const pieData = [
    { name: isIntegration ? 'Belum Terintegrasi' : 'Data Valid', value: totalValid },
    { name: isIntegration ? 'Sudah Terintegrasi' : 'Data Tereliminasi', value: totalEliminated },
  ];

  const barData = eliminationDetails.map(detail => ({
    name: detail.fileName.length > 15 ? detail.fileName.substring(0, 15) + '...' : detail.fileName,
    full_name: detail.fileName,
    [isIntegration ? 'Jumlah Terintegrasi' : 'Jumlah Tereliminasi']: detail.eliminated
  }));

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Stat Cards */}
      <div className="grid-3">
        <div className="stat-card">
          <div className="stat-icon"><Users size={24} /></div>
          <div className="stat-content">
            <h4>Total Data Awal</h4>
            <div className="stat-value">{totalInitial}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon danger" style={isIntegration ? { color: '#0EA5E9', backgroundColor: '#E0F2FE' } : {}}>
            <FileMinus size={24} color={isIntegration ? '#0EA5E9' : undefined} />
          </div>
          <div className="stat-content">
            <h4>{isIntegration ? 'Total Terintegrasi' : 'Total Tereliminasi'}</h4>
            <div className="stat-value" style={{ color: isIntegration ? '#0EA5E9' : 'var(--danger)' }}>
              {totalEliminated}
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success"><CheckCircle size={24} /></div>
          <div className="stat-content">
            <h4>{isIntegration ? 'Belum Terintegrasi' : 'Total Data Valid'}</h4>
            <div className="stat-value" style={{ color: 'var(--success)' }}>{totalValid}</div>
          </div>
        </div>
      </div>

      {/* Charts */}
      {totalInitial > 0 && (
        <div className="grid-2">
          <div className="card">
            <h3 className="card-title">Persentase Validasi</h3>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card">
            <h3 className="card-title">{isIntegration ? 'Integrasi per File Acuan' : 'Eliminasi per File Pembanding'}</h3>
            <div style={{ height: 300 }}>
              {barData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" fontSize={12} />
                    <YAxis allowDecimals={false} />
                    <Bar dataKey={isIntegration ? "Jumlah Terintegrasi" : "Jumlah Tereliminasi"} fill={isIntegration ? "#0EA5E9" : "#EF4444"} radius={[4, 4, 0, 0]}>
                      {barData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[(index + 1) % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
                  Belum ada data pembanding
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardStats;
