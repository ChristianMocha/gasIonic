import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Productos } from '../models/productos';
import { Comentarios } from '../models/comentarios';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private fireBase: AngularFirestore) { }

  addProduct(producto: Productos){
    if(producto.id == null){
      producto.id = this.fireBase.createId();
    }
    return this.fireBase.collection('productos').doc(producto.id).set(Object.assign({},producto));
  }

  getProductoById(idProducto:string){
    return this.fireBase.collection<Productos>('productos').doc(idProducto).valueChanges();
  }

  getProductos(){
    return this.fireBase.collection<Productos>('productos').valueChanges();
  }

  detele(idProducto: string){
    let doc = 'productos/' + idProducto;
    return this.fireBase.doc(doc).delete();
  }

  updateProducto(idProducto: string, producto: Productos) {
    let doc = 'productos/' + idProducto;
    return this.fireBase.doc(doc).update(producto);
  }

  // comentario dentro del producto
  addComentarioProduct(idProducto: string, comment: Comentarios){
    let doc = 'productos/' + idProducto + '/comentario';
    if(comment.id == null){
      comment.id = this.fireBase.createId();
    }
    return this.fireBase.collection(doc).doc(comment.id).set(Object.assign({}, comment));
  }


  getComentarioProduct(idProducto: string){
    let doc = 'productos/' + idProducto + '/comentario';
    return this.fireBase.collection<Comentarios>(doc).valueChanges();
  }

  getComentariosPagination(idProducto: string, startAt: any, limit:number){
    let doc = 'productos/' + idProducto + '/comentario';
    if (startAt == null) {
      startAt = new Date();
    }
    return this.fireBase.collection<Comentarios>(doc, res => res.orderBy('fecha', 'desc').limit(limit).startAfter(startAt)).valueChanges();

  }
}
