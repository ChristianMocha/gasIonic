import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Users } from '../models/user';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private fireBase: AngularFirestore) { }

  addUser(user: Users){
    if(user.id == null){
      user.id = this.fireBase.createId();
    }
    return this.fireBase.collection('users').doc(user.id).set(Object.assign({}, user));
  }

  getUserById(idUser: string){
    return this.fireBase.collection<Users>('users').doc(idUser).valueChanges();
  }

  getUsers(){
    return this.fireBase.collection<Users>('users').valueChanges();
  }

  deteleUser(idUser: string){
    let doc = 'users/' + idUser;
    return this.fireBase.doc(doc).delete();
  }

  updateUser(idUser: string, user: Users) {
    let doc = 'users/' + idUser;
    return this.fireBase.doc(doc).update(user);
  }

  addUserCarrito(idCarritoUser: string, pedido: Pedido){
    let doc = 'users/' + idCarritoUser + '/' + 'carrito';
    return this.fireBase.collection(doc).doc(idCarritoUser).set(Object.assign({}, pedido));

  }

  getUserCarritoById(idCarritoUser: string){
    let doc = 'users/' + idCarritoUser + '/' + 'carrito';
    return this.fireBase.collection<Pedido>(doc).doc(idCarritoUser).valueChanges();
  }

  addUserPedido(idUser:string, pedido: Pedido){
    let doc = 'users/' + idUser + '/' + 'pedido';
    if(pedido.id == null){
      pedido.id = this.fireBase.createId();
    }else{
      pedido.id = this.fireBase.createId();
    }
    return this.fireBase.collection(doc).doc(pedido.id).set(Object.assign({}, pedido));
  }

  deleteUserCarrito(idUser: string){
    let doc = 'users/' + idUser + '/' + 'carrito/' + idUser;
    return this.fireBase.doc(doc).delete();

  }

  // obtener los pedidos cliente
  getPedidosNuevosClientById(idUser: any){
    let doc = 'users/' + idUser + '/' + 'pedido';
    return this.fireBase.collection<Pedido>(doc, res => res.where('estado', '==', 'enviado')).valueChanges();
  }
  getPedidosEntragadosClientById(idUser: any){
    let doc = 'users/' + idUser + '/' + 'pedido';
    return this.fireBase.collection<Pedido>(doc, res => res.where('estado', '==', 'entregado')).valueChanges();
  }

  // obtener los pedidos administrador, ordenar mediante la fecha obtener de 4 en 4 pedidos

  getPedidosNuevosAmin(startAt: any){
    if (startAt == null) {
      startAt = new Date();
    }
    return this.fireBase.collectionGroup<Pedido>('pedido', res => res.where('estado', '==', 'enviado').orderBy('fecha', 'desc')
    .limit(4).startAfter(startAt)).valueChanges();
  }

  getPedidosEntragadosAmin(startAt: any){
    if (startAt == null) {
      startAt = new Date();
    }
    return this.fireBase.collectionGroup<Pedido>('pedido', res => res.where('estado', '==', 'entregado').orderBy('fecha', 'desc')
    .limit(4).startAfter(startAt)).valueChanges();
  }
}
