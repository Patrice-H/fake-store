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

  ngOnInit() {
    this.brandsList = this.getProductsBrands();
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
