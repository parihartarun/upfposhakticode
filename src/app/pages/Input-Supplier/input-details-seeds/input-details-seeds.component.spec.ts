import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDetailsSeedsComponent } from './input-details-seeds.component';

describe('InputDetailsSeedsComponent', () => {
  let component: InputDetailsSeedsComponent;
  let fixture: ComponentFixture<InputDetailsSeedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputDetailsSeedsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDetailsSeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
