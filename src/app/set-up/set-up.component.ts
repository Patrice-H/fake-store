import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { filteringService } from '../services/filtering.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-set-up',
  templateUrl: './set-up.component.html',
  styleUrls: ['./set-up.component.scss'],
})
export class SetUpComponent implements OnInit {
  @Input() productList!: Product[];
  brandsList!: string[];
  brandsFiltersList!: string[];
  brandsForm!: FormGroup;
  minPrice!: number;
  maxPrice!: number;
  params: any = {};

  constructor(
    private productsService: ProductsService,
    private filteringService: filteringService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.brandsList = this.productsService.getProductsBrands(this.productList);
    this.minPrice = this.productsService.getMinPrice(this.productList);
    this.maxPrice = this.productsService.getMaxPrice(this.productList);
    this.brandsForm = this.formBuilder.group(
      this.filteringService.initBrandsCheckbox(this.brandsList)
    );
    this.brandsFiltersList = [];
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

  setParams() {
    let baseUrl = this.router.url.split('?')[0];
    let parameters = this.router.url.split('?')[1];
    let brands = '';
    let min_price, max_price, sort;
    if (parameters !== undefined && parameters.includes('min_price')) {
      min_price = parameters.split('min_price=')[1].split('&')[0];
    }
    if (parameters !== undefined && parameters.includes('max_price')) {
      max_price = parameters.split('max_price=')[1].split('&')[0];
    }
    if (parameters !== undefined && parameters.includes('sort')) {
      sort = parameters.split('sort=')[1].split('&')[0];
    }

    if (this.brandsFiltersList.length > 0) {
      this.brandsList.forEach((brand) => {
        if (
          this.brandsFiltersList.includes(
            this.filteringService.formatBrandName(brand)
          )
        ) {
          if (brands !== '') {
            brands += '-';
          }
          brands += this.filteringService.formatBrandName(brand);
        }
      });
    }

    if (brands !== '') {
      this.params.brands = brands;
    } else {
      delete this.params.brands;
    }
    if (min_price !== undefined && Number(min_price) > this.minPrice) {
      this.params.min_price = min_price;
    } else {
      delete this.params.min_price;
    }
    if (max_price !== undefined && Number(max_price) < this.maxPrice) {
      this.params.max_price = max_price;
    } else {
      delete this.params.max_price;
    }
    if (sort !== undefined) {
      this.params.sort = sort;
    } else {
      delete this.params.sort;
    }
    if (
      this.params.brands ||
      this.params.min_price ||
      this.params.max_price ||
      this.params.sort
    ) {
      this.router.navigate([baseUrl], { queryParams: this.params });
    } else {
      this.router.navigate([baseUrl]);
    }
  }

  setBrandsForm() {
    this.brandsList.forEach((brand) => {
      if (
        this.brandsFiltersList.includes(
          this.filteringService.formatBrandName(brand)
        )
      ) {
        this.brandsForm.controls[
          this.filteringService.formatBrandName(brand)
        ].setValue(true);
      } else {
        this.brandsForm.controls[
          this.filteringService.formatBrandName(brand)
        ].setValue(false);
      }
    });
  }

  toggleFilter(filter: string) {
    if (this.brandsFiltersList.includes(filter)) {
      this.brandsFiltersList = this.brandsFiltersList.filter(
        (brand) => brand !== filter
      );
    } else {
      this.brandsFiltersList.push(filter);
    }
    this.setBrandsForm();
    this.setParams();
  }

  removeFilter(filter: string) {
    this.brandsFiltersList = this.brandsFiltersList.filter(
      (brand) => brand !== filter
    );
    this.setBrandsForm();
    this.setParams();
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
