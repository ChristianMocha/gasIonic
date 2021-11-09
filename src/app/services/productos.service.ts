import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Productos } from '../models/productos';

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
}
