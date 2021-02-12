import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDetailsMachineryComponent } from './input-details-machinery.component';

describe('InputDetailsMachineryComponent', () => {
  let component: InputDetailsMachineryComponent;
  let fixture: ComponentFixture<InputDetailsMachineryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputDetailsMachineryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDetailsMachineryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
