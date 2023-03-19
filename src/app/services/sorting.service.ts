import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class sortingService {
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

  setPanelLabel(value: any): string {
    const choice = this.sortKeys.find((key) => key.value === value);
    return `Sort by ${choice.label.toLowerCase()}`;
  }
}
