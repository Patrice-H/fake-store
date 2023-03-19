import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { sortingService } from '../services/sorting.service';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss'],
})
export class SortingComponent implements OnInit {
  @Output() sortingEvent = new EventEmitter<string>();
  panelLabel!: string;
  sortChoice!: string;
  sortKeys!: any[];

  constructor(private sortingService: sortingService) {}

  ngOnInit() {
    this.sortKeys = this.sortingService.sortKeys;
    this.sortChoice = 'default';
    this.panelLabel = 'Sort by default';
  }

  defineSorting(value: any) {
    this.panelLabel = this.sortingService.setPanelLabel(value);
    this.sortingEvent.emit(value);
  }
}
