import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Productos } from '../../models/productos';
import { ProductosService } from '../../services/productos.service';
import { Comentarios } from '../../models/comentarios';
import { Subscription } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { Users } from '../../models/user';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.scss'],
})
export class ComentarioComponent implements OnInit, OnDestroy {

  @Input() producto: Productos;

  comentario: string;
  comentarios: Comentarios[]=[];
  comentarioSuscriber: Subscription;
  subscriptions: Subscription;
  user: Users;

  constructor(private modalController: ModalController, private productosService: ProductosService, private userService: UsersService, private authService: AuthService) { }

  ngOnDestroy(){
    console.log('destruye comentario');
    if (this.comentarioSuscriber) {
      this.comentarioSuscriber.unsubscribe();
    }
  }

  ngOnInit() {
    this.loadComentarios();
  }

  closeModal(){
    this.modalController.dismiss();
  }

  async loadComentarios(){
    let startAt = null;
    if (this.comentarios) {
      startAt = this.comentarios[this.comentarios.length -1]?.fecha;
    }

    this.comentarioSuscriber = await this.productosService.getComentariosPagination(this.producto.id,startAt, 3).subscribe(
      res => {
        if (res) {
          res.forEach(comentario => {
            const existe = this.comentarios.find(
              commentExiste => {
                commentExiste.id === comentario.id;
              }
            );
            if (existe === undefined) {
              this.comentarios.push(comentario);
            }
          });
        }
      }
    );

  }

  async comentar(){

    let comentario = this.comentario;
    console.log("comentario", comentario);
    const data: Comentarios  = {
      autor: this.authService.datosUser.name,
      comentario,
      fecha: new Date(),
    }

    this.productosService.addComentarioProduct(this.producto.id, data).then(
      (result) => {  
        console.log('comentario agregado a la BD');
        this.comentario = '';
    }).catch((err) => {
      
    });;


  }

}
