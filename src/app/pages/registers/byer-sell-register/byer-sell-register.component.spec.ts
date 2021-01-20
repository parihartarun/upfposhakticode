import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByerSellRegisterComponent } from './byer-sell-register.component';

describe('ByerSellRegisterComponent', () => {
  let component: ByerSellRegisterComponent;
  let fixture: ComponentFixture<ByerSellRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ByerSellRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ByerSellRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
