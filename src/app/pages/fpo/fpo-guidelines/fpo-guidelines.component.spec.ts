import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpoGuidelinesComponent } from './fpo-guidelines.component';

describe('FpoGuidelinesComponent', () => {
  let component: FpoGuidelinesComponent;
  let fixture: ComponentFixture<FpoGuidelinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FpoGuidelinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FpoGuidelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
