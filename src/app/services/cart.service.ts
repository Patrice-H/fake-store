import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class cartService {
  getItems(): any[] {
    // @ts-ignore
    return JSON.parse(localStorage.getItem('order'));
  }
  deleteItem(id: number) {
    const items = this.getItems();
    const order = items.filter((item) => item.id !== id);
    localStorage.setItem('order', JSON.stringify(order));
  }
}
