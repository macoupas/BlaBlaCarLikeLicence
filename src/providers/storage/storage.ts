import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor(private storage: Storage) {

  }

  setValue(key: any, value: any) {
    return this.storage.set(key, value);
  }

  getValue(key: any) {
    return this.storage.get(key);
  }
}
