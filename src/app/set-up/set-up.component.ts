import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { filteringService } from '../services/filtering.service';

@Component({
  selector: 'app-set-up',
  templateUrl: './set-up.component.html',
  styleUrls: ['./set-up.component.scss'],
})
export class SetUpComponent implements OnInit {
  @Input() productList!: Product[];
  brandsList!: string[];
  brandsFiltersList!: string[];
  minPrice!: number;
  maxPrice!: number;
  params: any = {};

  constructor(
    private productsService: ProductsService,
    private filteringService: filteringService,
    private router: Router
  ) {}

  ngOnInit() {
    this.brandsList = this.productsService.getProductsBrands(this.productList);
    this.minPrice = this.productsService.getMinPrice(this.productList);
    this.maxPrice = this.productsService.getMaxPrice(this.productList);
  }

  sortProducts(sortKey: string) {
    if (sortKey === 'default') {
      delete this.params.sort;
    } else {
      this.params.sort = sortKey;
    }
    this.applySettings();
  }

  setBrandsFiltersList(filters: string | undefined): void {
    let filterList: any[] = [];
    if (filters !== undefined) {
      filters.split('-').forEach((filter) => {
        let filterName = this.brandsList.find(
          (brand) => this.filteringService.formatBrandName(brand) === filter
        );
        filterList.push(filterName);
      });
    }
    this.brandsFiltersList = filterList;
  }

  filterProducts(filterKey: any) {
    if (filterKey.brands) {
      this.params.brands = filterKey.brands;
    } else {
      delete this.params.brands;
    }
    if (filterKey.min_price) {
      this.params.min_price = filterKey.min_price;
    } else {
      delete this.params.min_price;
    }
    if (filterKey.max_price) {
      this.params.max_price = filterKey.max_price;
    } else {
      delete this.params.max_price;
    }
    this.setBrandsFiltersList(filterKey.brands);
    this.applySettings();
  }

  applySettings(): void {
    const url = this.router.url.split('?')[0];
    if (
      this.params.brands ||
      this.params.min_price ||
      this.params.max_price ||
      this.params.sort
    ) {
      this.router.navigate([url], { queryParams: this.params });
    } else {
      this.router.navigate([url]);
    }
  }
}
