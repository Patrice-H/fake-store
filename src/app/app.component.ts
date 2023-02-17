import { Component, OnInit } from '@angular/core';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  product!: Product;
  ngOnInit(): void {
    this.product = new Product(
      1,
      'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
      109.95,
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
      "men's clothing",
      'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
    );
  }
}
