/**
 * types.ts
 * Shared interfaces and type definitions for Sabor Directo.
 */

export interface Cliente {
  id: string; // e.g. "#CL-9032"
  nombre: string;
  telefono: string;
  email: string;
  esVIP: boolean;
  totalPedidos: number;
  porcentajeComando: number; // For progress indicators
  ultimoPedido: string; // e.g. "Hace 2 días", "Hoy"
  avatar?: string;
}

export type TipoPedido = 'delivery' | 'pickup';
export type EstadoPedido = 'Pendiente' | 'En preparación' | 'Demorado' | 'Completado';

export interface Pedido {
  id: string; // e.g. "#24891" or "#2489"
  clienteNombre: string;
  tipo: TipoPedido;
  monto: number;
  estado: EstadoPedido;
  origen: string; // Address or Table, e.g. "Av. Corrientes 1234, CABA" or "Mesa 4"
  items: string; // e.g. "2x Hamburguesa Clásica, 1x Papas Grandes"
  fecha: string; // e.g. "Hace 12m" or "Hace 5 minutos"
  urgente?: boolean;
}

export interface EstadoApp {
  pedidosTotales: number;
  aDomicilio: number;
  paraRecoger: number;
  objetivoDiario: number;
  pedidosFinalizados: number;
}
