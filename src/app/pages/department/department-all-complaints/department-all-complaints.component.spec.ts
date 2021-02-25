import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentAllComplaintsComponent } from './department-all-complaints.component';

describe('DepartmentAllComplaintsComponent', () => {
  let component: DepartmentAllComplaintsComponent;
  let fixture: ComponentFixture<DepartmentAllComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentAllComplaintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentAllComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
