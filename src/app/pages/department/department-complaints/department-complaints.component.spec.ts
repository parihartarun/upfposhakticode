import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentComplaintsComponent } from './department-complaints.component';

describe('DepartmentComplaintsComponent', () => {
  let component: DepartmentComplaintsComponent;
  let fixture: ComponentFixture<DepartmentComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentComplaintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
