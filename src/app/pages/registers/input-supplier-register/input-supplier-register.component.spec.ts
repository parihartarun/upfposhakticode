import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSupplierRegisterComponent } from './input-supplier-register.component';

describe('InputSupplierRegisterComponent', () => {
  let component: InputSupplierRegisterComponent;
  let fixture: ComponentFixture<InputSupplierRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSupplierRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSupplierRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
