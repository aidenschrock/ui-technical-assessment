import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CreditAPIService {
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
