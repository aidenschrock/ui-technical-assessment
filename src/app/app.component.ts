import { Component } from '@angular/core';
import { CreditAPIService } from './credit-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userData: Object = {};
  creditScore: number = 0;
  keyPoints: string = '1; 0.5';
  endPoint: number = 1;

  constructor(private creditAPIService: CreditAPIService) {
    this.randomizeValues()
  }

  generateAge(): string {
    const currentDate = new Date();
    function randomDate(start: Date, end: Date) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    const creditHistoryStartDate = randomDate(new Date(1990, 0, 1), currentDate)
    let years = currentDate.getFullYear() - creditHistoryStartDate.getFullYear();
    let months = currentDate.getMonth() - creditHistoryStartDate.getMonth();

    if (months < 0) {
      currentDate.setFullYear(currentDate.getFullYear() - 1);
      months += 12;
    }

    if (years > 0) {
      return years + " yr " + months + " mo"
    } else {
      return months + " mo"
    }
  }

  randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  randomizeValues(): void {
    const utilization = this.randomIntFromInterval(0, 100) + '%';
    const paymentHistory = this.randomIntFromInterval(0, 100) + '%';
    const derogatoryMarks = this.randomIntFromInterval(1, 10);
    const totalAccounts = this.randomIntFromInterval(1, 30);
    const hardInquires = this.randomIntFromInterval(0, 10);
    const age = this.generateAge()
    this.creditScore = this.randomIntFromInterval(300, 850)

    this.userData = {
      "Credit Card Utilization": utilization,
      "Payment History": paymentHistory,
      "Derogatory Marks": derogatoryMarks,
      "Age of Credit History": age,
      "Total Accounts": totalAccounts,
      "Hard Inquiries": hardInquires,
    }
  }

  classStatus(key: string, value: any): object {
    const status = this.creditAPIService.CREDIT_API(key, value)
    switch (status) {
      case "good":
        return { 'border-left': 'solid 4px #3bdb93' };
      case "avg":
        return { 'border-left': 'solid 4px #ffd526' };
      case "bad":
        return { 'border-left': 'solid 4px #ff6062' };
      default:
        return {}
    }
  }

  // Used in template to generate factor cards in the order of the userData obj keys
  sortInOrder() { return 0 }

  insightNumber(): number {
    let insights = 0;
    for (const [key, value] of Object.entries(this.userData)) {
      if (this.creditAPIService.CREDIT_API(key, value) != 'good') {
        insights += 1;
      }
    }
    return insights
  }
}
