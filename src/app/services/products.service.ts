import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: Product[] = [
    new Product(
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
    ),
    new Product(
      6,
      'MacBook Pro',
      'MacBook Pro 2021 with mini-LED display may launch between September, November',
      1749,
      11.02,
      'laptops',
      'https://i.dummyjson.com/data/products/6/thumbnail.png',
      [
        'https://i.dummyjson.com/data/products/6/1.png',
        'https://i.dummyjson.com/data/products/6/2.jpg',
        'https://i.dummyjson.com/data/products/6/3.png',
        'https://i.dummyjson.com/data/products/6/4.jpg',
      ]
    ),
    new Product(
      11,
      'perfume Oil',
      'Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil',
      13,
      8.4,
      'fragances',
      'https://i.dummyjson.com/data/products/11/thumbnail.jpg',
      [
        'https://i.dummyjson.com/data/products/11/1.jpg',
        'https://i.dummyjson.com/data/products/11/2.jpg',
        'https://i.dummyjson.com/data/products/11/3.jpg',
        'https://i.dummyjson.com/data/products/11/thumbnail.jpg',
      ]
    ),
  ];

  getAllProducts(): Product[] {
    return this.products;
  }
}
