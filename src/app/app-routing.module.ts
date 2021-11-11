import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SetProductosComponent } from './backend/set-productos/set-productos.component';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { MisPedidosComponent } from './pages/mis-pedidos/mis-pedidos.component';
import { map } from 'rxjs/operators';
import { canActivate } from '@angular/fire/compat/auth-guard'
import { PedidosComponent } from './pages/pedidos/pedidos.component';


const isAdmin = (next: any) => map((user:any) => !!user && 'lxUO0UMYr7dG08mqQWxASRu3vE42' === user.uid)

const routes: Routes = [

  {path:'home', component: HomeComponent},
  {path:'setProductos', component: SetProductosComponent, ...canActivate(isAdmin)},
  {path:'setProductos/:id', component: SetProductosComponent, ...canActivate(isAdmin)},
  {path:'perfil', component: PerfilComponent},
  {path:'carrito', component: CarritoComponent},
  {path:'mis-pedidos', component: MisPedidosComponent},
  {path:'pedidos', component: PedidosComponent, ...canActivate(isAdmin)},
  {path:'',  redirectTo:'home', pathMatch:'full'},
  {path:'**',  redirectTo:'home'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
