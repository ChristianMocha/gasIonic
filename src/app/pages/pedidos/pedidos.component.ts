import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Pedido } from '../../models/pedido';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {

  nuevoSuscriber: Subscription;
  entragadosSuscriber: Subscription;
  pedidos: Pedido[]=[];
  pedidosEntregados: Pedido[]=[];

  nuevos = true;

  constructor(public menuController: MenuController, private authService: AuthService, private userService: UsersService) { }

  ngOnInit() {
    this. getPedidosNuevos();
  }

  ngOnDestroy(){
    if (this.nuevoSuscriber) {
      this.nuevoSuscriber.unsubscribe();
    }else if (this.entragadosSuscriber) {
      this.entragadosSuscriber.unsubscribe();  
    }
  }

  openMenu(){
    this.menuController.toggle("first")
  }

  chageSegment(ev: any){
    const opc = ev.detail.value;
    if (opc === 'culminados') {
      this.nuevos = false;
      this.getPedidosCulminados();
    }else if(opc === 'nuevos'){
      this.nuevos = true;
      this.getPedidosNuevos();
    }

  }
  async getPedidosNuevos(){
    console.log("getPedidosNuevos");
    let startAt = null;
    if (this.pedidos) {
      startAt = this.pedidos[this.pedidos.length -1]?.fecha;
    }
    this.nuevoSuscriber = this.userService.getPedidosNuevosAmin(startAt).subscribe(
      res => {
        if (res) {
          console.log("getPedidosNuevos", res);
          res.forEach(pedido => {
            this.pedidos.push(pedido);
          })
        }
      }
    );
  }

  async getPedidosCulminados(){
    console.log("getPedidosNuevos");
    let startAt = null;
    if (this.pedidosEntregados) {
      startAt = this.pedidosEntregados[this.pedidosEntregados.length -1]?.fecha;
    }
    this.nuevoSuscriber = this.userService.getPedidosEntragadosAmin(startAt).subscribe(
      res => {
        if (res) {
          console.log("getPedidosEntrgados", res);
          res.forEach(pedido => {
            this.pedidosEntregados.push(pedido);
          })
        }
      }
    );
  }

  cargarMas(){
    if (this.nuevos) {
      this.getPedidosNuevos();
    }else{
      this.getPedidosCulminados();
    }
  }

}
