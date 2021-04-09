import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentForFulfillmentComponent } from './indent-for-fulfillment.component';

describe('IndentForFulfillmentComponent', () => {
  let component: IndentForFulfillmentComponent;
  let fixture: ComponentFixture<IndentForFulfillmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndentForFulfillmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentForFulfillmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
