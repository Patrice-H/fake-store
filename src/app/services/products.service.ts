import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
      4.69,
      94,
      'Apple',
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
      4.57,
      83,
      'Apple',
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
      4.26,
      65,
      'Impression of Acqua Di Gio',
      'fragrances',
      'https://i.dummyjson.com/data/products/11/thumbnail.jpg',
      [
        'https://i.dummyjson.com/data/products/11/1.jpg',
        'https://i.dummyjson.com/data/products/11/2.jpg',
        'https://i.dummyjson.com/data/products/11/3.jpg',
        'https://i.dummyjson.com/data/products/11/thumbnail.jpg',
      ]
    ),
  ];

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get<any>(
      'https://dummyjson.com/products?skip=0&limit=100'
    );
  }

  getProductsByCategory(category: string): Observable<any> {
    return this.http.get<any>(
      `https://dummyjson.com/products/category/${category}`
    );
  }

  getProduct(id: number): Observable<any> {
    return this.http.get<any>(`https://dummyjson.com/products/${id}`);
  }

  filterByRubric(products: Product[], rubric: string[]): Product[] {
    let productsList: Product[] = [];
    rubric.forEach((category) => {
      products.forEach((product) => {
        if (product.category === category) {
          productsList.push(product);
        }
      });
    });

    return productsList;
  }

  getProductById(id: number): Product {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      throw new Error('Product not found');
    }
  }
}
