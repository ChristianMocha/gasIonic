import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Productos } from 'src/app/models/productos';
import { CarritoService } from '../../services/carrito.service';
import { ComentarioComponent } from '../comentario/comentario.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent implements OnInit {

  @Input() producto: Productos;

  constructor(private carritoService: CarritoService, private modalController: ModalController) { }

  ngOnInit() {
  }

  addCarrito(){
    this.carritoService.addProducto(this.producto);
  }

  async openModal(){

    const modal = await this.modalController.create({
      component: ComentarioComponent,
      componentProps: {producto: this.producto}
    });
    return await modal.present();
  
  }

}
