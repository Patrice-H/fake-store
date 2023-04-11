import { Component, Input, Output, EventEmitter } from '@angular/core';
import { filteringService } from '../services/filtering.service';

@Component({
  selector: 'app-tag-filters',
  templateUrl: './tag-filters.component.html',
  styleUrls: ['./tag-filters.component.scss'],
})
export class TagFiltersComponent {
  @Input() brandsFilters!: string[];
  @Output() closeEvent = new EventEmitter<string>();

  constructor(private filteringService: filteringService) {}

  deleteFilter(filter: string) {
    this.closeEvent.emit(this.filteringService.formatBrandName(filter));
  }
}
