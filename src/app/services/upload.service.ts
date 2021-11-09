import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UUID } from 'angular2-uuid';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private storage: AngularFireStorage) { }

  uploadFireStorage(name:string, file:any){
    return new Promise((resolve, reject)=> {
      const uuid = UUID.UUID();
      const path = name+'_'+uuid;
      const fileRef = this.storage.ref(path);
      const task = this.storage.upload(path, file);
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(data => {
            resolve(data);
          },error =>{
            reject(error);
          })
        })
      ).subscribe(data => {
      },error =>{
        reject(error);
      });
    });
  }

  deleteImage(url: any){
    return this.storage.storage.refFromURL(url).delete();
  }
}
