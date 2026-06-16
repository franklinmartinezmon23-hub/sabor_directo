/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Cliente, Pedido, EstadoApp } from './types.ts';
import { CLIENTES_INICIALES, PEDIDOS_INICIALES, RECIENTES_INICIALES, ActividadReciente } from './data.ts';

// Component Screens
import DashboardScreen from './components/DashboardScreen.tsx';
import ClientesScreen from './components/ClientesScreen.tsx';
import PedidosScreen from './components/PedidosScreen.tsx';
import CocinaScreen from './components/CocinaScreen.tsx';
import AjustesScreen from './components/AjustesScreen.tsx';

// Icons from lucide-react
import { LayoutDashboard, Users, Clock, Flame, Settings, ChefHat, Bell, ReceiptText, PanelLeftOpen } from 'lucide-react';

export default function App() {
  // Navigation Routing Basic State (dashboard, menu/clientes, metricas/pedidos, ajustes/cocina, configuracion/ajustes)
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'clientes' | 'pedidos' | 'cocina' | 'ajustes'>('dashboard');

  // Core collections in state
  const [clientes, setClientes] = useState<Cliente[]>(CLIENTES_INICIALES);
  const [pedidos, setPedidos] = useState<Pedido[]>(PEDIDOS_INICIALES);
  const [actividades, setActividades] = useState<ActividadReciente[]>(RECIENTES_INICIALES);

  // --- ADVERTENCIA PARA DESARROLLADORES ESPAÑOLES ---
  // El 'objetivoDiario' se pre-carga en 48. Puedes cambiar este valor predeterminado de inicio abajo.
  const [estadoApp, setEstadoApp] = useState<EstadoApp>({
    pedidosTotales: 0,
    aDomicilio: 0,
    paraRecoger: 0,
    objetivoDiario: 48, // <-- MODIFICA ESTE VALOR para cambiar la meta predeterminada de comandas en el Dashboard
    pedidosFinalizados: 0
  });

  const [toasts, setToasts] = useState<{ id: number; message: string; type: 'success' | 'warn' | 'info' }[]>([]);

  // Show dynamic system notification Toast
  const triggerToast = (message: string, type: 'success' | 'warn' | 'info' = 'success') => {
    const newToast = { id: Date.now(), message, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4000);
  };

  /*=========================================
  /* GESTIÓN DE ESTADO (LÓGICA DE DATOS)
  /* Recalcula automáticamente los totales del Dashboard cada cambio.
  /*=========================================*/
  const actualizarDashboard = (currentPedidos: Pedido[]) => {
    const activados = currentPedidos.filter(p => p.estado !== 'Completado'); // active count
    const actualizados = currentPedidos.filter(p => p.estado !== 'Completado' /* exclude completed to compute active */);

    // Calculo dinámico exacto de activos/completados
    const noCancelados = currentPedidos; // we keep track of active list
    const todosFinalizados = currentPedidos.filter(p => p.estado === 'Completado').length;
    const totalCount = currentPedidos.length;
    const deliverCount = currentPedidos.filter(p => p.tipo === 'delivery').length;
    const pickupCount = currentPedidos.filter(p => p.tipo === 'pickup').length;

    setEstadoApp(prev => ({
      ...prev,
      pedidosTotales: totalCount,
      aDomicilio: deliverCount,
      paraRecoger: pickupCount,
      pedidosFinalizados: todosFinalizados
    }));
  };

  // Run update on mount with initial orders
  useEffect(() => {
    actualizarDashboard(pedidos);
  }, []);

  /*=========================================
  /* ACCIONES: COMPLETAR, CANCELAR Y AGREGAR COMANDAS
  /*=========================================*/
  
  // Completar comanda listo
  const handleCompletarPedido = (id: string) => {
    const index = pedidos.findIndex(p => p.id === id);
    if (index === -1) return;
    
    const updated = [...pedidos];
    updated[index] = { ...updated[index], estado: 'Completado' };
    
    setPedidos(updated);
    actualizarDashboard(updated);

    // Add activity log
    const nuevaAct: ActividadReciente = {
      id: `act-${Date.now()}`,
      tipo: 'pedido_entregado',
      descripcion: `Pedido ${id} completado para ${pedidos[index].clienteNombre}`,
      tiempo: 'Hace un instante',
      montoOpcion: `$${pedidos[index].monto.toFixed(2)}`,
      colorClase: 'bg-[#10B581]'
    };
    setActividades(prev => [nuevaAct, ...prev]);
    triggerToast(`¡Pedido ${id} de ${pedidos[index].clienteNombre} completado!`, 'success');
  };

  // Cancelar/Eliminar pedido triggers instant counters update without page refresh
  const handleEliminarPedido = (id: string) => {
    const index = pedidos.findIndex(p => p.id === id);
    if (index === -1) return;

    const clienteName = pedidos[index].clienteNombre;
    
    // Completely filter out from active/completed to decrease dashboard counters instantly
    const updated = pedidos.filter(p => p.id !== id);
    
    setPedidos(updated);
    actualizarDashboard(updated);

    // Add activity log
    const nuevaAct: ActividadReciente = {
      id: `act-${Date.now()}`,
      tipo: 'pedido_cocina',
      descripcion: `Pedido ${id} eliminado/cancelado`,
      tiempo: 'Hace un instante',
      colorClase: 'bg-[#A11548]'
    };
    setActividades(prev => [nuevaAct, ...prev]);
    triggerToast(`Pedido ${id} de ${clienteName} eliminado del sistema.`, 'warn');
  };

  // Cambiar estado interactivamente (e.g. marcar "En camino")
  const handleCambiarEstado = (id: string, nuevoEstado: 'Pendiente' | 'En preparación' | 'Demorado' | 'Completado') => {
    const index = pedidos.findIndex(p => p.id === id);
    if (index === -1) return;

    const updated = [...pedidos];
    updated[index] = { ...updated[index], estado: nuevoEstado };

    setPedidos(updated);
    actualizarDashboard(updated);
    triggerToast(`Pedido ${id} actualizado a: ${nuevoEstado}`, 'info');
  };

  // Agregar pedido nuevo
  const handleAgregarPedido = (nuevo: Partial<Pedido>) => {
    const generatedId = `#24${Math.floor(890 + Math.random() * 105)}`;
    
    const nuevoCompleto: Pedido = {
      id: generatedId,
      clienteNombre: nuevo.clienteNombre || 'Cliente Directo',
      tipo: nuevo.tipo || 'delivery',
      monto: nuevo.monto || 15.00,
      estado: 'Pendiente',
      origen: nuevo.origen || 'Mostrador',
      items: nuevo.items || '1x Consumición',
      fecha: 'Recién hecho'
    };

    const updated = [...pedidos, nuevoCompleto];
    setPedidos(updated);
    actualizarDashboard(updated);

    const nuevaAct: ActividadReciente = {
      id: `act-${Date.now()}`,
      tipo: 'registro_cliente',
      descripcion: `Nueva comanda ${generatedId} ingresada`,
      tiempo: 'Hace un instante',
      montoOpcion: `$${nuevoCompleto.monto.toFixed(2)}`,
      colorClase: 'bg-[#F6B828]'
    };
    setActividades(prev => [nuevaAct, ...prev]);
    triggerToast(`Pedido ${generatedId} creado exitosamente.`, 'success');
  };

  const handleImprimir = () => {
    triggerToast('Enviando comandas activas a la impresora de cocina...', 'info');
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col pb-24 md:pb-6 font-sans">
      
      {/* Top Banner Header bar */}
      <header class="bg-white border-b border-gray-100 shadow-xs sticky top-0 z-40">
        <div class="max-w-6xl mx-auto px-4 py-3.5 flex justify-between items-center">
          <div class="flex items-center gap-2.5">
            <div class="p-2.5 rounded-full bg-pink-50 text-[#A11548] md:hidden">
              <PanelLeftOpen className="w-5 h-5" />
            </div>
            
            {/* Header Sabor Directo Branding */}
            <div class="flex items-center gap-1.5 cursor-pointer" onClick={() => setCurrentTab('dashboard')}>
              <ChefHat className="w-6 h-6 text-[#A11548]" />
              <h1 class="font-extrabold text-lg tracking-tight text-[#A11548] flex items-center gap-1">
                Sabor <span class="text-[#10B581] font-black">Directo</span>
              </h1>
            </div>
          </div>
          
          <div class="flex items-center gap-4">
            <span class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-[#10B581]">
              <span class="w-1.5 h-1.5 rounded-full bg-[#10B581] animate-ping"></span>
              Operando en vivo
            </span>
            
            <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-[#A11548]/20 bg-gray-150">
              <img 
                alt="Profile Avatar" 
                class="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjavaB2caYJC_-FwA7p9atNhvHyDCp4g8ldF-selbg_Wx3sjbiu_iuG5iAH6leDU5LFwSGrvJvh5t0F7ATyV-1RaexH1iFHIuSraSoWMuppUK5rqVLGhThkiL5zgk67-vH2-gOodKsqAktIg0VpkrOnTan5D0lqiTh3iTbtkE13glzBya7YlNZRP8-ZefBmr97TjahfiiE2VrUVh9lpMst2B_auQJCqJIdqVNhaGx18U4n7ZBcFkDYk-dk4A8x65i7vkazSdi81woh"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Routing Containers */}
      <main class="max-w-6xl mx-auto w-full px-4 py-6 flex-grow">
        
        {currentTab === 'dashboard' && (
          <DashboardScreen
            estadoApp={estadoApp}
            actividades={actividades}
            setEstadoApp={setEstadoApp}
            onNavigate={(screen) => setCurrentTab(screen as any)}
          />
        )}

        {currentTab === 'clientes' && (
          <ClientesScreen 
            clientes={clientes} 
            onNavigateToOrder={() => setCurrentTab('pedidos')}
          />
        )}

        {currentTab === 'pedidos' && (
          <PedidosScreen
            pedidos={pedidos}
            onEliminarPedido={handleEliminarPedido}
            onCompletarPedido={handleCompletarPedido}
            onAgregarPedido={handleAgregarPedido}
          />
        )}

        {currentTab === 'cocina' && (
          <CocinaScreen
            pedidos={pedidos}
            onCompletarPedido={handleCompletarPedido}
            onCambiarEstado={handleCambiarEstado}
            onImprimir={handleImprimir}
          />
        )}

        {currentTab === 'ajustes' && (
          <AjustesScreen />
        )}

      </main>

      {/* Dynamic Toast feedback portal */}
      <div className="fixed bottom-24 right-4 z-50 flex flex-col gap-2 max-w-sm">
        {toasts.map((toast) => {
          let sideColor = 'border-[#A11548]';
          if (toast.type === 'success') sideColor = 'border-[#10B581]';
          if (toast.type === 'warn') sideColor = 'border-[#F6B828]';

          return (
            <div
              key={toast.id}
              className={`bg-white text-[#0b1c30] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-bounce text-xs font-bold border-l-4 ${sideColor}`}
            >
              <Bell className="w-4 h-4 text-[#A11548] shrink-0" />
              <span>{toast.message}</span>
            </div>
          );
        })}
      </div>

      {/* Bottom Navigation Navigation Routing Bar (Mobile & Desktop compatible mockup) */}
      <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-150 py-1.5 shadow-xl z-40">
        <div class="max-w-md mx-auto flex justify-around items-center px-4">
          
          {/* Tab 1: Dashboard */}
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`flex flex-col items-center justify-center px-3.5 py-1 rounded-xl transition duration-150 active:scale-95 ${
              currentTab === 'dashboard' ? 'text-[#A11548] scale-100' : 'text-[#545f73] hover:text-[#A11548]'
            }`}
          >
            <LayoutDashboard className="w-5 h-5 shrink-0" />
            <span class="text-[10px] font-bold mt-0.5">Dashboard</span>
          </button>

          {/* Tab 2: Clientes */}
          <button
            onClick={() => setCurrentTab('clientes')}
            className={`flex flex-col items-center justify-center px-3.5 py-1 rounded-xl transition duration-150 active:scale-95 ${
              currentTab === 'clientes' ? 'text-[#10B581] scale-100' : 'text-[#545f73] hover:text-[#10B581]'
            }`}
          >
            <Users className="w-5 h-5 shrink-0" />
            <span class="text-[10px] font-bold mt-0.5">Clientes</span>
          </button>

          {/* Tab 3: Pedidos */}
          <button
            onClick={() => setCurrentTab('pedidos')}
            className={`flex flex-col items-center justify-center px-3.5 py-1 rounded-xl transition duration-150 active:scale-95 ${
              currentTab === 'pedidos' ? 'text-[#A11548] scale-100' : 'text-[#545f73] hover:text-[#A11548]'
            }`}
          >
            <ReceiptText className="w-5 h-5 shrink-0" />
            <span class="text-[10px] font-bold mt-0.5">Pedidos</span>
          </button>

          {/* Tab 4: Cocina */}
          <button
            onClick={() => setCurrentTab('cocina')}
            className={`flex flex-col items-center justify-center px-3.5 py-1 rounded-xl transition duration-150 active:scale-95 ${
              currentTab === 'cocina' ? 'text-[#10B581] scale-100' : 'text-[#545f73] hover:text-[#10B581]'
            }`}
          >
            <ChefHat className="w-5 h-5 shrink-0" />
            <span class="text-[10px] font-bold mt-0.5">Cocina</span>
          </button>

          {/* Tab 5: Ajustes / Entregable standalone HTML Link */}
          <button
            onClick={() => setCurrentTab('ajustes')}
            className={`flex flex-col items-center justify-center px-3.5 py-1 rounded-xl transition duration-150 active:scale-95 ${
              currentTab === 'ajustes' ? 'text-[#A11548] scale-100' : 'text-[#545f73] hover:text-[#A11548]'
            }`}
          >
            <Settings className="w-5 h-5 shrink-0" />
            <span class="text-[10px] font-bold mt-0.5">Integración</span>
          </button>

        </div>
      </nav>

    </div>
  );
}
