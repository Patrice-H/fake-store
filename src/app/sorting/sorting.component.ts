import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss'],
})
export class SortingComponent implements OnInit {
  @Output() sortingEvent = new EventEmitter<string>();
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

  defineSorting(value: any) {
    this.sortingEvent.emit(value);
    this.setPanelLabel(value);
  }

  setPanelLabel(value: any): void {
    const choice = this.sortKeys.find((key) => key.value === value);
    this.panelLabel = `Sort by ${choice.label.toLowerCase()}`;
  }
}
