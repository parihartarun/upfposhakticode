import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerComplaintsComponent } from './farmer-complaints.component';

describe('FarmerComplaintsComponent', () => {
  let component: FarmerComplaintsComponent;
  let fixture: ComponentFixture<FarmerComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerComplaintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
