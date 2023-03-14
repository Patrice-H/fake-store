import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.scss'],
})
export class FilteringComponent implements OnInit {
  @Input() brandsList!: string[];
  @Input() minPrice!: number;
  @Input() maxPrice!: number;
  brandsForm!: FormGroup;
  pricesForm!: FormGroup;
  brandsFilter!: string[];
  minPriceFilter!: number;
  maxPriceFilter!: number;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.brandsForm = this.formBuilder.group(this.initBrandsCheckbox());
    this.pricesForm = this.formBuilder.group(this.initPricesInput());
    this.minPriceFilter = this.minPrice;
    this.maxPriceFilter = this.maxPrice;
  }

  initBrandsCheckbox() {
    const brandsCheckbox: any = {};
    this.brandsList.forEach((brand) => {
      brandsCheckbox[this.formatBrandName(brand)] = false;
    });

    return brandsCheckbox;
  }

  initPricesInput() {
    const pricesInput: any = {
      min_price: this.minPrice,
      max_price: this.maxPrice,
    };

    return pricesInput;
  }

  formatBrandName(brand: string) {
    return brand.toLowerCase().split(' ').join('');
  }

  setBrandsFilter() {
    let brandsFilter: string[] = [];
    this.brandsList.forEach((brand) => {
      if (this.brandsForm.value[this.formatBrandName(brand)]) {
        brandsFilter.push(this.formatBrandName(brand));
      }
    });
    this.brandsFilter = brandsFilter;
  }

  setMinPriceFilter() {
    if (this.pricesForm.value.min_price > this.minPrice) {
      this.minPriceFilter = this.pricesForm.value.min_price;
    }
    if (this.pricesForm.value.max_price < this.maxPrice) {
      this.maxPriceFilter = this.pricesForm.value.max_price;
    }
  }

  encodeBrandsFilter(): string {
    let filters = '';
    this.brandsFilter.forEach((filter) => {
      if (filters !== '') {
        filters += '-';
      }
      filters += filter;
    });

    return filters;
  }

  applyFilters() {
    this.setBrandsFilter();
    this.setMinPriceFilter();
    const url = this.router.url.split('?')[0];
    if (
      this.brandsFilter.length > 0 ||
      this.minPriceFilter > this.minPrice ||
      this.maxPriceFilter < this.maxPrice
    ) {
      this.router.navigate([url], { queryParams: this.getParams() });
    } else {
      this.router.navigate([url]);
    }
  }

  getParams() {
    const params: any = {};
    if (this.brandsFilter.length > 0) {
      params.brands = this.encodeBrandsFilter();
    }
    if (this.minPriceFilter > this.minPrice) {
      params.min_price = this.minPriceFilter;
    }
    if (this.maxPriceFilter < this.maxPrice) {
      params.max_price = this.maxPriceFilter;
    }

    return params;
  }
}
