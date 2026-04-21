import { useState } from 'react';
import { useStore } from '../store/useStore';
import type { AgendaEvent } from '../types';
import { formatDatetime } from '../lib/utils';
import { Plus, X, Save, Calendar, ExternalLink, Trash2, Copy, Check } from 'lucide-react';

const EVENT_TYPES = ['Entrevista Inicial', 'Visita', 'Reunión', 'Llamada', 'Seguimiento', 'Firma', 'Reunión con Abogado', 'Producción de Contenido', 'Entrega', 'Recordatorio'];

const emptyEvent: Omit<AgendaEvent, 'id'> = {
  businessCode: '',
  title: '',
  eventType: 'Visita',
  client: '',
  operation: '',
  property: '',
  stage: '',
  objective: '',
  observations: '',
  date: new Date(),
  duration: 60,
};

export default function Agenda() {
  const { events, businesses, addEvent, deleteEvent } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyEvent);
  const [copied, setCopied] = useState<string | null>(null);

  const sorted = [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const upcoming = sorted.filter(e => new Date(e.date) >= new Date());
  const past = sorted.filter(e => new Date(e.date) < new Date());

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const title = `[${form.businessCode}] ${form.eventType}${form.property ? ' - ' + form.property : ''}`;
    addEvent({ ...form, title });
    setForm(emptyEvent);
    setShowForm(false);
  }

  function buildCalendarDescription(ev: AgendaEvent): string {
    return `Cliente: ${ev.client}\nOperación: ${ev.operation}\nPropiedad: ${ev.property}\nEtapa: ${ev.stage}\nObjetivo: ${ev.objective}\nObservaciones: ${ev.observations}`;
  }

  function buildCalendarUrl(ev: AgendaEvent): string {
    const start = new Date(ev.date);
    const end = new Date(start.getTime() + ev.duration * 60 * 1000);
    const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: ev.title,
      dates: `${fmt(start)}/${fmt(end)}`,
      details: buildCalendarDescription(ev),
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }

  function copyDescription(ev: AgendaEvent) {
    navigator.clipboard.writeText(buildCalendarDescription(ev));
    setCopied(ev.id);
    setTimeout(() => setCopied(null), 2000);
  }

  function updateFormFromBiz(code: string) {
    const biz = businesses.find(b => b.code === code);
    if (biz) {
      setForm(f => ({
        ...f,
        businessCode: code,
        client: biz.clientName,
        operation: biz.operationType === 'venta' ? 'Venta' : 'Arriendo',
        property: `${biz.property.type} ${biz.property.address ? '- ' + biz.property.address : ''} ${biz.property.commune}`.trim(),
        stage: biz.stage,
      }));
    } else {
      setForm(f => ({ ...f, businessCode: code }));
    }
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Agenda</h1>
          <p className="text-gray-500 text-sm">{upcoming.length} eventos próximos</p>
        </div>
        <div className="flex gap-3">
          <a
            href="https://calendar.google.com/calendar/u/0/r"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
          >
            <ExternalLink size={14} /> Google Calendar
          </a>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-remax-red text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700"
          >
            <Plus size={16} /> Nuevo Evento
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
              <h2 className="font-semibold">Nuevo Evento</h2>
              <button onClick={() => setShowForm(false)}><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600">Código Negocio *</label>
                  {businesses.length > 0 ? (
                    <select
                      required
                      className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-remax-blue"
                      value={form.businessCode}
                      onChange={e => updateFormFromBiz(e.target.value)}
                    >
                      <option value="">Seleccionar...</option>
                      {businesses.map(b => (
                        <option key={b.id} value={b.code}>{b.code}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      required
                      placeholder="ej: 1028117014-10"
                      className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-remax-blue"
                      value={form.businessCode}
                      onChange={e => updateFormFromBiz(e.target.value)}
                    />
                  )}
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Tipo de Evento *</label>
                  <select
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-remax-blue"
                    value={form.eventType}
                    onChange={e => setForm({ ...form, eventType: e.target.value })}
                  >
                    {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600">Fecha y Hora *</label>
                  <input
                    required
                    type="datetime-local"
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-remax-blue"
                    value={new Date(form.date).toISOString().slice(0, 16)}
                    onChange={e => setForm({ ...form, date: new Date(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Duración (min)</label>
                  <input
                    type="number"
                    min="15"
                    step="15"
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-remax-blue"
                    value={form.duration}
                    onChange={e => setForm({ ...form, duration: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">Cliente</label>
                <input
                  className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-remax-blue"
                  value={form.client}
                  onChange={e => setForm({ ...form, client: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">Propiedad</label>
                <input
                  className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-remax-blue"
                  value={form.property}
                  onChange={e => setForm({ ...form, property: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">Objetivo</label>
                <input
                  className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-remax-blue"
                  value={form.objective}
                  onChange={e => setForm({ ...form, objective: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">Observaciones</label>
                <textarea
                  rows={2}
                  className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-remax-blue resize-none"
                  value={form.observations}
                  onChange={e => setForm({ ...form, observations: e.target.value })}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm">
                  Cancelar
                </button>
                <button type="submit" className="flex-1 flex items-center justify-center gap-2 bg-remax-red text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700">
                  <Save size={14} /> Crear Evento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {events.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Calendar size={40} className="mx-auto mb-2 opacity-30" />
          <p>No hay eventos registrados aún</p>
        </div>
      ) : (
        <div className="space-y-6">
          {upcoming.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Próximos</h2>
              <div className="space-y-3">
                {upcoming.map(ev => <EventCard key={ev.id} ev={ev} onDelete={deleteEvent} onCopy={copyDescription} onCalendar={buildCalendarUrl} copied={copied} />)}
              </div>
            </div>
          )}
          {past.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Historial</h2>
              <div className="space-y-3">
                {past.map(ev => <EventCard key={ev.id} ev={ev} onDelete={deleteEvent} onCopy={copyDescription} onCalendar={buildCalendarUrl} copied={copied} />)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function EventCard({ ev, onDelete, onCopy, onCalendar, copied }: {
  ev: AgendaEvent;
  onDelete: (id: string) => void;
  onCopy: (ev: AgendaEvent) => void;
  onCalendar: (ev: AgendaEvent) => string;
  copied: string | null;
}) {
  const isPast = new Date(ev.date) < new Date();
  return (
    <div className={`bg-white rounded-xl border shadow-sm p-4 ${isPast ? 'opacity-70 border-gray-100' : 'border-blue-100'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-remax-blue bg-blue-50 px-2 py-0.5 rounded">[{ev.businessCode}]</span>
            <span className="text-sm font-semibold text-gray-800">{ev.eventType}</span>
          </div>
          {ev.client && <p className="text-xs text-gray-500 mt-1">👤 {ev.client}</p>}
          {ev.property && <p className="text-xs text-gray-500">🏠 {ev.property}</p>}
          {ev.objective && <p className="text-xs text-gray-400 mt-1 italic">🎯 {ev.objective}</p>}
          <p className="text-xs text-gray-400 mt-2">📅 {formatDatetime(new Date(ev.date))} · {ev.duration} min</p>
        </div>
        <div className="flex gap-1 shrink-0">
          <button
            onClick={() => onCopy(ev)}
            className="p-1.5 hover:bg-gray-100 rounded text-gray-400"
            title="Copiar descripción"
          >
            {copied === ev.id ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          </button>
          <a
            href={onCalendar(ev)}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 hover:bg-blue-50 rounded text-blue-400"
            title="Agregar a Google Calendar"
          >
            <Calendar size={14} />
          </a>
          <button onClick={() => onDelete(ev.id)} className="p-1.5 hover:bg-red-50 rounded text-red-400">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
