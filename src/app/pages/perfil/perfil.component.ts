import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Users } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from '../../services/auth.service';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  public user: Users;
  public files: File[] = [];
  private image: string;
  public idUser: string;
  private subscriptions: Subscription;
  ingresarEnable= false;

  constructor(public menuController: MenuController, private authService: AuthService, private uploadService: UploadService, 
    private userService: UsersService, private router: Router) { 

      this.authService.stateAuth().subscribe(
        res => {
          if (res != null) {
            this.idUser = res.uid;
            this.getUser();
          }else{
            this.idUser = '';
            this.user = new Users;
          }
        }
      );
    }

  async ngOnInit() {
    this.user = new Users;
    const idUser = await this.authService.getUserUID();

    
  }

  openMenu(){
    this.menuController.toggle("first")
  }

  async getUser(){
    this.subscriptions = await this.userService.getUserById(this.idUser).subscribe(
      res => {
        if (this.user) {
          this.user = res;
        }
      }
    );
    // this.subscriptions.push(userSub);
  }

  async onUpload(){

    if (this.files !== undefined) {
      await this.uploadService.uploadFireStorage('users/users', this.files[0]).then(
        (res:any) => {
          console.log(res);
          this.image = res;
      }).catch((err) => {
        
      });
    }
    this.user.img = this.image;

    await this.addUser()
    // if (!this.idProducto) {
    // }else{
    //   await this.updateProducto(img);
    // }
  }

  addUser(){
    console.log(this.user);
    this.userService.addUser(this.user).then(
      (result) => {
        // this.router.navigate(['setProductos']);
    }).catch((err) => {
      
    });
    
  }

  newImage(event:any){
    if (event.target.files && event.target.files[0]) {
      this.files.push(event.target.files[0]);
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.user.img = image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  async ingresar(){
    this.ingresarEnable = false;
    const credenciales = {email: this.user.email, password: this.user.celular}

    await this.authService.login(credenciales.email, credenciales.password).then(
      res => {
        console.log('logueado correctamente');
      }
    );

  }

  async registrar(){
    const credenciales = {email: this.user.email, password: this.user.celular}
    await this.authService.registrar(credenciales.email, credenciales.password).then(
      (res) => {
    }).catch((err) => {
      console.log(err);
    });

    const idUser = await this.authService.getUserUID();
    this.user.id = idUser;
    this.onUpload();

  }

  salir(){
    this.authService.logout();
    this.subscriptions.unsubscribe();
  }



}
