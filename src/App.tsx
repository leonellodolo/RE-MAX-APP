import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ClientList from './components/ClientList';
import Pipeline from './components/Pipeline';
import Agenda from './components/Agenda';
import Tasks from './components/Tasks';
import Assistant from './components/Assistant';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clientes" element={<ClientList />} />
            <Route path="/negocios" element={<Pipeline />} />
            <Route path="/pipeline" element={<Pipeline />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/tareas" element={<Tasks />} />
            <Route path="/asistente" element={<Assistant />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
