import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth, private fireBase: AngularFirestore) { 
    this.getUserUID();
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
}
