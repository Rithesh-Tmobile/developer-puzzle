import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { SharedUiChartModule } from '@coding-challenge/shared/ui/chart';
import { GoogleChartsModule } from 'angular-google-charts';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { StocksComponent } from './stocks.component';
import { of } from 'rxjs';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('StocksComponent', () => {
  let formBuilder$: FormBuilder;
  let priceQuery$: PriceQueryFacade;
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSelectModule, 
        SharedUiChartModule,
        FormsModule,
        ReactiveFormsModule, 
        MatFormFieldModule,
        MatInputModule,
        GoogleChartsModule,
        MatButtonModule,
        NoopAnimationsModule,
        StoreModule.forRoot({})],
      declarations: [ StocksComponent ],
      providers: [
        PriceQueryFacade,
        FormBuilder
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    (component as any).quotes$ = of([{"date":"2015-01-20","uClose":113.63,"uOpen":109.73,"uHigh":110.16,"uLow":109.2,"uVolume":50946185,"close":113.69,"open":110.81,"high":109.24,"low":107.6,"volume":52327828,"change":0,"changePercent":0,"label":"Jan 20, 15","changeOverTime":0}]);
    //fixture.detectChanges();
  });

  beforeEach(inject(
    [PriceQueryFacade, FormBuilder],
    (priceQuery: PriceQueryFacade,
      formBuilder: FormBuilder) => {
        priceQuery$ = priceQuery;
        formBuilder$ = formBuilder;
        TestBed.get(PriceQueryFacade);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on init', () => {
    component.ngOnInit();
    expect(component.ngOnInit).toBeTruthy();
  });

  describe('fetchQuoteEvent()', () => {    
    it('should fetch stock details', () => {  
      component.stockPickerForm.setValue({symbol: "AAL", startDate: "2020-01-03", endDate: "2020-01-15"});   
      component.fetchQuote();
      expect(component.quotes$).toBeTruthy();
    });
  });
  describe('handleDateChangeEvent()', () => {    
    it('should set minToDate', () => {
      const event = {value: "2020-01-03"};  
      component.handleDateChange(event);
      expect(component.datePicker.minToDate).toBe(event.value);
    });
  });
});
