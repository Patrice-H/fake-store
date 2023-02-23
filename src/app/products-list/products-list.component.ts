import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  productList!: Product[];
  ngOnInit(): void {
    this.productList = [
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
        2,
        'iPhone X',
        'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
        899,
        17.94,
        'smartphones',
        'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
        [
          'https://i.dummyjson.com/data/products/2/1.jpg',
          'https://i.dummyjson.com/data/products/2/2.jpg',
          'https://i.dummyjson.com/data/products/2/3.jpg',
          'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
        ]
      ),
      new Product(
        3,
        'Samsung Universe 9',
        'Samsung\'s new variant which goes beyond Galaxy to the Universe',
        1249,
        15.46,
        'smartphones',
        'https://i.dummyjson.com/data/products/3/thumbnail.jpg',
        [
          'https://i.dummyjson.com/data/products/3/thumbnail.jpg',
        ]
      ),
    ]
  }
}
