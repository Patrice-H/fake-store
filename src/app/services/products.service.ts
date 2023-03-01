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

  getProductsByCategory(cat: string): Product[] {
    return this.products.filter((product) => product.category === cat);
  }

  getProductById(id: number): Product {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      throw new Error('Product not found');
    }
  }

  getProductsByRubric(rubric: string): Product[] {
    let products: Product[] = [];
    switch (rubric) {
      case 'high-tech':
        const smartphones = this.getProductsByCategory('smartphones');
        const laptops = this.getProductsByCategory('laptops');
        smartphones.forEach((product) => {
          products.push(product);
        });
        laptops.forEach((product) => {
          products.push(product);
        });
        break;
      case 'home':
        const homeDecoration = this.getProductsByCategory('home-decoration');
        const lighting = this.getProductsByCategory('lighting');
        const furniture = this.getProductsByCategory('furniture');
        homeDecoration.forEach((product) => {
          products.push(product);
        });
        lighting.forEach((product) => {
          products.push(product);
        });
        furniture.forEach((product) => {
          products.push(product);
        });
        break;
      case 'cosmetic':
        const fragances = this.getProductsByCategory('fragances');
        const skincare = this.getProductsByCategory('skincare');
        fragances.forEach((product) => {
          products.push(product);
        });
        skincare.forEach((product) => {
          products.push(product);
        });
        break;
      case 'auto-moto':
        const automotive = this.getProductsByCategory('automotive');
        const motorcycle = this.getProductsByCategory('motorcycle');
        automotive.forEach((product) => {
          products.push(product);
        });
        motorcycle.forEach((product) => {
          products.push(product);
        });
        break;
      case 'man':
        const mensShirts = this.getProductsByCategory('mens-shirts');
        const mensShoes = this.getProductsByCategory('mens-shoes');
        mensShirts.forEach((product) => {
          products.push(product);
        });
        mensShoes.forEach((product) => {
          products.push(product);
        });
        break;
      case 'woman':
        const tops = this.getProductsByCategory('tops');
        const womensDresses = this.getProductsByCategory('womens-dresses');
        const womensShoes = this.getProductsByCategory('womens-shoes');
        tops.forEach((product) => {
          products.push(product);
        });
        womensDresses.forEach((product) => {
          products.push(product);
        });
        womensShoes.forEach((product) => {
          products.push(product);
        });
        break;
      case 'accessory':
        const mensWatches = this.getProductsByCategory('mens-watches');
        const womensWatches = this.getProductsByCategory('womens-watches');
        const womensBags = this.getProductsByCategory('womens-bags');
        const womensJewellery = this.getProductsByCategory('womens-jewellery');
        const sunglasses = this.getProductsByCategory('sunglasses');
        mensWatches.forEach((product) => {
          products.push(product);
        });
        womensWatches.forEach((product) => {
          products.push(product);
        });
        womensBags.forEach((product) => {
          products.push(product);
        });
        womensJewellery.forEach((product) => {
          products.push(product);
        });
        sunglasses.forEach((product) => {
          products.push(product);
        });
        break;
      case 'other':
        const groceries = this.getProductsByCategory('groceries');
        groceries.forEach((product) => {
          products.push(product);
        });
        break;
      default:
        throw new Error('Rubric not found');
    }

    return products;
  }
}
