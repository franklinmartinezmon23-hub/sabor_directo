import React, { useState } from 'react';
import { EstadoApp, Pedido } from '../types.ts';
import { ActividadReciente } from '../data.ts';
import { Calendar, TrendingUp, Receipt, CheckCircle, Truck, ShoppingBag, Edit, Award } from 'lucide-react';

interface DashboardScreenProps {
  estadoApp: EstadoApp;
  actividades: ActividadReciente[];
  setEstadoApp: React.Dispatch<React.SetStateAction<EstadoApp>>;
  onNavigate: (screen: string) => void;
}

export default function DashboardScreen({
  estadoApp,
  actividades,
  setEstadoApp,
  onNavigate,
}: DashboardScreenProps) {
  const [inputValue, setInputValue] = useState(estadoApp.objetivoDiario.toString());

  // Goal Progress Percents
  const porcentaje = estadoApp.objetivoDiario > 0
    ? Math.min(100, Math.round((estadoApp.pedidosFinalizados / estadoApp.objetivoDiario) * 100))
    : 0;

  // Dynamic Background: Verde Menta (#10B581) when > 50%, Cherry red (#A11548) when lower
  const barColorClass = porcentaje > 50 ? 'bg-[#10B581]' : 'bg-[#A11548]';
  const textColorClass = porcentaje > 50 ? 'text-[#10B581]' : 'text-[#A11548]';

  const handleApplyGoal = () => {
    const val = parseInt(inputValue, 10);
    if (!isNaN(val) && val > 0) {
      setEstadoApp((prev) => ({
        ...prev,
        objetivoDiario: val,
      }));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header and Date */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-[#0b1c30]">
            Panel de Control
          </h2>
          <p className="text-sm text-[#545f73]">
            Resumen operativo y cumplimiento del objetivo diario en tiempo real.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-gray-150 shadow-xs text-sm font-medium">
          <Calendar className="w-4 h-4 text-[#A11548]" />
          <span>HOY, 14 DE JUNIO DE 2026</span>
        </div>
      </div>

      {/* Bento Meta Card (Large) */}
      <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs relative overflow-hidden">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg text-[#0b1c30] mb-1">
              Objetivo del Día
            </h3>
            <p className="text-sm text-[#545f73]">
              Mantén el ritmo dorado para alcanzar la meta de eficiencia corporativa.
            </p>
          </div>
          <div className="text-right">
            <span className={`text-3xl font-black ${textColorClass} transition-all duration-300 block`}>
              {porcentaje}%
            </span>
            <span className="text-[10px] font-bold text-[#545f73] uppercase tracking-wider">
              Cumplimiento
            </span>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full bg-gray-100 h-4 rounded-full mb-3 overflow-hidden p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out-quint ${barColorClass}`}
            style={{ width: `${porcentaje}%` }}
          ></div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <p className="text-sm font-semibold text-[#0b1c30] flex items-center gap-1.5">
            <Award className="w-4 h-4 text-[#F6B828]" />
            <span>
              {estadoApp.pedidosFinalizados} de {estadoApp.objetivoDiario} comandas listas
            </span>
          </p>
          <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-[#10B581]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+12% vs día anterior</span>
          </div>
        </div>
      </div>

      {/* Grid de Contadores Principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pedidos Totales */}
        <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-xs flex items-center gap-4 hover:shadow-sm transition-all">
          <div className="p-3.5 bg-red-50 text-[#A11548] rounded-xl">
            <Receipt className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#545f73] uppercase tracking-wider">
              Pedidos Totales
            </p>
            <p className="text-2xl font-black text-[#0b1c30]">
              {estadoApp.pedidosTotales}
            </p>
          </div>
        </div>

        {/* Finalizados */}
        <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-xs flex items-center gap-4 hover:shadow-sm transition-all">
          <div className="p-3.5 bg-emerald-50 text-[#10B581] rounded-xl">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#545f73] uppercase tracking-wider">
              Finalizados
            </p>
            <p className="text-2xl font-black text-[#10B581]">
              {estadoApp.pedidosFinalizados}
            </p>
          </div>
        </div>

        {/* A domicilio */}
        <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-xs flex items-center gap-4 hover:shadow-sm transition-all">
          <div className="p-3.5 bg-amber-50 text-[#F6B828] rounded-xl">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#545f73] uppercase tracking-wider">
              A Domicilio
            </p>
            <p className="text-2xl font-black text-[#0b1c30]">
              {estadoApp.aDomicilio}
            </p>
          </div>
        </div>

        {/* Para recoger */}
        <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-xs flex items-center gap-4 hover:shadow-sm transition-all">
          <div className="p-3.5 bg-pink-50 text-pink-600 rounded-xl">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#545f73] uppercase tracking-wider">
              Para Recoger
            </p>
            <p className="text-2xl font-black text-[#0b1c30]">
              {estadoApp.paraRecoger}
            </p>
          </div>
        </div>
      </div>

      {/* Split de Modificación de Meta y Registros */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna Ajuste Meta */}
        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg text-[#0b1c30] mb-2 flex items-center gap-1.5">
              <Award className="w-5 h-5 text-[#A11548]" />
              Ajustar Meta Diaria
            </h3>
            <p className="text-sm text-[#545f73] mb-4">
              Establece el número de comandas completadas que se requieren hoy para llegar al 100% de eficiencia.
            </p>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-[#545f73] uppercase">
                Objetivo de Pedidos
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 outline-none focus:border-[#A11548] focus:ring-1 focus:ring-[#A11548] py-2 px-3 text-sm font-bold text-[#0b1c30]"
                />
                <button
                  onClick={handleApplyGoal}
                  className="bg-[#A11548] hover:bg-red-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs"
                >
                  Aplicar
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-100 text-xs text-[#545f73] space-y-1">
            <p>💡 <span className="font-semibold">Nota técnica:</span> El código JavaScript permite cambiar el predeterminado mediante la variable del estado.</p>
          </div>
        </div>

        {/* Columna Historial Reciente */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-150 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-[#0b1c30]">
              Bitácora de Eventos
            </h3>
            <span className="text-xs font-semibold text-[#A11548]">En vivo</span>
          </div>

          <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
            {actividades.map((act) => (
              <div key={act.id} className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0 hover:bg-gray-50/50 transition px-2 rounded-lg">
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${act.colorClase || 'bg-gray-400'}`}></div>
                <div className="flex-grow">
                  <p className="text-sm font-bold text-[#0b1c30]">{act.descripcion}</p>
                  <p className="text-xs text-[#545f73] mt-0.5">{act.tiempo}</p>
                </div>
                {act.montoOpcion && (
                  <span className="text-sm font-extrabold text-[#0b1c30] font-mono shrink-0">
                    {act.montoOpcion}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
