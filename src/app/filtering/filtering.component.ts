import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filteringService } from '../services/filtering.service';

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.scss'],
})
export class FilteringComponent implements OnInit {
  @Input() brandsList!: string[];
  @Input() minPrice!: number;
  @Input() maxPrice!: number;
  @Input() brandsForm!: FormGroup;
  @Output() filteringEvent = new EventEmitter<string>();
  pricesForm!: FormGroup;
  brandsFilter!: string[];
  minPriceFilter!: number;
  maxPriceFilter!: number;
  baseUrl!: string;
  parameters!: string;
  params: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private filteringService: filteringService,
    private router: Router
  ) {}

  ngOnInit() {
    this.pricesForm = this.formBuilder.group(
      this.filteringService.initPricesInput(this.minPrice, this.maxPrice)
    );
    this.minPriceFilter = this.minPrice;
    this.maxPriceFilter = this.maxPrice;
    this.baseUrl = this.router.url.split('?')[0];
    this.parameters = this.router.url.split('?')[1];
  }

  formatBrandName(brand: string) {
    return this.filteringService.formatBrandName(brand);
  }

  setParams() {
    this.parameters = this.router.url.split('?')[1];
    let brands, sort;
    let min_price = this.minPriceFilter;
    let max_price = this.maxPriceFilter;
    if (this.parameters !== undefined && this.parameters.includes('brands')) {
      brands = this.parameters.split('brands=')[1].split('&')[0];
    }

    if (this.parameters !== undefined && this.parameters.includes('sort')) {
      sort = this.parameters.split('sort=')[1].split('&')[0];
    }

    if (brands !== undefined) {
      this.params.brands = brands;
    } else {
      delete this.params.brands;
    }
    if (min_price !== undefined && min_price > this.minPrice) {
      this.params.min_price = min_price;
    } else {
      delete this.params.min_price;
    }
    if (max_price !== undefined && max_price < this.maxPrice) {
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
      this.router.navigate([this.baseUrl], { queryParams: this.params });
    } else {
      this.router.navigate([this.baseUrl]);
    }
  }

  setPricesFilter() {
    this.minPriceFilter = this.pricesForm.value.min_price;
    this.maxPriceFilter = this.pricesForm.value.max_price;
    this.setParams();
  }

  applyFilters(filter: string | null = null) {
    this.brandsFilter = this.filteringService.setBrandsFilter(
      this.brandsList,
      this.brandsForm
    );
    this.setPricesFilter();
    if (filter) {
      this.filteringEvent.emit(filter);
    }
  }
}
