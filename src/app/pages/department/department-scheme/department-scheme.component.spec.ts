import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentSchemeComponent } from './department-scheme.component';

describe('DepartmentSchemeComponent', () => {
  let component: DepartmentSchemeComponent;
  let fixture: ComponentFixture<DepartmentSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentSchemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
