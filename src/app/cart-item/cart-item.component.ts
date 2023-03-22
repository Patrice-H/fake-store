import { Component, Input } from '@angular/core';
import { cartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {
  @Input() item: any;

  constructor(private cartService: cartService) {}

  deleteItem(): void {
    this.cartService.deleteItem(this.item.id);
  }
}
