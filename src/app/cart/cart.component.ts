import { Component, OnInit } from '@angular/core';
import { cartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  items!: any[];

  constructor(private cartService: cartService) {}

  ngOnInit() {
    this.items = this.cartService.getItems();
  }
}
