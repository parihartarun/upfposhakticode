import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginModelPopupComponent } from './login-model-popup.component';

describe('LoginModelPopupComponent', () => {
  let component: LoginModelPopupComponent;
  let fixture: ComponentFixture<LoginModelPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginModelPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginModelPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
