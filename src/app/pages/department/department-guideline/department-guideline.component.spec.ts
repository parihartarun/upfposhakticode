import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentGuidelineComponent } from './department-guideline.component';

describe('DepartmentGuidelineComponent', () => {
  let component: DepartmentGuidelineComponent;
  let fixture: ComponentFixture<DepartmentGuidelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentGuidelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentGuidelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
