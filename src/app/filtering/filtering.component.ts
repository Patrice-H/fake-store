import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() filteringEvent = new EventEmitter<string>();
  brandsForm!: FormGroup;
  pricesForm!: FormGroup;
  brandsFilter!: string[];
  minPriceFilter!: number;
  maxPriceFilter!: number;

  constructor(
    private formBuilder: FormBuilder,
    private filteringService: filteringService
  ) {}

  ngOnInit() {
    this.brandsForm = this.formBuilder.group(
      this.filteringService.initBrandsCheckbox(this.brandsList)
    );
    this.pricesForm = this.formBuilder.group(
      this.filteringService.initPricesInput(this.minPrice, this.maxPrice)
    );
    this.minPriceFilter = this.minPrice;
    this.maxPriceFilter = this.maxPrice;
  }

  formatBrandName(brand: string) {
    return this.filteringService.formatBrandName(brand);
  }

  setPricesFilter() {
    if (this.pricesForm.value.min_price > this.minPrice) {
      this.minPriceFilter = this.pricesForm.value.min_price;
    }
    if (this.pricesForm.value.max_price < this.maxPrice) {
      this.maxPriceFilter = this.pricesForm.value.max_price;
    }
  }

  applyFilters() {
    this.brandsFilter = this.filteringService.setBrandsFilter(
      this.brandsList,
      this.brandsForm
    );
    this.setPricesFilter();
    this.filteringEvent.emit(this.getParams());
  }

  getParams() {
    const params: any = {};
    if (this.brandsFilter.length > 0) {
      params.brands = this.filteringService.encodeBrandsFilter(
        this.brandsFilter
      );
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
