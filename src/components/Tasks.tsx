import { useState } from 'react';
import { useStore } from '../store/useStore';
import type { Task } from '../types';
import { formatDate } from '../lib/utils';
import { CheckSquare, Square, Plus, X, Save } from 'lucide-react';

const PRIORITY_COLORS = {
  alta: 'bg-red-100 text-red-700',
  media: 'bg-yellow-100 text-yellow-700',
  baja: 'bg-green-100 text-green-700',
};

export default function Tasks() {
  const { businesses, addTask, updateTask } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'alta' | 'media' | 'baja'>('all');
  const [form, setForm] = useState({
    businessId: '',
    businessCode: '',
    title: '',
    description: '',
    priority: 'alta' as Task['priority'],
    status: 'pendiente' as Task['status'],
    dueDate: undefined as Date | undefined,
  });

  const allTasks = businesses.flatMap(b => (b.tasks || []).map(t => ({ ...t, businessId: b.id })));
  const filtered = allTasks.filter(t =>
    t.status !== 'completada' && (filter === 'all' || t.priority === filter)
  );
  const completed = allTasks.filter(t => t.status === 'completada');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addTask(form.businessId, {
      businessCode: form.businessCode,
      title: form.title,
      description: form.description,
      priority: form.priority,
      status: form.status,
      dueDate: form.dueDate,
    });
    setForm({ businessId: '', businessCode: '', title: '', description: '', priority: 'alta', status: 'pendiente', dueDate: undefined });
    setShowForm(false);
  }

  function toggleComplete(biz: typeof businesses[0], task: Task) {
    updateTask(biz.id, task.id, {
      status: task.status === 'completada' ? 'pendiente' : 'completada',
    });
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tareas</h1>
          <p className="text-gray-500 text-sm">{filtered.length} pendientes · {completed.length} completadas</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-remax-red text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700"
        >
          <Plus size={16} /> Nueva Tarea
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {(['all', 'alta', 'media', 'baja'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
              filter === f
                ? 'bg-remax-blue text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f === 'all' ? 'Todas' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-semibold">Nueva Tarea</h2>
              <button onClick={() => setShowForm(false)}><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-600">Negocio *</label>
                <select
                  required
                  className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-remax-blue"
                  value={form.businessId}
                  onChange={e => {
                    const biz = businesses.find(b => b.id === e.target.value);
                    setForm({ ...form, businessId: e.target.value, businessCode: biz?.code ?? '' });
                  }}
                >
                  <option value="">Seleccionar negocio...</option>
                  {businesses.map(b => (
                    <option key={b.id} value={b.id}>{b.code} - {b.clientName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">Tarea *</label>
                <input
                  required
                  className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-remax-blue"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">Descripción</label>
                <textarea
                  rows={2}
                  className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-remax-blue resize-none"
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600">Prioridad</label>
                  <select
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-remax-blue"
                    value={form.priority}
                    onChange={e => setForm({ ...form, priority: e.target.value as Task['priority'] })}
                  >
                    <option value="alta">Alta</option>
                    <option value="media">Media</option>
                    <option value="baja">Baja</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Vencimiento</label>
                  <input
                    type="date"
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-remax-blue"
                    onChange={e => setForm({ ...form, dueDate: e.target.value ? new Date(e.target.value) : undefined })}
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm">
                  Cancelar
                </button>
                <button type="submit" className="flex-1 flex items-center justify-center gap-2 bg-remax-red text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700">
                  <Save size={14} /> Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <CheckSquare size={40} className="mx-auto mb-2 opacity-30" />
          <p>No hay tareas pendientes</p>
        </div>
      ) : (
        <div className="space-y-2">
          {(['alta', 'media', 'baja'] as const).map(priority => {
            const byPriority = filtered.filter(t => t.priority === priority);
            if (byPriority.length === 0) return null;
            return (
              <div key={priority}>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-4">
                  Prioridad {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </h3>
                {byPriority.map(task => {
                  const biz = businesses.find(b => b.id === (task as Task & { businessId: string }).businessId);
                  return (
                    <div key={task.id} className="flex items-start gap-3 bg-white rounded-lg border border-gray-100 p-3 hover:shadow-sm transition-shadow">
                      <button
                        onClick={() => biz && toggleComplete(biz, task)}
                        className="mt-0.5 text-gray-400 hover:text-green-500 transition-colors"
                      >
                        <Square size={18} />
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800">{task.title}</p>
                        {task.description && <p className="text-xs text-gray-500 mt-0.5">{task.description}</p>}
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          <span className="text-xs font-bold text-remax-blue">[{task.businessCode}]</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_COLORS[task.priority]}`}>
                            {task.priority}
                          </span>
                          {task.dueDate && (
                            <span className="text-xs text-gray-400">Vence: {formatDate(new Date(task.dueDate))}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
