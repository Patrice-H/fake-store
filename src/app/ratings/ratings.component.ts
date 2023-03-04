import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit{
  @Input() vote!: number;
  customWidth!: string;
  customTitle!: string;

  ngOnInit() {
    this.customWidth = `${this.vote * 30}px`;
    this.customTitle = `${this.vote} / 5`;
  }
}
