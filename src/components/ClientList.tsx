import { useState } from 'react';
import { useStore } from '../store/useStore';
import type { Client, ClientType } from '../types';
import { CLIENT_TYPE_LABELS, formatDate } from '../lib/utils';
import { Plus, Search, Trash2, Edit2, X, Save, User } from 'lucide-react';

const emptyClient: Omit<Client, 'id' | 'createdAt' | 'updatedAt'> = {
  name: '',
  phone: '',
  email: '',
  clientType: 'interesado_comprador',
  notes: '',
};

export default function ClientList() {
  const { clients, businesses, addClient, updateClient, deleteClient } = useStore();
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [form, setForm] = useState(emptyClient);

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      updateClient(editing.id, form);
      setEditing(null);
    } else {
      addClient(form);
    }
    setForm(emptyClient);
    setShowForm(false);
  }

  function handleEdit(c: Client) {
    setEditing(c);
    setForm({ name: c.name, phone: c.phone, email: c.email, clientType: c.clientType, notes: c.notes });
    setShowForm(true);
  }

  function handleCancel() {
    setEditing(null);
    setForm(emptyClient);
    setShowForm(false);
  }

  const clientBusinesses = (id: string) => businesses.filter(b => b.clientId === id);

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
          <p className="text-gray-500 text-sm">{clients.length} clientes registrados</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditing(null); setForm(emptyClient); }}
          className="flex items-center gap-2 bg-remax-red text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
        >
          <Plus size={16} /> Nuevo Cliente
        </button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-remax-blue"
          placeholder="Buscar por nombre, teléfono o email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-semibold">{editing ? 'Editar Cliente' : 'Nuevo Cliente'}</h2>
              <button onClick={handleCancel}><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-600">Nombre completo *</label>
                <input
                  required
                  className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-remax-blue"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600">Teléfono</label>
                  <input
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-remax-blue"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Email</label>
                  <input
                    type="email"
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-remax-blue"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">Tipo de Cliente *</label>
                <select
                  required
                  className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-remax-blue"
                  value={form.clientType}
                  onChange={e => setForm({ ...form, clientType: e.target.value as ClientType })}
                >
                  {Object.entries(CLIENT_TYPE_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
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
                <button type="button" onClick={handleCancel} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
                  Cancelar
                </button>
                <button type="submit" className="flex-1 flex items-center justify-center gap-2 bg-remax-red text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700">
                  <Save size={14} /> {editing ? 'Guardar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <User size={40} className="mx-auto mb-2 opacity-30" />
          <p>{clients.length === 0 ? 'No hay clientes registrados aún' : 'No se encontraron resultados'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(c => {
            const bizCount = clientBusinesses(c.id).length;
            return (
              <div key={c.id} className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-remax-blue/10 text-remax-blue rounded-full flex items-center justify-center font-semibold text-sm">
                      {c.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-800">{c.name}</p>
                      <p className="text-xs text-gray-400">{CLIENT_TYPE_LABELS[c.clientType]}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit(c)} className="p-1 hover:bg-gray-100 rounded">
                      <Edit2 size={14} className="text-gray-400" />
                    </button>
                    <button onClick={() => deleteClient(c.id)} className="p-1 hover:bg-red-50 rounded">
                      <Trash2 size={14} className="text-red-400" />
                    </button>
                  </div>
                </div>
                {c.phone && <p className="text-xs text-gray-500 mt-1">📞 {c.phone}</p>}
                {c.email && <p className="text-xs text-gray-500">✉️ {c.email}</p>}
                {c.notes && <p className="text-xs text-gray-400 mt-2 line-clamp-2 italic">"{c.notes}"</p>}
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400">{bizCount} negocio{bizCount !== 1 ? 's' : ''}</span>
                  <span className="text-xs text-gray-400">{formatDate(new Date(c.createdAt))}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
