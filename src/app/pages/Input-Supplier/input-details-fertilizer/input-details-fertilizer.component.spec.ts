import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDetailsFertilizerComponent } from './input-details-fertilizer.component';

describe('InputDetailsFertilizerComponent', () => {
  let component: InputDetailsFertilizerComponent;
  let fixture: ComponentFixture<InputDetailsFertilizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputDetailsFertilizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDetailsFertilizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
