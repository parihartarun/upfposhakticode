import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerChcRegisterComponent } from './farmer-chc-register.component';

describe('FarmerChcRegisterComponent', () => {
  let component: FarmerChcRegisterComponent;
  let fixture: ComponentFixture<FarmerChcRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerChcRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerChcRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
