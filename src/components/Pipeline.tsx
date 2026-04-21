import { useState } from 'react';
import { useStore } from '../store/useStore';
import { PIPELINE_STAGES, CLIENT_TYPE_LABELS } from '../lib/utils';
import type { PipelineStage, OperationType } from '../types';
import { Plus, X, Save } from 'lucide-react';

const emptyBiz = {
  code: '',
  clientId: '',
  clientName: '',
  operationType: 'venta' as OperationType,
  property: { id: '', address: '', commune: '', region: '', type: 'departamento' },
  stage: 'lead_nuevo' as PipelineStage,
  notes: '',
  documents: [],
  tasks: [],
  budget: undefined as number | undefined,
  paymentMethod: '',
  urgency: 'media' as 'alta' | 'media' | 'baja',
};

export default function Pipeline() {
  const { businesses, clients, addBusiness, updateBusiness } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ...emptyBiz });

  const visibleStages = PIPELINE_STAGES.filter(s => !['pausado', 'caido', 'cerrado'].includes(s.key));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addBusiness(form);
    setForm({ ...emptyBiz });
    setShowForm(false);
  }

  function handleStageChange(bizId: string, newStage: PipelineStage) {
    updateBusiness(bizId, { stage: newStage });
  }

  const getBizForStage = (stage: PipelineStage) => businesses.filter(b => b.stage === stage);

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pipeline</h1>
          <p className="text-gray-500 text-sm">{businesses.length} negocios en total</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-remax-red text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700"
        >
          <Plus size={16} /> Nuevo Negocio
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
              <h2 className="font-semibold">Nuevo Negocio</h2>
              <button onClick={() => setShowForm(false)}><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600">Código REMAX *</label>
                  <input
                    required
                    placeholder="ej: 1028117014-10"
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-remax-blue"
                    value={form.code}
                    onChange={e => setForm({ ...form, code: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Tipo de Operación *</label>
                  <select
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-remax-blue"
                    value={form.operationType}
                    onChange={e => setForm({ ...form, operationType: e.target.value as OperationType })}
                  >
                    <option value="venta">Venta</option>
                    <option value="arriendo">Arriendo</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">Cliente *</label>
                {clients.length > 0 ? (
                  <select
                    required
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-remax-blue"
                    value={form.clientId}
                    onChange={e => {
                      const c = clients.find(c => c.id === e.target.value);
                      setForm({ ...form, clientId: e.target.value, clientName: c?.name ?? '' });
                    }}
                  >
                    <option value="">Seleccionar cliente...</option>
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>{c.name} - {CLIENT_TYPE_LABELS[c.clientType]}</option>
                    ))}
                  </select>
                ) : (
                  <div className="mt-1">
                    <input
                      required
                      placeholder="Nombre del cliente"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-remax-blue"
                      value={form.clientName}
                      onChange={e => setForm({ ...form, clientName: e.target.value })}
                    />
                    <p className="text-xs text-gray-400 mt-1">No hay clientes. Registra primero en la sección Clientes.</p>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600">Dirección</label>
                  <input
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-remax-blue"
                    value={form.property.address}
                    onChange={e => setForm({ ...form, property: { ...form.property, address: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Comuna</label>
                  <input
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-remax-blue"
                    value={form.property.commune}
                    onChange={e => setForm({ ...form, property: { ...form.property, commune: e.target.value } })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600">Tipo Propiedad</label>
                  <select
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-remax-blue"
                    value={form.property.type}
                    onChange={e => setForm({ ...form, property: { ...form.property, type: e.target.value } })}
                  >
                    {['Departamento', 'Casa', 'Oficina', 'Local', 'Terreno', 'Otro'].map(t => (
                      <option key={t} value={t.toLowerCase()}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Etapa Inicial</label>
                  <select
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-remax-blue"
                    value={form.stage}
                    onChange={e => setForm({ ...form, stage: e.target.value as PipelineStage })}
                  >
                    {PIPELINE_STAGES.map(s => (
                      <option key={s.key} value={s.key}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">Presupuesto</label>
                <input
                  type="number"
                  className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-remax-blue"
                  value={form.budget ?? ''}
                  onChange={e => setForm({ ...form, budget: e.target.value ? Number(e.target.value) : undefined })}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">Notas</label>
                <textarea
                  rows={3}
                  className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-remax-blue resize-none"
                  value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
                  Cancelar
                </button>
                <button type="submit" className="flex-1 flex items-center justify-center gap-2 bg-remax-red text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700">
                  <Save size={14} /> Crear Negocio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {visibleStages.map(({ key, label, color }) => {
            const stageBizs = getBizForStage(key);
            return (
              <div key={key} className="w-64 bg-gray-100 rounded-xl p-3 flex-shrink-0">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${color}`}>{label}</span>
                  <span className="text-xs text-gray-400 bg-white px-1.5 py-0.5 rounded-full">{stageBizs.length}</span>
                </div>
                <div className="space-y-2">
                  {stageBizs.map(b => (
                    <div key={b.id} className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-default">
                      <p className="font-semibold text-xs text-remax-blue">{b.code}</p>
                      <p className="text-sm font-medium text-gray-800 mt-1">{b.clientName}</p>
                      <p className="text-xs text-gray-500">{b.property.commune} · {b.property.type}</p>
                      <p className="text-xs text-gray-400 mt-1 capitalize">{b.operationType}</p>
                      <div className="mt-2">
                        <select
                          className="w-full text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none"
                          value={b.stage}
                          onChange={e => handleStageChange(b.id, e.target.value as PipelineStage)}
                        >
                          {PIPELINE_STAGES.map(s => (
                            <option key={s.key} value={s.key}>{s.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
