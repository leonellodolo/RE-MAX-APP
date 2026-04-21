export type ClientType = 'propietario_vendedor' | 'propietario_arrendador' | 'interesado_comprador' | 'interesado_arrendatario';

export type PipelineStage =
  | 'lead_nuevo'
  | 'contacto_iniciado'
  | 'reunion_agendada'
  | 'reunion_realizada'
  | 'evaluacion'
  | 'captacion'
  | 'publicacion_activa'
  | 'visita'
  | 'promesa'
  | 'proceso_legal'
  | 'etapa_final'
  | 'cerrado'
  | 'pausado'
  | 'caido';

export type OperationType = 'venta' | 'arriendo';

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  clientType: ClientType;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Property {
  id: string;
  address: string;
  commune: string;
  region: string;
  type: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  price?: number;
  currency?: 'CLP' | 'UF' | 'USD';
}

export interface ProductionStatus {
  photos: boolean;
  videoPortal: boolean;
  videoSocial: boolean;
  virtualTour: boolean;
  portalText: boolean;
  socialText: boolean;
  script: boolean;
  editing: boolean;
  published: boolean;
}

export interface LegalStatus {
  offerLetter: boolean;
  negotiation: boolean;
  promise: boolean;
  contract: boolean;
  lawyerCoordination: boolean;
  titleStudy: boolean;
  notarySigning: boolean;
  notaryInstructions: boolean;
  appraisal: boolean;
  legalFollowUp: boolean;
  propertyDelivery: boolean;
}

export interface Business {
  id: string;
  code: string;
  clientId: string;
  clientName: string;
  operationType: OperationType;
  property: Property;
  stage: PipelineStage;
  production?: ProductionStatus;
  legal?: LegalStatus;
  budget?: number;
  paymentMethod?: string;
  urgency?: 'alta' | 'media' | 'baja';
  notes: string;
  documents: AppDocument[];
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AppDocument {
  id: string;
  name: string;
  status: 'pendiente' | 'recibido' | 'faltante';
  notes?: string;
}

export interface Task {
  id: string;
  businessCode: string;
  title: string;
  description?: string;
  priority: 'alta' | 'media' | 'baja';
  status: 'pendiente' | 'en_progreso' | 'completada';
  dueDate?: Date;
  createdAt: Date;
}

export interface AgendaEvent {
  id: string;
  businessCode: string;
  title: string;
  eventType: string;
  client: string;
  operation: string;
  property: string;
  stage: string;
  objective: string;
  observations: string;
  date: Date;
  duration: number;
  calendarEventId?: string;
}

export interface AssistantMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
