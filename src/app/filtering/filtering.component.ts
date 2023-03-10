import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.scss'],
})
export class FilteringComponent {
  @Input() brandsList!: string[];
  minPrice: number = 200;
  maxPrice: number = 400;
}
