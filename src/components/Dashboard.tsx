import { useStore } from '../store/useStore';
import { getPipelineLabel, getPipelineColor } from '../lib/utils';
import { Users, Briefcase, Calendar, CheckSquare, TrendingUp, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const { clients, businesses, events } = useStore();

  const activeBusinesses = businesses.filter(b => !['cerrado', 'caido', 'pausado'].includes(b.stage));
  const closedBusinesses = businesses.filter(b => b.stage === 'cerrado');
  const pendingTasks = businesses.flatMap(b => b.tasks || []).filter(t => t.status !== 'completada');
  const upcomingEvents = events
    .filter(e => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const riskBusinesses = businesses.filter(b => {
    const daysSinceUpdate = (Date.now() - new Date(b.updatedAt).getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceUpdate > 7 && !['cerrado', 'caido', 'pausado'].includes(b.stage);
  });

  const stats = [
    { label: 'Clientes', value: clients.length, icon: Users, color: 'bg-blue-500' },
    { label: 'Negocios Activos', value: activeBusinesses.length, icon: Briefcase, color: 'bg-remax-red' },
    { label: 'Cerrados', value: closedBusinesses.length, icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Tareas Pendientes', value: pendingTasks.length, icon: CheckSquare, color: 'bg-orange-500' },
    { label: 'Próximos Eventos', value: upcomingEvents.length, icon: Calendar, color: 'bg-purple-500' },
    { label: 'Con Riesgo', value: riskBusinesses.length, icon: AlertCircle, color: 'bg-yellow-500' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Resumen operativo de tu gestión inmobiliaria</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 border border-gray-100">
            <div className={`${color} p-3 rounded-lg`}>
              <Icon size={20} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h2 className="font-semibold text-gray-700 mb-3">Negocios Recientes</h2>
          {businesses.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-6">No hay negocios registrados aún</p>
          ) : (
            <div className="space-y-2">
              {businesses.slice(-5).reverse().map(b => (
                <div key={b.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                  <div>
                    <p className="font-medium text-sm text-gray-800">{b.code}</p>
                    <p className="text-xs text-gray-500">{b.clientName} · {b.property.commune}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPipelineColor(b.stage)}`}>
                    {getPipelineLabel(b.stage)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h2 className="font-semibold text-gray-700 mb-3">Próximos Eventos</h2>
          {upcomingEvents.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-6">No hay eventos próximos</p>
          ) : (
            <div className="space-y-2">
              {upcomingEvents.map(e => (
                <div key={e.id} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                  <div className="bg-remax-blue text-white text-xs rounded-lg p-2 text-center min-w-[40px]">
                    <p className="font-bold">{new Date(e.date).getDate()}</p>
                    <p className="uppercase text-[10px]">{new Date(e.date).toLocaleString('es', { month: 'short' })}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{e.title}</p>
                    <p className="text-xs text-gray-500">[{e.businessCode}]</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {riskBusinesses.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-yellow-200 p-4">
            <h2 className="font-semibold text-yellow-700 mb-3 flex items-center gap-2">
              <AlertCircle size={16} /> Negocios Sin Actividad (+7 días)
            </h2>
            <div className="space-y-2">
              {riskBusinesses.map(b => (
                <div key={b.id} className="flex items-center justify-between p-2 rounded-lg bg-yellow-50">
                  <div>
                    <p className="font-medium text-sm text-gray-800">{b.code}</p>
                    <p className="text-xs text-gray-500">{b.clientName}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPipelineColor(b.stage)}`}>
                    {getPipelineLabel(b.stage)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h2 className="font-semibold text-gray-700 mb-3">Tareas Urgentes</h2>
          {pendingTasks.filter(t => t.priority === 'alta').length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-6">No hay tareas urgentes</p>
          ) : (
            <div className="space-y-2">
              {pendingTasks.filter(t => t.priority === 'alta').slice(0, 5).map(t => (
                <div key={t.id} className="flex items-center gap-2 p-2 rounded-lg bg-red-50">
                  <CheckSquare size={14} className="text-red-500 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{t.title}</p>
                    <p className="text-xs text-gray-500">[{t.businessCode}]</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
