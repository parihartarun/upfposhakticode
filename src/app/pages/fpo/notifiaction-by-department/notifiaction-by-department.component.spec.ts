import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifiactionByDepartmentComponent } from './notifiaction-by-department.component';

describe('NotifiactionByDepartmentComponent', () => {
  let component: NotifiactionByDepartmentComponent;
  let fixture: ComponentFixture<NotifiactionByDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifiactionByDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifiactionByDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
