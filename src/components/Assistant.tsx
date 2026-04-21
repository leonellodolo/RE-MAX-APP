import { useState, useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { getPipelineLabel, formatDate } from '../lib/utils';
import { Send, Bot, User, Trash2 } from 'lucide-react';

const COMMANDS = [
  { cmd: 'ACTUALIZAR CASO', hint: 'ACTUALIZAR CASO [CÓDIGO]' },
  { cmd: 'PREPARAR RESPUESTA', hint: 'PREPARAR RESPUESTA para [cliente]' },
  { cmd: 'BAJAR A ACCIÓN', hint: 'BAJAR A ACCIÓN [CÓDIGO]' },
  { cmd: 'LLEVAR A CONTENIDO', hint: 'LLEVAR A CONTENIDO [CÓDIGO]' },
  { cmd: 'REPORTE DE AGENDA', hint: 'REPORTE DE AGENDA [CÓDIGO]' },
];

function processCommand(input: string, store: ReturnType<typeof useStore.getState>): string {
  const { businesses, clients, events } = store;
  const upper = input.toUpperCase().trim();

  if (upper.startsWith('REPORTE DE AGENDA')) {
    const code = input.match(/REPORTE DE AGENDA\s+([^\s]+)/i)?.[1];
    if (!code) return '⚠️ Indica el código del negocio. Ej: REPORTE DE AGENDA 1028117014-10';
    const biz = businesses.find(b => b.code.toLowerCase() === code.toLowerCase());
    if (!biz) return `❌ No encontré el negocio con código ${code}.`;
    const bizEvents = events.filter(e => e.businessCode.toLowerCase() === code.toLowerCase());
    const bizTasks = (biz.tasks || []).filter(t => t.status !== 'completada');
    return `📋 REPORTE: ${biz.code}\nCliente: ${biz.clientName}\nEstado: ${getPipelineLabel(biz.stage)}\n\nEventos: ${bizEvents.length === 0 ? 'Sin eventos' : bizEvents.map(e => `\n• ${formatDate(new Date(e.date))} → ${e.eventType}`).join('')}\n\nTareas: ${bizTasks.length === 0 ? 'Sin tareas' : bizTasks.map(t => `\n• [${t.priority.toUpperCase()}] ${t.title}`).join('')}`;
  }

  if (upper.startsWith('ACTUALIZAR CASO')) {
    const code = input.match(/ACTUALIZAR CASO\s+([^\s]+)/i)?.[1];
    if (!code) return '⚠️ Indica el código. Ej: ACTUALIZAR CASO 1028117014-10';
    const biz = businesses.find(b => b.code.toLowerCase() === code.toLowerCase());
    if (!biz) return `❌ No encontré el negocio con código ${code}.`;
    return `✅ CASO: ${biz.code}\nEtapa: ${getPipelineLabel(biz.stage)}\nCliente: ${biz.clientName}\nOperación: ${biz.operationType}\nPropiedad: ${biz.property.type} en ${biz.property.commune}`;
  }

  if (upper.startsWith('BAJAR A ACCI')) {
    const code = input.match(/BAJAR A ACCI[OÓ]N\s+([^\s]+)/i)?.[1];
    if (!code) return '⚠️ Indica el código. Ej: BAJAR A ACCIÓN 1028117014-10';
    const biz = businesses.find(b => b.code.toLowerCase() === code.toLowerCase());
    if (!biz) return `❌ No encontré el negocio con código ${code}.`;
    return `⚡ ACCIÓN: ${biz.code}\nEtapa actual: ${getPipelineLabel(biz.stage)}\n\n1. Contactar al cliente\n2. Actualizar estado del negocio\n3. Documentar avances\n4. Agendar próximo seguimiento`;
  }

  if (upper.startsWith('PREPARAR RESPUESTA')) {
    const content = input.replace(/PREPARAR RESPUESTA\s*/i, '').trim();
    return `✉️ MENSAJE PROFESIONAL:\n\nHola ${content || '[Nombre del cliente]'},\n\nEspero que estés muy bien. Me comunico para darte seguimiento a nuestra gestión.\n\nQuedo a tu disposición para cualquier consulta.\n\n¡Quedo atenta!`;
  }

  if (upper.startsWith('LLEVAR A CONTENIDO')) {
    return `🎨 IDEAS DE CONTENIDO:\n\n1. "5 errores al vender sin asesor"\n2. "¿Cómo se determina el valor de tu propiedad?"\n3. Detrás de escena de una visita\n4. Proceso legal simplificado\n5. Preguntas frecuentes de clientes`;
  }

  return `👋 Asistente CRM RE/MAX\n\nComandos disponibles:\n• ACTUALIZAR CASO [CÓDIGO]\n• BAJAR A ACCIÓN [CÓDIGO]\n• REPORTE DE AGENDA [CÓDIGO]\n• PREPARAR RESPUESTA [contexto]\n• LLEVAR A CONTENIDO [CÓDIGO]\n\nNegocios activos: ${businesses.filter(b => !['cerrado','caido'].includes(b.stage)).length}\nClientes: ${clients.length}`;
}

export default function Assistant() {
  const store = useStore();
  const { messages, addMessage, clearMessages } = store;
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  async function handleSend() {
    if (!input.trim()) return;
    const userInput = input.trim();
    setInput('');
    addMessage({ role: 'user', content: userInput });
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    const response = processCommand(userInput, useStore.getState());
    addMessage({ role: 'assistant', content: response });
    setLoading(false);
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Asistente IA</h1>
            <p className="text-gray-500 text-sm">Motor de inteligencia operativa RE/MAX</p>
          </div>
          {messages.length > 0 && (
            <button onClick={clearMessages} className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500">
              <Trash2 size={14} /> Limpiar
            </button>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {COMMANDS.map(({ cmd, hint }) => (
            <button key={cmd} onClick={() => setInput(hint)}
              className="shrink-0 text-xs bg-gray-100 hover:bg-remax-blue hover:text-white text-gray-600 px-3 py-1.5 rounded-full transition-colors">
              {cmd}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 pt-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <Bot size={48} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">Usa los comandos de arriba o escribe tu consulta</p>
          </div>
        )}
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 bg-remax-blue rounded-full flex items-center justify-center shrink-0 mt-1">
                <Bot size={16} className="text-white" />
              </div>
            )}
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap break-words ${msg.role === 'user' ? 'bg-remax-red text-white rounded-tr-sm' : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-tl-sm'}`}>
              {msg.content}
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center shrink-0 mt-1">
                <User size={16} className="text-gray-600" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-remax-blue rounded-full flex items-center justify-center">
              <Bot size={16} className="text-white" />
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                {[0,1,2].map(i => <div key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i*0.15}s` }} />)}
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="flex gap-3">
          <textarea rows={2}
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-remax-blue"
            placeholder="Escribe un comando o pregunta... (Enter para enviar)"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
          />
          <button onClick={handleSend} disabled={!input.trim() || loading}
            className="px-4 py-2 bg-remax-red text-white rounded-xl hover:bg-red-700 disabled:opacity-50 transition-colors">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
