import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoComponent } from './producto/producto.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ItemCarritoComponent } from './item-carrito/item-carrito.component';
import { ComentarioComponent } from './comentario/comentario.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    ProductoComponent,
    ItemCarritoComponent,
    ComentarioComponent

  ],
  exports:[
    ProductoComponent,
    ItemCarritoComponent

  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule
  ],
  
})
export class ComponentsModule { }
