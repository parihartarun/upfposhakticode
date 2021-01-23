import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentUserManagementComponent } from './department-user-management.component';

describe('DepartmentUserManagementComponent', () => {
  let component: DepartmentUserManagementComponent;
  let fixture: ComponentFixture<DepartmentUserManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentUserManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
