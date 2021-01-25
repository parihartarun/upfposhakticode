import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentUplaodCircularComponent } from './department-uplaod-circular.component';

describe('DepartmentUplaodCircularComponent', () => {
  let component: DepartmentUplaodCircularComponent;
  let fixture: ComponentFixture<DepartmentUplaodCircularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentUplaodCircularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentUplaodCircularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
