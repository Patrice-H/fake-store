import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class cartService {
  getItems(): any[] {
    // @ts-ignore
    return JSON.parse(localStorage.getItem('order'));
  }
}
