import { Cliente, Pedido } from './types.ts';

export const CLIENTES_INICIALES: Cliente[] = [
  {
    id: '#CL-9032',
    nombre: 'Carlos Mendoza',
    telefono: '+52 55 1234 5678',
    email: 'carlos.m@email.com',
    esVIP: true,
    totalPedidos: 12,
    porcentajeComando: 85,
    ultimoPedido: 'Hace 2 días',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqpTTdcNo8RyVmYsxnK2CgBItcrRSB9liAHxtP8n8bW59UjqYqSZnHNW8NNXG9hMBnHN4s4vfc8v9TXLZzWvfsIslPYLyVihzJoUY97hMOxDt7xUTmyXRXHYkLeSXrVLMeCI4Tcm_UZJaIADxzDthgH_NkCVRKVYKzNb5Ni4KZn9a1tLGYtsvGdEZjkUfzyucCmiyo_q4Skyup9CXc7YvkufDkqLkEVqSvnEH6nzTiTyvVTHzoTLyaLfDk02woLVCAn6MOD1RqWinq'
  },
  {
    id: '#CL-8821',
    nombre: 'Elena Rodriguez',
    telefono: '+52 55 9876 5432',
    email: 'elena.rod@email.com',
    esVIP: false,
    totalPedidos: 4,
    porcentajeComando: 30,
    ultimoPedido: 'Hace 1 semana',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfFGjzNctYtv1P5hFxOOVO9fQVmXfzSpks2fgVoCHE0Gzhg1XViC1s5y6xSeRr3y69-YMBeSYiR4__YMvCQj5sN3PqaT-iMp99PvxZRL9woLkCTYvFx4_1aP2BbUSqJ5Y46TD-04-zbgN2h3d-xdFQva5PyIUh5_hLU9xlO5Ct9AVFuYDK4vco3GR_GQyspY_20yBI-RmCLyoG_sCJIp23WV_OBU6dKI4aXNj94Qp3rlRAFwauhqRtO_XAFz-LCe_nLzi09IVuFN0q'
  },
  {
    id: '#CL-7710',
    nombre: 'Sergio Morales',
    telefono: '+52 55 4433 2211',
    email: 's.morales@corp.com',
    esVIP: true,
    totalPedidos: 28,
    porcentajeComando: 100,
    ultimoPedido: 'Hoy'
  }
];

export const PEDIDOS_INICIALES: Pedido[] = [
  {
    id: '#24891',
    clienteNombre: 'Ricardo Montaner',
    tipo: 'delivery',
    monto: 45.50,
    estado: 'En preparación',
    origen: 'Av. Corrientes 1234, CABA',
    items: '2x Hamburguesa Clásica, 1x Papas Grandes',
    fecha: 'Hace 15 min'
  },
  {
    id: '#24892',
    clienteNombre: 'Claudia Schmitd',
    tipo: 'pickup',
    monto: 22.90,
    estado: 'Pendiente',
    origen: 'Retira en 15 minutos',
    items: '1x Pizza Margherita, 1x Coca-Cola 500ml',
    fecha: 'Hace 12 min'
  },
  {
    id: '#24893',
    clienteNombre: 'Julian Weich',
    tipo: 'delivery',
    monto: 112.00,
    estado: 'Demorado',
    origen: 'San Martin 456, Depto 4B',
    items: '3x Tacos Al Pastor, 1x Agua de Jamaica',
    fecha: 'Hace 10 min'
  },
  {
    id: '#2489',
    clienteNombre: 'Mesa 4',
    tipo: 'pickup',
    monto: 35.00,
    estado: 'En preparación',
    origen: 'Mesa 4',
    items: '2x Hamburguesa Clásica, 1x Papas Grandes',
    fecha: 'Hace 12 min',
    urgente: true
  },
  {
    id: '#2490',
    clienteNombre: 'Para llevar',
    tipo: 'pickup',
    monto: 18.20,
    estado: 'Pendiente',
    origen: 'Para llevar',
    items: '1x Pizza Margherita, 1x Coca-Cola 500ml',
    fecha: 'Hace 5 min'
  },
  {
    id: '#2491',
    clienteNombre: 'Rappi',
    tipo: 'delivery',
    monto: 24.50,
    estado: 'En preparación',
    origen: 'Moto reparto',
    items: '3x Tacos Al Pastor, 1x Agua de Jamaica',
    fecha: 'Hace 3 min'
  },
  {
    id: '#2492',
    clienteNombre: 'Mesa 12',
    tipo: 'pickup',
    monto: 32.00,
    estado: 'Pendiente',
    origen: 'Mesa 12',
    items: '1x Ensalada César, 1x Salmón Grillé',
    fecha: 'Recién hecho'
  }
];

export interface ActividadReciente {
  id: string;
  tipo: 'pedido_entregado' | 'pedido_cocina' | 'registro_cliente' | 'notificacion';
  descripcion: string;
  tiempo: string;
  montoOpcion?: string;
  icono?: string;
  colorClase?: string;
}

export const RECIENTES_INICIALES: ActividadReciente[] = [
  {
    id: 'act-1',
    tipo: 'pedido_entregado',
    descripcion: 'Pedido #4829 - Entregado',
    tiempo: 'Hace 5 minutos · Calle Mayor 14',
    montoOpcion: '24.50€',
    colorClase: 'bg-sabor-success'
  },
  {
    id: 'act-2',
    tipo: 'pedido_cocina',
    descripcion: 'Pedido #4830 - En Cocina',
    tiempo: 'Hace 12 minutos · Recogida Local',
    montoOpcion: '18.20€',
    colorClase: 'bg-sabor-primary'
  },
  {
    id: 'act-3',
    tipo: 'registro_cliente',
    descripcion: 'Nuevo Cliente Registrado',
    tiempo: 'Hace 18 minutos · María García',
    icono: 'person_add',
    colorClase: 'bg-slate-400'
  }
];
