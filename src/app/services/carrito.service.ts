import { Injectable } from '@angular/core';
import { Productos } from '../models/productos';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private pedido: Pedido;

  constructor() { 
    this.loadCarrito();
  }

  loadCarrito(){

  }

  getCarrito(){
    return this.pedido;
  }

  addProducto(producto: Productos){

  }

  removeProducto(producto: Productos){

  }

  realizarPedido(){

  }

  crearCarrito(){
    
  }
}
