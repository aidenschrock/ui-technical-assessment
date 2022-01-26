import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { ScoreGaugeComponent } from './score-gauge/score-gauge.component';

import { CreditAPIService } from './credit-api.service';


@NgModule({
  declarations: [
    AppComponent,
    ScoreGaugeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [
    CreditAPIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
