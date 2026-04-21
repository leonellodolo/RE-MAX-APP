import type { PipelineStage, ClientType } from '../types';

export const PIPELINE_STAGES: { key: PipelineStage; label: string; color: string }[] = [
  { key: 'lead_nuevo', label: 'Lead Nuevo', color: 'bg-gray-200 text-gray-700' },
  { key: 'contacto_iniciado', label: 'Contacto Iniciado', color: 'bg-blue-100 text-blue-700' },
  { key: 'reunion_agendada', label: 'Reunión Agendada', color: 'bg-indigo-100 text-indigo-700' },
  { key: 'reunion_realizada', label: 'Reunión Realizada', color: 'bg-purple-100 text-purple-700' },
  { key: 'evaluacion', label: 'Evaluación', color: 'bg-yellow-100 text-yellow-700' },
  { key: 'captacion', label: 'Captación', color: 'bg-orange-100 text-orange-700' },
  { key: 'publicacion_activa', label: 'Publicación Activa', color: 'bg-green-100 text-green-700' },
  { key: 'visita', label: 'Visita', color: 'bg-teal-100 text-teal-700' },
  { key: 'promesa', label: 'Promesa', color: 'bg-cyan-100 text-cyan-700' },
  { key: 'proceso_legal', label: 'Proceso Legal', color: 'bg-blue-200 text-blue-800' },
  { key: 'etapa_final', label: 'Etapa Final', color: 'bg-emerald-100 text-emerald-700' },
  { key: 'cerrado', label: 'Cerrado ✓', color: 'bg-green-500 text-white' },
  { key: 'pausado', label: 'Pausado', color: 'bg-gray-300 text-gray-600' },
  { key: 'caido', label: 'Caído', color: 'bg-red-100 text-red-700' },
];

export const CLIENT_TYPE_LABELS: Record<ClientType, string> = {
  propietario_vendedor: 'Propietario Vendedor',
  propietario_arrendador: 'Propietario Arrendador',
  interesado_comprador: 'Interesado Comprador',
  interesado_arrendatario: 'Interesado Arrendatario',
};

export function getPipelineLabel(stage: PipelineStage): string {
  return PIPELINE_STAGES.find(s => s.key === stage)?.label ?? stage;
}

export function getPipelineColor(stage: PipelineStage): string {
  return PIPELINE_STAGES.find(s => s.key === stage)?.color ?? 'bg-gray-200 text-gray-700';
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

export function formatDatetime(date: Date): string {
  return new Intl.DateTimeFormat('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}
