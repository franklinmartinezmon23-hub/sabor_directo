import React, { useState } from 'react';
import { Pedido, TipoPedido } from '../types.ts';
import { Search, Filter, Plus, Trash2, Check, Info, MapPin, Watch, ShoppingBag, Truck } from 'lucide-react';

interface PedidosScreenProps {
  pedidos: Pedido[];
  onEliminarPedido: (id: string) => void;
  onCompletarPedido: (id: string) => void;
  onAgregarPedido: (nuevo: Partial<Pedido>) => void;
}

export default function PedidosScreen({
  pedidos,
  onEliminarPedido,
  onCompletarPedido,
  onAgregarPedido,
}: PedidosScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'delivery' | 'pickup'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states for new order
  const [clienteNombre, setClienteNombre] = useState('');
  const [tipo, setTipo] = useState<TipoPedido>('delivery');
  const [monto, setMonto] = useState('');
  const [origen, setOrigen] = useState('');
  const [items, setItems] = useState('');

  // Filter and Search logic
  const filteredPedidos = pedidos.filter((ped) => {
    // Exclude completed or cancelled from this view (just showing active/pending ones)
    if (ped.estado === 'Completado') return false;

    const matchesSearch =
      ped.clienteNombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ped.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ped.items.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = activeFilter === 'all' || ped.tipo === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const handleAgregarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clienteNombre || !monto || !origen || !items) return;

    onAgregarPedido({
      clienteNombre,
      tipo,
      monto: parseFloat(monto) || 10,
      origen,
      items,
    });

    // Reset Form
    setClienteNombre('');
    setTipo('delivery');
    setMonto('');
    setOrigen('');
    setItems('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-[#0b1c30]">
            Gestión de Pedidos Activos
          </h2>
          <p className="text-sm text-[#545f73]">
            Comandas activas que disminuyen o aumentan los contadores del Dashboard instantáneamente.
          </p>
        </div>

        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#A11548] hover:bg-red-800 text-white font-bold text-sm px-4.5 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Pedido</span>
          </button>
        </div>
      </div>

      {/* Info warning alert */}
      <div className="bg-blue-50/50 border-l-4 border-blue-600 p-4 rounded-xl text-xs flex gap-3 text-blue-900 shadow-sm leading-normal">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Interactividad Operativa:</span> Al hacer clic en los iconos rojos de
          <span className="font-bold"> Papelera</span> se elimina el pedido del estado al momento y se actualizan los contadores del Dashboard, sin recargar la página. Al pulsar el botón verde de <span className="font-bold">Listo</span> se finaliza.
        </div>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-8 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por comanda, cliente, productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 outline-none focus:border-[#A11548] focus:ring-1 focus:ring-[#A11548] bg-white text-[#0b1c30]"
          />
        </div>

        <div className="md:col-span-4 flex gap-2">
          {/* Filter switches */}
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex-1 text-xs font-bold rounded-xl py-2.5 border transition-all ${
              activeFilter === 'all'
                ? 'bg-[#0b1c30] text-white border-[#0b1c30]'
                : 'bg-white text-[#545f73] border-gray-200 hover:bg-gray-50'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setActiveFilter('delivery')}
            className={`flex-1 text-xs font-bold rounded-xl py-2.5 border transition-all flex items-center justify-center gap-1 ${
              activeFilter === 'delivery'
                ? 'bg-[#F6B828] text-white border-[#F6B828]'
                : 'bg-white text-[#545f73] border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Reparto</span>
          </button>
          <button
            onClick={() => setActiveFilter('pickup')}
            className={`flex-1 text-xs font-bold rounded-xl py-2.5 border transition-all flex items-center justify-center gap-1 ${
              activeFilter === 'pickup'
                ? 'bg-[#A11548] text-white border-[#A11548]'
                : 'bg-white text-[#545f73] border-gray-200 hover:bg-gray-50'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Retiro</span>
          </button>
        </div>
      </div>

      {/* Orders Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPedidos.length === 0 ? (
          <div className="col-span-full border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center py-16 flex flex-col items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-gray-300 mb-3" />
            <h4 className="font-bold text-[#0b1c30] text-lg">Capacidad Disponible</h4>
            <p className="text-sm text-[#545f73] max-w-sm mt-1 mb-4">
              Aún no hay comandas activas pendientes. Inserta una nueva arriba.
            </p>
          </div>
        ) : (
          filteredPedidos.map((ped) => {
            const isDelivery = ped.tipo === 'delivery';

            return (
              <div
                key={ped.id}
                className="bg-white rounded-2xl border border-gray-150 p-6 shadow-xs relative overflow-hidden group hover:border-[#A11548] hover:shadow-sm transition-all"
              >
                {/* Action buttons overlay */}
                <div className="absolute top-5 right-5 flex gap-1.5 opacity-90 group-hover:opacity-100 transition-all">
                  {/* Completar */}
                  <button
                    onClick={() => onCompletarPedido(ped.id)}
                    title="Marcar completado"
                    className="w-8 h-8 rounded-full bg-emerald-50 text-[#10B581] hover:bg-[#10B581] hover:text-white transition-all flex items-center justify-center active:scale-95"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  {/* Eliminar / Cancelar */}
                  <button
                    onClick={() => onEliminarPedido(ped.id)}
                    title="Eliminar/Cancelar"
                    className="w-8 h-8 rounded-full bg-red-50 text-[#A11548] hover:bg-[#A11548] hover:text-white transition-all flex items-center justify-center active:scale-95"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Badge ID and delivery tipo */}
                <div className="flex items-start gap-2.5 mb-4">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 text-[#A11548] bg-pink-50 rounded-lg">
                    {ped.id}
                  </span>

                  {isDelivery ? (
                    <span className="flex items-center gap-1 bg-amber-50 text-[#F6B828] rounded-full px-2 py-0.5 text-[11px] font-bold">
                      <Truck className="w-3 h-3" />
                      <span>Delivery</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 bg-pink-50 text-[#A11548] rounded-full px-2 py-0.5 text-[11px] font-bold">
                      <ShoppingBag className="w-3 h-3" />
                      <span>Pickup</span>
                    </span>
                  )}
                </div>

                {/* Order Details */}
                <div className="space-y-1 mb-5">
                  <h3 className="font-bold text-lg text-[#0b1c30] tracking-tight leading-tight">
                    {ped.clienteNombre}
                  </h3>
                  <p className="text-xs text-[#545f73] flex items-center gap-1">
                    {isDelivery ? <MapPin className="w-3.5 h-3.5 text-gray-400" /> : <Watch className="w-3.5 h-3.5 text-gray-400" />}
                    <span>{ped.origen}</span>
                  </p>
                  <p className="text-xs text-[#545f73] pt-2 font-medium">
                    Platos: <span className="text-[#0b1c30] font-bold leading-relaxed">{ped.items}</span>
                  </p>
                </div>

                {/* Footer price & state */}
                <div className="flex justify-between items-end border-t border-gray-100 pt-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-0.5">
                      Neto a Pagar
                    </span>
                    <span className="text-2xl font-black text-[#A11548] font-mono leading-none">
                      ${ped.monto.toFixed(2)}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">
                      Estado
                    </span>

                    {ped.estado === 'Pendiente' && (
                      <span className="bg-gray-100 text-[#0b1c30] border border-gray-200 px-2.5 py-0.5 rounded-full text-xs font-bold">
                        Pendiente
                      </span>
                    )}
                    {ped.estado === 'En preparación' && (
                      <span className="bg-amber-50 text-[#F6B828] border border-amber-200 px-2.5 py-0.5 rounded-full text-xs font-bold">
                        En cocina
                      </span>
                    )}
                    {ped.estado === 'Demorado' && (
                      <span className="bg-red-50 text-[#A11548] border border-red-200 px-2.5 py-0.5 rounded-full text-xs font-bold animate-pulse">
                        Demorado
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* NEW ORDER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl p-6 relative animate-scale-up">
            <h3 className="text-lg font-bold text-[#0b1c30] mb-4">
              Ingresar Comanda Manual
            </h3>

            <form onSubmit={handleAgregarSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#545f73] mb-1">
                  Nombre del Comensal o Cliente
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Ricardo Montaner, Mesa 5..."
                  value={clienteNombre}
                  onChange={(e) => setClienteNombre(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 focus:border-[#A11548] focus:ring-1 focus:ring-[#A11548] py-2 px-3 text-sm focus:outline-none text-[#0b1c30]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#545f73] mb-1">
                    Tipo de Entrega
                  </label>
                  <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value as TipoPedido)}
                    className="w-full rounded-lg border border-gray-200 focus:border-[#A11548] focus:ring-1 focus:ring-[#A11548] py-2 px-3 text-sm focus:outline-none"
                  >
                    <option value="delivery">A Domicilio</option>
                    <option value="pickup">Para Recoger</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#545f73] mb-1">
                    Precio Total ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    required
                    placeholder="25.50"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 focus:border-[#A11548] focus:ring-1 focus:ring-[#A11548] py-2 px-3 text-sm focus:outline-none text-[#0b1c30]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#545f73] mb-1">
                  Lugar, Mesa o Dirección
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Mesa 8 o Av. San Martin 344..."
                  value={origen}
                  onChange={(e) => setOrigen(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 focus:border-[#A11548] focus:ring-1 focus:ring-[#A11548] py-2 px-3 text-sm focus:outline-none text-[#0b1c30]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#545f73] mb-1">
                  Items / Comida Ordenada
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ej. 1x Pizza Margherita, 2x Papas Medianas"
                  value={items}
                  onChange={(e) => setItems(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 focus:border-[#A11548] focus:ring-1 focus:ring-[#A11548] py-2 px-3 text-sm focus:outline-none text-[#0b1c30]"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-[#545f73] hover:text-[#0b1c30]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#A11548] text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-red-800 transition"
                >
                  Guardar Comanda
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
