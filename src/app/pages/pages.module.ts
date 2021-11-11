import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { CarritoComponent } from './carrito/carrito.component';
import { MisPedidosComponent } from './mis-pedidos/mis-pedidos.component';
import { PedidosComponent } from './pedidos/pedidos.component';



@NgModule({
  declarations: [
    HomeComponent,
    PerfilComponent,
    CarritoComponent,
    MisPedidosComponent,
    PedidosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    FormsModule,
    ComponentsModule

  ]
})
export class PagesModule { }
