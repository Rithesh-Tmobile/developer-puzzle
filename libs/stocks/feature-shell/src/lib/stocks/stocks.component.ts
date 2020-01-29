import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import {stockTimePeriods} from './stocks.constants';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  symbol: string;
  period: string;

  quotes$ = this.priceQuery.priceQueries$;

  timePeriods = stockTimePeriods;
  valueChanges: any;
  
  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.valueChanges = this.stockPickerForm.valueChanges.subscribe(val => {
      this.fetchQuote();
    });
  }

  ngOnDestroy() {
    this.valueChanges.unsubscribe();
  }

  fetchQuote() {
    console.log("inside fetchQuote()..."+this.stockPickerForm.valid);
    if (this.stockPickerForm.valid) {
      console.log("im inside..");
      const { symbol, period } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, period);
    }
  }
}
