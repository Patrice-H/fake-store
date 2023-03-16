import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class filteringService {
    initBrandsCheckbox(brandsList: string[]) {
        const brandsCheckbox: any = {};
        brandsList.forEach((brand) => {
          brandsCheckbox[this.formatBrandName(brand)] = false;
        });
    
        return brandsCheckbox;
    }

    initPricesInput(minPrice: number, maxPrice: number) {
        const pricesInput: any = {
          min_price: minPrice,
          max_price: maxPrice,
        };
    
        return pricesInput;
    }

    setBrandsFilter(brandsList: string[], brandsForm: FormGroup) {
        let brandsFilter: string[] = [];
        brandsList.forEach((brand) => {
          if (brandsForm.value[this.formatBrandName(brand)]) {
            brandsFilter.push(this.formatBrandName(brand));
          }
        });
        return brandsFilter;
    }

    encodeBrandsFilter(brandsFilter: string[]): string {
        let filters = '';
        brandsFilter.forEach((filter) => {
          if (filters !== '') {
            filters += '-';
          }
          filters += filter;
        });
    
        return filters;
    }

    formatBrandName(brand: string) {
        return brand.toLowerCase().split(' ').join('');
      }
}