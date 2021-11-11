import { Injectable } from '@angular/core';
import { Productos } from '../models/productos';
import { Pedido, ProductoPedido } from '../models/pedido';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { Users } from '../models/user';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private pedido: Pedido;
  pedido$ = new Subject<Pedido>();
  private idUser: string
  private user: Users;
  carritoSuscriber: Subscription;

  constructor(private fireBase: AngularFirestore, private authService: AuthService, private userService: UsersService, private router: Router ) { 
    this.initCarrito();
    this.authService.stateAuth().subscribe(
      res => {
        if (res != null) {
          this.idUser = res.uid;
          this.loadClienteById();
        }
      }
      
    );
  }

  async loadCarrito(){
    this.carritoSuscriber = this.userService.getUserCarritoById(this.idUser).subscribe(
      res => {
        // console.log('load Carrito', res);
        if (res) {
          this.pedido = res;
          this.pedido$.next(this.pedido);
        }else{
          this.initCarrito();
        }
      }
    );
    // let doc = 'users/' + this.idUser + '/' + 'carrito';
    // this.fireBase.collection<Pedido>(doc).doc(this.idUser).valueChanges().subscribe(
    //   res => {
    //     console.log('load Carrito', res);
    //     if (res) {
    //       this.pedido = res;
    //     }else{
    //       this.initCarrito();
    //     }
    //   }
    // );
  }

  initCarrito(){
    this.pedido = {
      id: this.idUser,
      user: this.user,
      productos:[],
      precioTotal: null,
      estado: 'enviado',
      fecha: new Date(),
      valoracion: null
    }
    this.pedido$.next(this.pedido);
  }

  async loadClienteById(){
      await this.userService.getUserById(this.idUser).subscribe(
      res => {
          this.user = res;
          this.loadCarrito();
      }
    );
  }

  getCarrito(): Observable<Pedido>{
    setTimeout(() => {
      this.pedido$.next(this.pedido);
    }, 100)
    return this.pedido$.asObservable();
  }

  async addProducto(producto: Productos){
    
    if(this.idUser){
      const item = await this.pedido.productos.find(
        productoPedido => {
          return (productoPedido.producto.id === producto.id)
      });
      if (item !== undefined) {
        item.cantidad ++;
      }else{
        const add: ProductoPedido = {
          cantidad: 1,
          producto,
        }
        await this.pedido.productos.push(add);
      }
    }else{
      this.router.navigate(['perfil']);
      return;
    }
    this.pedido$.next(this.pedido);
    await this.userService.addUserCarrito(this.idUser, this.pedido).then(
      (res) => {
        console.log('Agregado');
    }).catch((err) => {
      console.log(err);
    });;

  }

  async removeProducto(producto: Productos){
    if(this.idUser){
      let position = 0;
      const item = await this.pedido.productos.find(
        (productoPedido, index) => {
          position = index;
          return (productoPedido.producto.id === producto.id)
      });
      if (item !== undefined) {
        item.cantidad --;
        if (item.cantidad === 0) {
          this.pedido.productos.splice(position, 1);
        }
        await this.userService.addUserCarrito(this.idUser, this.pedido).then(
          (res) => {
            console.log('removido con exito');
        }).catch((err) => {
          console.log(err);
        });
      }
    }
    
  }

  realizarPedido(){

  }

  clearCarrito(){
    this.initCarrito;
    this.userService.deleteUserCarrito(this.idUser).then(
      (res) => {
        console.log("carrito eliminado");
    }).catch((err) => {
      
    });;
  }
}
