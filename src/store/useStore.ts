import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Client, Business, AgendaEvent, AssistantMessage, Task } from '../types';
import { generateId } from '../lib/utils';

interface AppState {
  clients: Client[];
  businesses: Business[];
  events: AgendaEvent[];
  messages: AssistantMessage[];

  addClient: (client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => Client;
  updateClient: (id: string, data: Partial<Client>) => void;
  deleteClient: (id: string) => void;

  addBusiness: (biz: Omit<Business, 'id' | 'createdAt' | 'updatedAt'>) => Business;
  updateBusiness: (id: string, data: Partial<Business>) => void;
  deleteBusiness: (id: string) => void;

  addTask: (businessId: string, task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (businessId: string, taskId: string, data: Partial<Task>) => void;

  addEvent: (event: Omit<AgendaEvent, 'id'>) => AgendaEvent;
  deleteEvent: (id: string) => void;

  addMessage: (msg: Omit<AssistantMessage, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      clients: [],
      businesses: [],
      events: [],
      messages: [],

      addClient: (data) => {
        const client: Client = {
          ...data,
          id: generateId(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set(s => ({ clients: [...s.clients, client] }));
        return client;
      },
      updateClient: (id, data) => set(s => ({
        clients: s.clients.map(c => c.id === id ? { ...c, ...data, updatedAt: new Date() } : c),
      })),
      deleteClient: (id) => set(s => ({ clients: s.clients.filter(c => c.id !== id) })),

      addBusiness: (data) => {
        const biz: Business = {
          ...data,
          id: generateId(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set(s => ({ businesses: [...s.businesses, biz] }));
        return biz;
      },
      updateBusiness: (id, data) => set(s => ({
        businesses: s.businesses.map(b => b.id === id ? { ...b, ...data, updatedAt: new Date() } : b),
      })),
      deleteBusiness: (id) => set(s => ({ businesses: s.businesses.filter(b => b.id !== id) })),

      addTask: (businessId, taskData) => {
        const task: Task = {
          ...taskData,
          id: generateId(),
          createdAt: new Date(),
        };
        set(s => ({
          businesses: s.businesses.map(b =>
            b.id === businessId
              ? { ...b, tasks: [...(b.tasks || []), task] }
              : b
          ),
        }));
      },
      updateTask: (businessId, taskId, data) => set(s => ({
        businesses: s.businesses.map(b =>
          b.id === businessId
            ? { ...b, tasks: (b.tasks || []).map(t => t.id === taskId ? { ...t, ...data } : t) }
            : b
        ),
      })),

      addEvent: (data) => {
        const event: AgendaEvent = { ...data, id: generateId() };
        set(s => ({ events: [...s.events, event] }));
        return event;
      },
      deleteEvent: (id) => set(s => ({ events: s.events.filter(e => e.id !== id) })),

      addMessage: (data) => {
        const msg: AssistantMessage = {
          ...data,
          id: generateId(),
          timestamp: new Date(),
        };
        set(s => ({ messages: [...s.messages, msg] }));
      },
      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: 'remax-crm-storage',
      partialize: (state) => ({
        clients: state.clients,
        businesses: state.businesses,
        events: state.events,
      }),
    }
  )
);
