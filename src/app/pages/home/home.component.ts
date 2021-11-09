import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Productos } from 'src/app/models/productos';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  productos: Productos[]=[];

  constructor(public menuController: MenuController, private productosService: ProductosService) { }

  ngOnInit() {
    this.getProductos();
  }


  openMenu(){
    this.menuController.toggle("first")
  }

  async getProductos(){
    await this.productosService.getProductos().subscribe(
      res => {
        if (res) {
          this.productos = res;
        }
      }
    )
  }
}
