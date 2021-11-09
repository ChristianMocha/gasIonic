import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { ProductosService } from 'src/app/services/productos.service';
import { Productos } from '../../models/productos';
import { UploadService } from '../../services/upload.service';



@Component({
  selector: 'app-set-productos',
  templateUrl: './set-productos.component.html',
  styleUrls: ['./set-productos.component.scss'],
})
export class SetProductosComponent implements OnInit {


  public producto: Productos;
  public productos: Productos[]=[];
  public idProducto: string;
  loading: any;
  public files: File[] = [];
  img = '';
  public image: string;
  

  constructor(public menuController: MenuController, private productosService: ProductosService, private router: Router,  private activeRoute: ActivatedRoute, public loadingController: LoadingController,
    public toastController: ToastController, public alertController: AlertController, private uploadService: UploadService) { 
    let paramsSub = this.activeRoute.params.subscribe(
      (res) => {
        this.idProducto = res["id"];
      }
    );
  }

  ngOnInit() {
    if (this.idProducto) {
      this.presentLoading("cargando producto"); 
      this.getProductoByID();
    }else{
      this.presentLoading("cargando productos"); 
      this.getProductos();
      this.producto = new Productos;
    }
  }

  openMenu(){
    this.menuController.toggle("first")
  }

  async onUpload(img: string){
    this.presentLoading("Guardando...");

    await this.uploadService.uploadFireStorage('producto/producto', this.files[0]).then(
      (res:any) => {
        console.log(res);
        this.image = res;
    }).catch((err) => {
      
    });

    this.producto.img = this.image;


    if (!this.idProducto) {
      await this.addProducto()
    }else{
      await this.updateProducto(img);
    }
  }

  addProducto(){
    this.producto.fecha = new Date();
    this.productosService.addProduct(this.producto).then(
      (result) => {
        this.router.navigate(['setProductos']);
        this.loading.dismiss();
        this.presentToast("Guardado con exito");
    }).catch((err) => {
      
    });
    this.loading.onDidDismiss();
    
  }

  updateProducto(img: string){
    this.uploadService.deleteImage(img);
    this.producto.fecha = new Date();
    this.productosService.updateProducto(this.idProducto, this.producto).then(
      (result) => {
        this.router.navigate(['setProductos']);
        this.loading.dismiss();
        this.presentToast("Actualizado con exito");
    }).catch((err) => {
      
    });
    
    
  }

  async getProductos(){
    await this.productosService.getProductos().subscribe(
      res => {
        if (res) {
          this.productos = res;
          this.loading.dismiss();
        }
      }
    );
  }

  async getProductoByID(){
    await this.productosService.getProductoById(this.idProducto).subscribe(
      res => {
        if (res) {
          this.producto = res;
          this.loading.dismiss();
        }
      }
    );
  }

  async delete(producto: Productos){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Advertencia!',
      message: 'Seguro desea <strong>eliminar!!!</strong> este producto',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.uploadService.deleteImage(producto.img);
            this.productosService.detele(producto.id);
          }
        }
      ]
    });

    await alert.present();

    
  }


  updateProd(producto: any){
    this.router.navigate([`setProductos/${producto}`]);
  }

  atras(){
    this.router.navigate(['setProductos']);
  }

  async presentLoading(mensaje: string) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: mensaje
    });
    await this.loading.present();
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: 'light',
    });
    toast.present();
  }

  newImage(event:any){
    console.log(this.files);
    if (event.target.files && event.target.files[0]) {
      this.files.push(event.target.files[0]);
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.producto.img = image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
