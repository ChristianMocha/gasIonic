import { Component, Input, OnInit } from '@angular/core';
import { Productos } from 'src/app/models/productos';
import { CarritoService } from '../../services/carrito.service';


@Component({
  selector: 'app-item-carrito',
  templateUrl: './item-carrito.component.html',
  styleUrls: ['./item-carrito.component.scss'],
})
export class ItemCarritoComponent implements OnInit {

  @Input() producto: any;
  @Input() botones = true;

  constructor(private carritoService: CarritoService) { }

  ngOnInit() {
  }

  addCarrito(){
    this.carritoService.addProducto(this.producto.producto);
  }

  removeCarrito(){
    this.carritoService.removeProducto(this.producto.producto);
  }

}
