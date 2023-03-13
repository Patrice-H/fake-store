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
  brandsFilter!: string[];
  brandsForm!: FormGroup;
  minPrice: number = 200;
  maxPrice: number = 400;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.brandsForm = this.formBuilder.group(this.initBrandsCheckbox());
  }

  initBrandsCheckbox() {
    const brandsCheckbox: any = {};
    this.brandsList.forEach((brand) => {
      brandsCheckbox[this.formatBrandName(brand)] = false;
    });

    return brandsCheckbox;
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

  filterByBrands() {
    this.setBrandsFilter();
    let brandsFilter = this.encodeBrandsFilter();
    const url = this.router.url.split('?')[0];
    if (this.brandsFilter.length > 0) {
      this.router.navigate([url], { queryParams: { brands: brandsFilter } });
    } else {
      this.router.navigate([url]);
    }
  }
}
