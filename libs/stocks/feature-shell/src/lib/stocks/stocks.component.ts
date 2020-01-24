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
  startDate: string;
  endDate: string;

  quotes$ = this.priceQuery.priceQueries$;

  datePicker = {
    maxDate: new Date(),
    minToDate: new Date()
  };
  timePeriods = stockTimePeriods;

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
    
  }

  ngOnInit() {}

  fetchQuote() {
    const { symbol, startDate, endDate } = this.stockPickerForm.value;
    if (this.stockPickerForm.valid) {
      this.priceQuery.fetchQuote(symbol, startDate, endDate);
    }
  }

  public handleDateChange(event): void {
   this.datePicker.minToDate = event.value;
  }
}
