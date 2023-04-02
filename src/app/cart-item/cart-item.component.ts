import { Component, Input, Output, EventEmitter } from '@angular/core';
import { cartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {
  @Input() item: any;
  @Output() deletedEvent = new EventEmitter<number>();
  @Output() updatedEvent = new EventEmitter<any>();

  constructor(private cartService: cartService) {}

  deleteItem(): void {
    this.cartService.deleteItem(this.item.id);
    this.deletedEvent.emit(this.item.id);
  }

  updateItem(qty: string) {
    this.item.quantity = qty;
    this.updatedEvent.emit(this.item);
  }
}
