import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss'],
})
export class SortingComponent implements OnInit {
  sortChoice!: string;
  sortKeys: any[] = [
    {
      label: 'Default',
      value: 'default',
    },
    {
      label: 'Ascending price',
      value: 'asc-price',
    },
    {
      label: 'Decreasing price',
      value: 'desc-price',
    },
    {
      label: 'Best rating',
      value: 'rating',
    },
  ];

  ngOnInit() {
    this.sortChoice = 'default';
  }

  setSortChoice(): void {
    console.log(this.sortChoice);
  }
}
