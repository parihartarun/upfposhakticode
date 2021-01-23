import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentProductionReportComponent } from './department-production-report.component';

describe('DepartmentProductionReportComponent', () => {
  let component: DepartmentProductionReportComponent;
  let fixture: ComponentFixture<DepartmentProductionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentProductionReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentProductionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
