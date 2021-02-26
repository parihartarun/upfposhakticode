import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FPOAllUserComponent } from './fpoall-user.component';

describe('FPOAllUserComponent', () => {
  let component: FPOAllUserComponent;
  let fixture: ComponentFixture<FPOAllUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FPOAllUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FPOAllUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
