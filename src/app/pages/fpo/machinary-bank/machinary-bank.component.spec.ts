import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinaryBankComponent } from './machinary-bank.component';

describe('MachinaryBankComponent', () => {
  let component: MachinaryBankComponent;
  let fixture: ComponentFixture<MachinaryBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachinaryBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachinaryBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
