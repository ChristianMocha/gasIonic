import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { Pedido } from '../../models/pedido';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.scss'],
})
export class MisPedidosComponent implements OnInit, OnDestroy {

  nuevoSuscriber: Subscription;
  entragadosSuscriber: Subscription;
  pedidos: Pedido[]=[];

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
      this.getPedidosCulminados();
    }else if(opc === 'nuevos'){
      this.getPedidosNuevos();
    }

  }
  async getPedidosNuevos(){
    console.log("getPedidosNuevos");
    const uid = await this.authService.getUserUID();
    this.nuevoSuscriber = this.userService.getPedidosNuevosClientById(uid).subscribe(
      res => {
        if (res) {
          console.log("getPedidosNuevos", res);
          this.pedidos = res;
        }
      }
    );
  }

  async getPedidosCulminados(){
    console.log("getPedidosCulminados");
    const uid = await this.authService.getUserUID();
    this.entragadosSuscriber = this.userService.getPedidosEntragadosClientById(uid).subscribe(
      res => {
        if (res) {
          console.log("getPedidosNuevos", res);
          this.pedidos = res;
        }
      }
    );
  }
}
