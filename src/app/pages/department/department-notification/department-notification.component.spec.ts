import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentNotificationComponent } from './department-notification.component';

describe('DepartmentNotificationComponent', () => {
  let component: DepartmentNotificationComponent;
  let fixture: ComponentFixture<DepartmentNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
