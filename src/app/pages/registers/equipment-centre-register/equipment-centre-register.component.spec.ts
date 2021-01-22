import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentCentreRegisterComponent } from './equipment-centre-register.component';

describe('EquipmentCentreRegisterComponent', () => {
  let component: EquipmentCentreRegisterComponent;
  let fixture: ComponentFixture<EquipmentCentreRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentCentreRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentCentreRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
