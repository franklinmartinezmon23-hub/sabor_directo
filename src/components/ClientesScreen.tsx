import React, { useState } from 'react';
import { Cliente } from '../types.ts';
import { Search, UserCheck, TrendingUp, Sparkles, Award, Phone, Mail } from 'lucide-react';

interface ClientesScreenProps {
  clientes: Cliente[];
  onNavigateToOrder: () => void;
}

export default function ClientesScreen({ clientes, onNavigateToOrder }: ClientesScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClientes = clientes.filter(c =>
    c.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.telefono.includes(searchQuery)
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-[#0b1c30]">
            Gestión de Clientes
          </h2>
          <p className="text-sm text-[#545f73]">
            Monitorea, filtra y administra tu base de datos de consumidores y comensales recurrentes.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#545f73]" />
          <input
            type="text"
            placeholder="Buscar por nombre, teléfono o email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:border-[#10B581] focus:ring-1 focus:ring-[#10B581] bg-white text-[#0b1c30]"
          />
        </div>
      </div>

      {/* Bento Grid layout for customer counts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-150 shadow-xs flex items-center gap-3">
          <div className="p-2 bg-emerald-50 text-[#10B581] rounded-lg shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#545f73] uppercase tracking-wider">Vips Activos</p>
            <p className="text-lg font-extrabold text-[#0b1c30]">82</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-150 shadow-xs flex items-center gap-3">
          <div className="p-2 bg-amber-50 text-[#F6B828] rounded-lg shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#545f73] uppercase tracking-wider">Nuevos (Mes)</p>
            <p className="text-lg font-extrabold text-[#0b1c30]">+45</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-150 shadow-xs flex items-center gap-3">
          <div className="p-2 bg-pink-50 text-pink-600 rounded-lg shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#545f73] uppercase tracking-wider">Pedidos Promedio</p>
            <p className="text-lg font-extrabold text-[#0b1c30]">3.4 / mes</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-150 shadow-xs flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#545f73] uppercase tracking-wider">Base Registrados</p>
            <p className="text-lg font-extrabold text-[#0b1c30]">1,284</p>
          </div>
        </div>
      </div>

      {/* Customer list container */}
      <div className="bg-white rounded-2xl border border-gray-150 shadow-xs overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-150 flex justify-between items-center">
          <h3 className="font-bold text-sm text-[#0b1c30]">Frecuentadores Activos</h3>
          <button 
            onClick={onNavigateToOrder}
            className="text-xs font-bold text-[#A11548] hover:underline"
          >
            Siguiente Pedido Activo →
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredClientes.length === 0 ? (
            <div className="p-8 text-center text-sm text-[#545f73]">
              No se han encontrado clientes que coincidan con la búsqueda.
            </div>
          ) : (
            filteredClientes.map((cl) => {
              const avatarInitials = cl.nombre.split(' ').map(n => n[0]).join('');

              return (
                <div
                  key={cl.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition duration-150 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {cl.avatar ? (
                      <img
                        src={cl.avatar}
                        alt={cl.nombre}
                        className="w-10 h-10 rounded-full object-cover border border-gray-100"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-pink-100 text-[#A11548] flex items-center justify-center font-bold text-sm">
                        {avatarInitials}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-bold text-[#0b1c30]">{cl.nombre}</p>
                      <p className="text-[11px] text-[#545f73]">ID: {cl.id}</p>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-[#545f73]">
                    <p className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      <span>{cl.telefono}</span>
                    </p>
                    <p className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-gray-400" />
                      <span>{cl.email}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs font-bold text-[#0b1c30]">
                        {cl.totalPedidos} de comandas totales
                      </p>
                      <div className="w-24 bg-gray-100 h-1 rounded-full overflow-hidden mt-1 select-none">
                        <div
                          className="bg-[#10B581] h-full"
                          style={{ width: `${cl.porcentajeComando || 40}%` }}
                        ></div>
                      </div>
                      <p className="text-[10px] text-[#545f73] mt-0.5">
                        Último: {cl.ultimoPedido}
                      </p>
                    </div>

                    {cl.esVIP ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-pink-50 text-[#A11548]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A11548] animate-pulse"></span>
                        VIP
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-[#545f73]">
                        Activo
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
