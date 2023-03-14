import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

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

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.brandsList = this.getProductsBrands();
    this.minPrice = this.productsService.getMinPrice(this.productList);
    this.maxPrice = this.productsService.getMaxPrice(this.productList);
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
}
