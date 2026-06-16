import React from 'react';
import { Pedido } from '../types.ts';
import { Printer, CheckCircle, RotateCcw, Flame, Info, ChefHat, Play } from 'lucide-react';

interface CocinaScreenProps {
  pedidos: Pedido[];
  onCompletarPedido: (id: string) => void;
  onCambiarEstado: (id: string, nuevoEstado: 'Pendiente' | 'En preparación' | 'Demorado' | 'Completado') => void;
  onImprimir: () => void;
}

export default function CocinaScreen({
  pedidos,
  onCompletarPedido,
  onCambiarEstado,
  onImprimir,
}: CocinaScreenProps) {
  // Cocina shows any order that is active and not finalized
  const activeKitchenOrders = pedidos.filter(
    (p) => p.estado !== 'Completado'
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Alert synchronization banner */}
      <div className="bg-emerald-50 border-l-4 border-[#10B581] p-4 rounded-xl flex items-center justify-between shadow-xs gap-4 flex-wrap leading-normal">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-[#10B581] shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-[#0b1c30]">Gestión de Cocina Activa</p>
            <p className="text-xs text-[#545f73] italic">
              Al presionar "Completado" se marca como finalizado. Esto disminuye la cuenta pendiente e incrementa el Progreso de Cumplimiento en el Dashboard.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-white border border-gray-150 rounded-xl px-3 py-1 shrink-0 font-bold text-xs">
          <span className="text-[#10B581] font-extrabold text-base mr-1">
            {activeKitchenOrders.length}
          </span>
          <span className="text-[#545f73] uppercase tracking-wider">Pendientes</span>
        </div>
      </div>

      {/* Control bar */}
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg text-[#0b1c30] flex items-center gap-1">
          <ChefHat className="w-5 h-5 text-[#10B581]" />
          <span>Comandas de Producción</span>
        </h3>

        <button
          onClick={onImprimir}
          className="bg-[#0b1c30] hover:bg-gray-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimir Comandas</span>
        </button>
      </div>

      {/* Kitchen grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {activeKitchenOrders.length === 0 ? (
          <div className="col-span-full border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center py-16 flex flex-col items-center justify-center">
            <CheckCircle className="w-12 h-12 text-emerald-200 mb-3" />
            <h4 className="font-bold text-[#0b1c30] text-lg">Cocina al Día</h4>
            <p className="text-sm text-[#545f73] max-w-sm mt-1">
              No hay pedidos en preparación. ¡Excelente labor del equipo culinario!
            </p>
          </div>
        ) : (
          activeKitchenOrders.map((ped) => {
            const isUrgent = ped.urgente || ped.estado === 'Demorado';

            return (
              <div
                key={ped.id}
                className={`bg-white border rounded-2xl overflow-hidden flex flex-col shadow-xs hover:shadow-sm transition ${
                  isUrgent ? 'border-red-400' : 'border-gray-150'
                }`}
              >
                {/* Header card info */}
                <div
                  className={`p-4 flex justify-between items-start ${
                    isUrgent ? 'bg-red-50/75' : 'bg-gray-50/70'
                  }`}
                >
                  <div>
                    <span className="font-mono font-black text-[#A11548] text-base leading-none">
                      {ped.id}
                    </span>
                    <p className="text-[10px] text-[#545f73] mt-0.5">
                      {ped.origen} • {ped.fecha}
                    </p>
                  </div>

                  {isUrgent ? (
                    <span className="bg-[#A11548] text-white text-[9px] font-black tracking-widest px-2 py-0.5 rounded-full animate-pulse border border-red-700">
                      URGENTE
                    </span>
                  ) : (
                    <span className="bg-gray-100 text-[#545f73] text-[9px] font-extrabold tracking-widest px-2 py-0.5 rounded-full">
                      NORMAL
                    </span>
                  )}
                </div>

                {/* Items and client */}
                <div className="p-4 flex-grow space-y-3">
                  <p className="text-xs font-bold text-[#0b1c30]">
                    Cliente: <span className="font-medium text-[#545f73]">{ped.clienteNombre}</span>
                  </p>
                  <p className="text-xs text-[#0b1c30] bg-[#f8f9ff] p-2.5 rounded-lg border border-gray-100 font-mono leading-relaxed leading-normal">
                    {ped.items}
                  </p>
                </div>

                {/* Action CTA triggers */}
                <div className="p-3 bg-gray-50/50 border-t border-gray-100 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onCompletarPedido(ped.id)}
                    className="bg-[#10B581] hover:bg-emerald-700 text-white py-2 rounded-xl font-bold text-xs flex flex-col items-center justify-center gap-0.5 active:scale-95 transition"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Listo / Completar</span>
                  </button>

                  <button
                    onClick={() => onCambiarEstado(ped.id, 'En preparación')}
                    className="bg-gray-200 hover:bg-[#0b1c30] hover:text-white text-[#0b1c30] py-2 rounded-xl font-bold text-xs flex flex-col items-center justify-center gap-0.5 active:scale-95 transition"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>En camino</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Atmospheric culinary photo row */}
      <div className="bg-white rounded-2xl border border-gray-150 p-6 shadow-xs flex flex-col lg:flex-row items-center gap-6 mt-8">
        <div className="relative rounded-xl overflow-hidden h-44 w-full lg:w-96 shadow-xs shrink-0 group">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAa2WRlfOn5nectCxZGGITewhHREe4xZ6LFj9Ef-8vMsRj-dLtyFmyGjL3ra6JV7AFIBKP5r0jnfcbQ5lMJadgt2AmEgQOpEDLdFINZHs_dmyFArgzeuBjJeOu4Jb0CHcJwfPY49L3as_Dp0gK8PHW4iBAEWRF9gNKdOlGnIdBUgUK5wmtL16q2KSO2h_qKY6W-pWKPB6yt5s2P_7pxNXuxMUP9Kvc8VApmURTF4MrxVpTgcRf85x5SUufYELIiHxx2JL-1wTiLQDOE"
            alt="Cocina de alta intensidad"
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4 text-white">
            <p className="font-extrabold text-[#10B581]">Sabor Sincronizado</p>
            <p className="text-[10px] text-gray-200">Cada plato refleja la devoción de la alta cocina tradicional.</p>
          </div>
        </div>

        <div className="space-y-3 flex-grow">
          <h4 className="font-bold text-[#0b1c30] text-base">Eficacia en Tiempo Real</h4>
          <p className="text-xs text-[#545f73] leading-relaxed">
            La cocina de <span className="font-semibold text-[#0b1c30]">Sabor Directo</span> cuenta con un sistema de trazabilidad digital. Cada vez que cambias un estado, se actualiza el porcentaje de cumplimiento y los contadores en las pantallas del dependiente al instante, evitando retrasos en delivery.
          </p>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#10B581]">
            <Flame className="w-4 h-4 animate-bounce" />
            <span>Soportando alta demanda: 100% de ocupación</span>
          </div>
        </div>
      </div>
    </div>
  );
}
