import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDetailsInsecticidesComponent } from './input-details-insecticides.component';

describe('InputDetailsInsecticidesComponent', () => {
  let component: InputDetailsInsecticidesComponent;
  let fixture: ComponentFixture<InputDetailsInsecticidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputDetailsInsecticidesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDetailsInsecticidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
