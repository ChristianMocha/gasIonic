import { Users } from './user';
import { Productos } from './productos';

export interface Pedido{
    id: string;
    user: Users;
    productos: ProductoPedido [];
    precioTotal: number;
    estado: EstadoPedido;
    fecha?: any;
    valoracion: number;
}

export interface ProductoPedido{
    producto: Productos;
    cantidad: number;
}

export type EstadoPedido = 'enviado' | 'visto' | 'camino' | 'entregado';