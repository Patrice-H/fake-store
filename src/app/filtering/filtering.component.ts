import { Component } from '@angular/core';

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.scss']
})
export class FilteringComponent {
  minPrice: number = 200;
  maxPrice: number = 400;
  brands: string[] = [
    'brand 1',
    'brand 2',
    'brand 3'
  ]
}
