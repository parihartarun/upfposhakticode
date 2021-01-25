import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentCircularsComponent } from './department-circulars.component';

describe('DepartmentCircularsComponent', () => {
  let component: DepartmentCircularsComponent;
  let fixture: ComponentFixture<DepartmentCircularsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentCircularsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentCircularsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
