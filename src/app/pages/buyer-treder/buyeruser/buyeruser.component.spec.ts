import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyeruserComponent } from './buyeruser.component';

describe('BuyeruserComponent', () => {
  let component: BuyeruserComponent;
  let fixture: ComponentFixture<BuyeruserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyeruserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyeruserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
