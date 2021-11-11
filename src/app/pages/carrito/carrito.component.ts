import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ProductosService } from '../../services/productos.service';
import { Pedido } from '../../models/pedido';
import { CarritoService } from '../../services/carrito.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit, OnDestroy {

  pedidos: Pedido;
  carritoSuscriber: Subscription;
  total: number;
  cantidad: number;

  constructor(public menuController: MenuController, private productosService: ProductosService, private carritoService: CarritoService, 
    private authService: AuthService, private userService: UsersService) { 

    this.initCarrito();
  }
  
  ngOnInit() {
    this.loadPedido();
  }

  ngOnDestroy(){
    console.log('destruye carrito componenete');
    if (this.carritoSuscriber) {
      this.carritoSuscriber.unsubscribe();
    }
  }


  openMenu(){
    this.menuController.toggle("first")
  }

  loadPedido(){
    this.carritoSuscriber = this.carritoService.getCarrito().subscribe(
      res => {
        this.pedidos = res;
        this.getTotal();
        this.getCantidad();
      }
    );
  }

  initCarrito(){
    this.pedidos = {
      id: '',
      user: null,
      productos:[],
      precioTotal: null,
      estado: 'enviado',
      fecha: new Date(),
      valoracion: null
    }
    
  }

  getTotal(){
    this.total = 0;
    this.pedidos.productos.forEach(
      res => {
        this.total = (res.producto.precioDescuento) * res.cantidad + this.total;
      }
    )
  }

  getCantidad(){
    this.cantidad = 0;
    this.pedidos.productos.forEach(
      res => {
        this.cantidad = res.cantidad + this.cantidad;
      }
    )
  }

  async pedir(){
    if (!this.pedidos.productos.length) {
      console.log('Añada itemas al carrito');
      return;
    }

    const uid = await this.authService.getUserUID();
    this.pedidos.fecha = new Date();
    this.pedidos.precioTotal = this.total;
    console.log("pedir() => ", this.pedidos);
    this.userService.addUserPedido(uid, this.pedidos).then(
      (result) => {
        console.log("guardado con exito");
        this.carritoService.clearCarrito();
    }).catch((err) => {
      
    });
  }

}
