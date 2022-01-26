import { Component, Input, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-score-gauge',
  templateUrl: './score-gauge.component.html',
  styleUrls: ['./score-gauge.component.scss']
})
export class ScoreGaugeComponent implements OnInit {
  @Input() creditScore: number = 0;

  creditScoreText: string = 'Average';
  endPoint: number = 1;
  keyPoints: string = '1; 0.5';

  constructor() { }

  ngOnInit(): void {
    this.calculatePercentage(this.creditScore)
  }

  @HostListener('window:click', ['$event'])
  onClick() {
    document.querySelector("animateMotion")?.beginElement()
    this.calculatePercentage(this.creditScore)
  }

  calculatePercentage(value: number) {
    this.endPoint = 1 - ((value - 300) / 550)
    this.keyPoints = '1;' + this.endPoint
    if (this.endPoint <= .58 && this.endPoint > .4) {
      this.creditScoreText = "Fair"
    } else if (this.endPoint <= .4 && this.endPoint > .28) {
      this.creditScoreText = "Good"
    } else if (this.endPoint <= .28 && this.endPoint > .19) {
      this.creditScoreText = "Very Good"
    } else if (this.endPoint <= .19) {
      this.creditScoreText = "Exceptional"
    } else {
      this.creditScoreText = "Poor"
    }
  }

  determineStrokeColor(): object {
    if (this.endPoint <= .58 && this.endPoint > .4) {
      return { 'stroke': '#ff883e' }
    } else if (this.endPoint <= .4 && this.endPoint > .28) {
      return { 'stroke': '#ffd526' }
    } else if (this.endPoint <= .28 && this.endPoint > .19) {
      return { 'stroke': '#0191fd' }
    } else if (this.endPoint <= .19) {
      return { 'stroke': '#3bdb93' }
    } else {
      return { 'stroke': '#ff6062' }
    }
  }

}
