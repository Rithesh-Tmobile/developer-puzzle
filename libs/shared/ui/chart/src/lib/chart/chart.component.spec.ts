import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { GoogleChartsModule } from 'angular-google-charts';
import { ChartComponent } from './chart.component';
import { of } from 'rxjs';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GoogleChartsModule],
      declarations: [ ChartComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;

    const data: Array<any> = [{"date":"2017-02-14","uClose":120.45,"uOpen":100.48,"uHigh":189.29,"uLow":100.37,"uVolume":61366234,"close":162.38,"open":123.33,"high":128.83,"low":102.6,"volume":54367228,"change":0,"changePercent":0,"label":"Feb 14, 17","changeOverTime":0}];
      component.data$ = of (data);
      component.chart = {
        type: 'LineChart',
        data : data,
        columnNames: ['period', 'close'],
        options: { title: 'Stock Price', width: '600', height: '400' }
      } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
