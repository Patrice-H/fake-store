import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss'],
})
export class SortingComponent implements OnInit {
  panelLabel!: string;
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
    this.panelLabel = 'Sort by default';
  }

  setPanelLabel(): void {
    const choice = this.sortKeys.find((key) => key.value === this.sortChoice);
    this.panelLabel = `Sort by ${choice.label.toLowerCase()}`;
  }
}
