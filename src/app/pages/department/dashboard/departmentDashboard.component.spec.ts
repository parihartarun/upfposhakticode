import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentDashboardComponent } from './departmentDashboard.component';

describe('DashboardComponent', () => {
  let component: DepartmentDashboardComponent;
  let fixture: ComponentFixture<DepartmentDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DepartmentDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
