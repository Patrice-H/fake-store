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
      'iPhone 9',
      'An apple mobile which is nothing like apple',
      549,
      12.96,
      'smartphones',
      'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
      [
        'https://i.dummyjson.com/data/products/1/1.jpg',
        'https://i.dummyjson.com/data/products/1/2.jpg',
        'https://i.dummyjson.com/data/products/1/3.jpg',
        'https://i.dummyjson.com/data/products/1/4.jpg',
        'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
      ]
    );
  }
}
