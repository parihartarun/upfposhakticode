import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentAllUsersComponent } from './department-all-users.component';

describe('DepartmentAllUsersComponent', () => {
  let component: DepartmentAllUsersComponent;
  let fixture: ComponentFixture<DepartmentAllUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentAllUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentAllUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
