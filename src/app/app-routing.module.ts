import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SetProductosComponent } from './backend/set-productos/set-productos.component';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CarritoComponent } from './pages/carrito/carrito.component';

const routes: Routes = [

  {path:'home', component: HomeComponent},
  {path:'setProductos', component: SetProductosComponent},
  {path:'setProductos/:id', component: SetProductosComponent},
  {path:'perfil', component: PerfilComponent},
  {path:'carrito', component: CarritoComponent},
  {path:'',  redirectTo:'home', pathMatch:'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
