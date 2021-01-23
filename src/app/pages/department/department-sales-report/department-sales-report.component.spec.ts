import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentSalesReportComponent } from './department-sales-report.component';

describe('DepartmentSalesReportComponent', () => {
  let component: DepartmentSalesReportComponent;
  let fixture: ComponentFixture<DepartmentSalesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentSalesReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentSalesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
