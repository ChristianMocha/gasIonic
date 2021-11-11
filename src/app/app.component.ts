import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBarPlugin } from '@capacitor/status-bar';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  admin = false;

  constructor(private authService:AuthService, private platform: Platform) {
    this.initializeApp();
  }

  initializeApp(){
    this.platform.ready().then(() => {
      console.log("Iniciando la app");
      SplashScreen.hide();
      this.getUid();
    })
  }

  getUid(){
    this.authService.stateAuth().subscribe(
      res => {
        if (res !== null) {
          if (res.uid === 'lxUO0UMYr7dG08mqQWxASRu3vE42') {
            this.admin = true;
          }else{
            this.admin = false;
          }
        }else{
          this.admin = false;
        }
      }
    )
  }
}
