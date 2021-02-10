import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerUserProfileComponent } from './farmer-user-profile.component';

describe('FarmerUserProfileComponent', () => {
  let component: FarmerUserProfileComponent;
  let fixture: ComponentFixture<FarmerUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerUserProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
