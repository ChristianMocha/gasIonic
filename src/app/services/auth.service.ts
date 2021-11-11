import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UsersService } from './users.service';
import { Users } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  datosUser: Users;

  constructor(private afsAuth: AngularFireAuth, private fireBase: AngularFirestore, private userService: UsersService) { 
    this.stateUser();
  }

  stateUser(){
    this.stateAuth().subscribe(
      res => {
        if (res != null) {
          this.getInfoUser();
        }
      }
    );
  }

  registrar(email: string, password: string){
    return this.afsAuth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string){
    return this.afsAuth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    return this.afsAuth.signOut();
  }

  async getUserUID(){
    const user = await this.afsAuth.currentUser;
    if (user === null) {
      return null;
    }else{
      return user.uid;
    }
  }

  stateAuth(){
    return this.afsAuth.authState;
  }


  // obtener la info del usuario

  async getInfoUser(){
    const uid = await this.getUserUID();
    this.userService.getUserById(uid).subscribe(
      res => {
        if (res !== undefined) {
          this.datosUser = res;
          console.log("datosUser -> ", this.datosUser);
        }
      }

    );
  }
}
