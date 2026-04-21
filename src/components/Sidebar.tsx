import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, Briefcase, Calendar, Bot, FileText, CheckSquare
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/clientes', icon: Users, label: 'Clientes' },
  { to: '/negocios', icon: Briefcase, label: 'Negocios' },
  { to: '/pipeline', icon: FileText, label: 'Pipeline' },
  { to: '/agenda', icon: Calendar, label: 'Agenda' },
  { to: '/tareas', icon: CheckSquare, label: 'Tareas' },
  { to: '/asistente', icon: Bot, label: 'Asistente IA' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-remax-dark text-white flex flex-col shadow-xl">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-remax-red rounded-lg flex items-center justify-center font-bold text-lg">
            R
          </div>
          <div>
            <p className="font-bold text-sm leading-tight">RE/MAX</p>
            <p className="text-xs text-gray-400 leading-tight">Agent CRM</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-remax-red text-white'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <p className="text-xs text-gray-500 text-center">RE/MAX Agent Assistant</p>
        <p className="text-xs text-gray-600 text-center mt-0.5">v1.0.0</p>
      </div>
    </aside>
  );
}
