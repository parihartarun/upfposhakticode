import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpoRegisterComponent } from './fpo-register.component';

describe('FpoRegisterComponent', () => {
  let component: FpoRegisterComponent;
  let fixture: ComponentFixture<FpoRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FpoRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FpoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
