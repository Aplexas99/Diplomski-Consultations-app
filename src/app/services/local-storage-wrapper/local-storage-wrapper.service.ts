import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageWrapperService {
  constructor() {}
  set(key: string, value: any): string {
    value = JSON.stringify(value);
    localStorage.setItem(key, value);

    return value;
  }


  get(key: string): any | null {
    let value = localStorage.getItem(key);
    value = value ? JSON.parse(value) : null;
    return value;
  }
  remove(key: string) {
    localStorage.removeItem(key);
  }

  destroy() {}
}
