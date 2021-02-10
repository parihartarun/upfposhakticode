import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerTraderComplaintsComponent } from './buyer-trader-complaints.component';

describe('BuyerTraderComplaintsComponent', () => {
  let component: BuyerTraderComplaintsComponent;
  let fixture: ComponentFixture<BuyerTraderComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerTraderComplaintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerTraderComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
