import { Component } from '@angular/core';
import * as d3 from 'd3';
import { svg } from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userData: Object = {};

  keyPoints: string = '1; 0.5';
  endPoint: number = 1;
  creditScore: number = 670;
  creditScoreText: string = 'Average';



  constructor() {
    this.randomizeValues()
    this.calculatePercentage(this.creditScore)
  }

  calculatePercentage(value: number) {
    this.endPoint = 1 - ((value - 300) / 550)
    console.log(this.endPoint)
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

  determineStrokeColor(): string {
    if (this.endPoint <= .58 && this.endPoint > .4) {
      return 'orange-circle'
    } else if (this.endPoint <= .4 && this.endPoint > .28) {
      return 'yellow-circle'
    } else if (this.endPoint <= .28 && this.endPoint > .19) {
      return 'blue-circle'
    } else if (this.endPoint <= .19) {
      return 'green-circle'
    } else {
      return 'red-circle'
    }
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

    this.creditScore = this.randomIntFromInterval(300, 850);
    this.calculatePercentage(this.creditScore)
    document.querySelector("animateMotion")?.beginElement()
    this.userData = {
      "Credit Card Utilization": utilization,
      "Payment History": paymentHistory,
      "Derogatory Marks": derogatoryMarks,
      "Age of Credit History": age,
      "Total Accounts": totalAccounts,
      "Hard Inquiries": hardInquires,
    }

  }

  classStatus(key: string, value: any) {
    const status = this.CREDIT_API(key, value)
    switch (status) {
      case "good":
        return 'greenClass';
        break;
      case "avg":
        return 'yellowClass';
        break;
      case "bad":
        return 'redClass';
        break;
      default:
        return '';
        break;
    }
  }

  // Used in template to generate factor cards in the order of the userData obj keys
  sortInOrder() { return 0 }

  insightNumber(): number {
    let insights = 0;
    for (const [key, value] of Object.entries(this.userData)) {
      if (this.CREDIT_API(key, value) != 'good') {
        insights += 1;
      }
    }

    return insights
  }

  CREDIT_API = (detail: any, title: any): string | void => {
    let data;
    if (detail !== "Age of Credit History") {
      data = parseInt(title);
    } else {
      let years = title.split(" ")[0];
      return years < 1 ? "bad" : years < 3 ? "avg" : "good";
    }
    if (detail === "Credit Card Utilization") {
      return data < 25 ? "good" : data > 50 ? "bad" : "avg";
    }
    if (detail === "Total Accounts") {
      return data > 8 ? "good" : data <= 3 ? "bad" : "avg";
    }
    if (detail === "Derogatory Marks") {
      return data < 2 ? "good" : data <= 5 ? "avg" : "bad";
    }
    if (detail === "Payment History") {
      return data > 80 ? "good" : data >= 60 ? "avg" : "bad";
    }
    if (detail === "Hard Inquiries") {
      return data < 2 ? "good" : data <= 5 ? "avg" : "bad";
    }
  };



}
