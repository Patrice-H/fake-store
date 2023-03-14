import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-set-up',
  templateUrl: './set-up.component.html',
  styleUrls: ['./set-up.component.scss'],
})
export class SetUpComponent implements OnInit {
  @Input() productList!: Product[];
  brandsList!: string[];
  minPrice!: number;
  maxPrice!: number;

  ngOnInit() {
    this.brandsList = this.getProductsBrands();
    this.minPrice = this.getMinPrice();
    this.maxPrice = this.getMaxPrice();
  }

  getProductsBrands() {
    let brands: string[] = [];
    this.productList.forEach((product) => {
      if (!brands.includes(product.brand)) {
        brands.push(product.brand);
      }
    });

    return brands;
  }

  getMinPrice() {
    let price: number = Number.MAX_VALUE;
    this.productList.forEach((product) => {
      if (product.price < price) {
        price = product.price;
      }
    });

    return price;
  }

  getMaxPrice() {
    let price: number = 0;
    this.productList.forEach((product) => {
      if (product.price > price) {
        price = product.price;
      }
    });

    return price;
  }
}
