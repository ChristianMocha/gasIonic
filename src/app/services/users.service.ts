import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Users } from '../models/user';

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
}
