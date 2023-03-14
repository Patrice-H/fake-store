import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
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

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`https://dummyjson.com/products/${id}`);
  }

  getMinPrice(products: Product[]) {
    let price: number = Number.MAX_VALUE;
    products.forEach((product) => {
      if (product.price < price) {
        price = product.price;
      }
    });

    return price;
  }

  getMaxPrice(products: Product[]) {
    let price: number = 0;
    products.forEach((product) => {
      if (product.price > price) {
        price = product.price;
      }
    });

    return price;
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

  filterByBrands(products: Product[], brands: string[]): Product[] {
    let productsList: Product[] = [];
    if (brands.length > 0) {
      brands.forEach((brand) => {
        products.forEach((product) => {
          if (product.brand.toLowerCase().split(' ').join('') === brand) {
            productsList.push(product);
          }
        });
      });
    } else {
      productsList = products;
    }

    return productsList;
  }
}
